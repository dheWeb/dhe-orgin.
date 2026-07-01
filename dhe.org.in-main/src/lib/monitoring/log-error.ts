import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function logServerError(input: {
  message: string;
  stack?: string;
  path?: string;
  digest?: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return;

    await supabase.from("error_logs").insert({
      message: input.message.slice(0, 2000),
      stack: input.stack?.slice(0, 8000) ?? null,
      path: input.path ?? null,
      digest: input.digest ?? null,
      metadata: input.metadata ?? {},
    });
  } catch {
    // best-effort
  }
}
