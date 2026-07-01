import { getSupabaseAdmin } from "@/lib/supabase/admin";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;

type Bucket = { count: number; resetAt: number };

const memoryBuckets = new Map<string, Bucket>();

export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkInMemory(key: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const bucket = memoryBuckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    memoryBuckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { allowed: true };
}

async function checkSupabase(
  key: string
): Promise<{ allowed: boolean; retryAfter?: number } | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const now = new Date();
  const resetAt = new Date(now.getTime() + WINDOW_MS);

  const { data: existing } = await supabase
    .from("rate_limit_buckets")
    .select("count, reset_at")
    .eq("bucket_key", key)
    .maybeSingle();

  if (!existing || new Date(existing.reset_at) < now) {
    await supabase.from("rate_limit_buckets").upsert({
      bucket_key: key,
      count: 1,
      reset_at: resetAt.toISOString(),
    });
    return { allowed: true };
  }

  if (existing.count >= MAX_REQUESTS) {
    const retryAfter = Math.max(
      1,
      Math.ceil((new Date(existing.reset_at).getTime() - now.getTime()) / 1000)
    );
    return { allowed: false, retryAfter };
  }

  await supabase
    .from("rate_limit_buckets")
    .update({ count: existing.count + 1 })
    .eq("bucket_key", key);

  return { allowed: true };
}

let upstashLimiter: {
  limit: (key: string) => Promise<{ success: boolean; reset?: number }>;
} | null = null;

async function getUpstashLimiter() {
  if (upstashLimiter) return upstashLimiter;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({ url, token });
    upstashLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "1 m"),
      prefix: "dhe:rl",
    });
    return upstashLimiter;
  } catch {
    return null;
  }
}

/** Distributed rate limit: Upstash → Supabase → in-memory fallback. */
export async function checkRateLimit(
  key: string
): Promise<{ allowed: boolean; retryAfter?: number }> {
  const upstash = await getUpstashLimiter();
  if (upstash) {
    const result = await upstash.limit(key);
    if (!result.success) {
      const retryAfter = result.reset
        ? Math.max(1, Math.ceil((result.reset - Date.now()) / 1000))
        : 60;
      return { allowed: false, retryAfter };
    }
    return { allowed: true };
  }

  try {
    const supabaseResult = await checkSupabase(key);
    if (supabaseResult) return supabaseResult;
  } catch {
    // fall through to memory
  }

  return checkInMemory(key);
}
