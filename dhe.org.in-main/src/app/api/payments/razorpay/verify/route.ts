import { NextRequest, NextResponse } from "next/server";
import { isRazorpayConfigured } from "@/lib/env/razorpay";
import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase/admin";
import type { VerifyPaymentRequest } from "@/lib/payments/types";
import { mapRazorpayPayment } from "@/lib/payments/map-razorpay-payment";
import { upsertDonationFromPayment } from "@/lib/payments/process-webhook";
import { getRazorpayClient } from "@/lib/razorpay/client";
import { verifyPaymentSignature } from "@/lib/razorpay/verify";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { logStructured } from "@/lib/logging/structured-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function finalizeCapturedPayment(
  razorpay_order_id: string,
  razorpay_payment_id: string
) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const razorpay = getRazorpayClient();
  if (!razorpay) return;

  try {
    const raw = await razorpay.payments.fetch(razorpay_payment_id);
    const payment = mapRazorpayPayment(raw as unknown as Record<string, unknown>);
    if (payment.status === "captured") {
      await upsertDonationFromPayment(payment, "captured");
    }
  } catch (err) {
    logStructured("error", "verify.payment_finalize", {
      razorpay_order_id,
      razorpay_payment_id,
      message: err instanceof Error ? err.message : "unknown",
    });
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const limit = await checkRateLimit(`payments:verify:${ip}`);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many verification attempts. Please try again later." },
      {
        status: 429,
        headers: limit.retryAfter
          ? { "Retry-After": String(limit.retryAfter) }
          : undefined,
      }
    );
  }

  if (!isRazorpayConfigured() || !isSupabaseAdminConfigured()) {
    return NextResponse.json(
      { error: "Payments are not configured." },
      { status: 503 }
    );
  }

  let body: VerifyPaymentRequest;
  try {
    body = (await req.json()) as VerifyPaymentRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json(
      { error: "Missing Razorpay payment fields." },
      { status: 400 }
    );
  }

  if (
    !verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    )
  ) {
    return NextResponse.json({ error: "Invalid payment signature." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Database is not configured." },
      { status: 503 }
    );
  }

  const { data: orderRow } = await supabase
    .from("payment_orders")
    .select("purpose")
    .eq("razorpay_order_id", razorpay_order_id)
    .maybeSingle();

  const purpose = orderRow?.purpose ?? "donation";

  if (purpose === "membership") {
    let { data: application } = await supabase
      .from("membership_applications")
      .select("id, receipt_number, payment_status, fee_amount_paise")
      .eq("razorpay_payment_id", razorpay_payment_id)
      .maybeSingle();

    if (!application || application.payment_status !== "paid") {
      await finalizeCapturedPayment(razorpay_order_id, razorpay_payment_id);
      const refetch = await supabase
        .from("membership_applications")
        .select("id, receipt_number, payment_status, fee_amount_paise")
        .eq("razorpay_payment_id", razorpay_payment_id)
        .maybeSingle();
      application = refetch.data;
    }

    let emailSent: boolean | null = null;
    let emailError: string | null = null;

    if (application?.id) {
      const { sendMembershipReceiptIfNeeded } = await import(
        "@/lib/email/send-membership-receipt-if-needed"
      );
      const emailResult = await sendMembershipReceiptIfNeeded(application.id);
      emailSent = emailResult.sent;
      if (emailResult.error && !emailResult.skipped) {
        emailError = emailResult.error;
      }
    }

    return NextResponse.json({
      verified: true,
      purpose: "membership",
      membership: application ?? null,
      emailSent,
      emailError,
      message: application
        ? emailSent
          ? "Payment verified and membership receipt emailed."
          : emailError
            ? "Payment verified. Receipt recorded — email delivery failed; contact DHE."
            : "Payment verified and membership recorded."
        : "Payment verified. Membership will be finalized via webhook shortly.",
    });
  }

  let { data: donation } = await supabase
    .from("donations")
    .select("id, receipt_number, status, amount_paise")
    .eq("razorpay_payment_id", razorpay_payment_id)
    .maybeSingle();

  if (!donation) {
    await finalizeCapturedPayment(razorpay_order_id, razorpay_payment_id);
    const refetch = await supabase
      .from("donations")
      .select("id, receipt_number, status, amount_paise")
      .eq("razorpay_payment_id", razorpay_payment_id)
      .maybeSingle();
    donation = refetch.data;
  }

  let emailSent: boolean | null = null;
  let emailError: string | null = null;

  if (donation?.id) {
    const { sendDonationReceiptIfNeeded } = await import(
      "@/lib/email/send-donation-receipt-if-needed"
    );
    const emailResult = await sendDonationReceiptIfNeeded(donation.id);
    emailSent = emailResult.sent;
    if (emailResult.error && !emailResult.skipped) {
      emailError = emailResult.error;
    } else if (emailResult.skipped && emailResult.error) {
      emailError = emailResult.error;
    }
  }

  return NextResponse.json({
    verified: true,
    purpose: "donation",
    donation: donation ?? null,
    emailSent,
    emailError,
    message: donation
      ? emailSent
        ? "Payment verified and receipt emailed."
        : emailError
          ? "Payment verified. Receipt recorded — email delivery failed; try again from admin or contact DHE."
          : "Payment verified and receipt recorded."
      : "Payment verified. Receipt will be finalized via webhook shortly.",
  });
}
