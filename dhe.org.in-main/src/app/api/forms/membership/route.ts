import { NextRequest, NextResponse } from "next/server";
import { verifyRecaptchaToken } from "@/lib/recaptcha/verify";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FEES: Record<string, { lifetime: number; annual: number }> = {
  student: { lifetime: 2500, annual: 1000 },
  other: { lifetime: 5000, annual: 2000 },
};

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
  const category = String(body.membershipCategory ?? "").trim();
  const type = String(body.membershipType ?? "").trim();

  if (!name || !email || !EMAIL_REGEX.test(email) || !phone || !address) {
    return NextResponse.json({ error: "Required fields missing." }, { status: 400 });
  }

  if (category !== "student" && category !== "other") {
    return NextResponse.json({ error: "Invalid membership category." }, { status: 400 });
  }
  if (type !== "lifetime" && type !== "annual") {
    return NextResponse.json({ error: "Invalid membership type." }, { status: 400 });
  }

  const feeInr = type === "lifetime" ? FEES[category].lifetime : FEES[category].annual;

  const { data: row, error } = await supabase
    .from("membership_applications")
    .insert({
      name,
      email,
      phone,
      address,
      membership_category: category,
      membership_type: type,
      fee_amount_paise: feeInr * 100,
      payment_status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    console.error("[membership]", error);
    return NextResponse.json({ error: "Failed to submit application." }, { status: 500 });
  }

  try {
    const { notifyAdminFormSubmission } = await import(
      "@/lib/email/send-admin-notification"
    );
    const { sendMembershipApplicationAckEmail } = await import(
      "@/lib/email/send-form-ack"
    );
    await notifyAdminFormSubmission({
      formName: "Membership application",
      fields: { name, email, phone, category, type, feeInr: String(feeInr) },
    });
    await sendMembershipApplicationAckEmail({ toEmail: email, toName: name, feeInr });
  } catch (emailErr) {
    console.error("[membership] email", emailErr);
  }

  return NextResponse.json({ success: true, feeInr, applicationId: row.id });
}
