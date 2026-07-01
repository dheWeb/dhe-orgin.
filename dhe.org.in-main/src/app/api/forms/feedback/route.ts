import { NextRequest, NextResponse } from "next/server";
import { verifyRecaptchaToken } from "@/lib/recaptcha/verify";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const limit = await checkRateLimit(`forms:${ip}`);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

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

  if (!(await verifyRecaptchaToken(String(body.recaptchaToken ?? "")))) {
    return NextResponse.json({ error: "reCAPTCHA verification failed." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const mobile = String(body.mobile ?? "").trim();
  const affiliation = String(body.affiliation ?? "").trim();
  const event = String(body.event ?? "").trim();
  const experience = String(body.experience ?? "").trim();
  const suggestions = String(body.suggestions ?? "").trim();

  if (!name || !email || !EMAIL_REGEX.test(email) || !mobile || !affiliation || !event) {
    return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
  }

  const { error } = await supabase.from("feedback_submissions").insert({
    name,
    email,
    mobile,
    affiliation,
    event,
    experience,
    suggestions,
  });

  if (error) {
    console.error("[feedback]", error);
    return NextResponse.json({ error: "Failed to submit feedback." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
