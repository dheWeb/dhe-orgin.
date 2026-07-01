import { NextRequest, NextResponse } from "next/server";
import { verifyRecaptchaToken } from "@/lib/recaptcha/verify";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function guard(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const limit = await checkRateLimit(`forms:${ip}`);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter ?? 60) } }
    );
  }
  return null;
}

export async function POST(req: NextRequest) {
  const limited = await guard(req);
  if (limited) return limited;

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Service unavailable." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const recaptchaToken = String(body.recaptchaToken ?? "");
  if (!(await verifyRecaptchaToken(recaptchaToken))) {
    return NextResponse.json({ error: "reCAPTCHA verification failed." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!email || !EMAIL_REGEX.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }
  if (!message || message.length > 5000) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const { error } = await supabase.from("contact_messages").insert({ email, message });
  if (error) {
    console.error("[contact]", error);
    return NextResponse.json({ error: "Failed to save message." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
