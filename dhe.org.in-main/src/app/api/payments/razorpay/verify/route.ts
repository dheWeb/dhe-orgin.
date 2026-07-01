import { NextRequest, NextResponse } from "next/server";
import { isRazorpayConfigured } from "@/lib/env/razorpay";
import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase/admin";
import type { VerifyPaymentRequest } from "@/lib/payments/types";
import { verifyPaymentSignature } from "@/lib/razorpay/verify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
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

  const { data: donation } = await supabase
    .from("donations")
    .select("receipt_number, status, amount_paise")
    .eq("razorpay_payment_id", razorpay_payment_id)
    .maybeSingle();

  return NextResponse.json({
    verified: true,
    donation: donation ?? null,
    message:
      "Payment verified. Receipt will be finalized via webhook if not already recorded.",
  });
}
