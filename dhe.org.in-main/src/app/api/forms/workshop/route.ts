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
  const phone = String(body.phone ?? body.PhoneNumber ?? "").trim();
  const address = String(body.address ?? body.Address ?? "").trim();

  if (!name || !email || !EMAIL_REGEX.test(email) || !phone) {
    return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
  }

  const { error } = await supabase.from("workshop_registrations").insert({
    name,
    email,
    phone,
    address: address || null,
  });

  if (error) {
    console.error("[workshop]", error);
    return NextResponse.json({ error: "Failed to submit registration." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
