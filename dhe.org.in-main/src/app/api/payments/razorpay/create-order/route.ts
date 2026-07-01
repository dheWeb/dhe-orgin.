import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isRazorpayConfigured } from "@/lib/env/razorpay";
import { isSupabaseAdminConfigured, getSupabaseAdmin } from "@/lib/supabase/admin";
import { getRazorpayClient } from "@/lib/razorpay/client";
import { validateCreateOrderInput } from "@/lib/payments/process-webhook";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const limit = await checkRateLimit(`payments:create:${ip}`);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many payment requests. Please try again later." },
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

  const razorpay = getRazorpayClient();
  const supabase = getSupabaseAdmin();
  if (!razorpay || !supabase) {
    return NextResponse.json(
      { error: "Payments are not configured." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = validateCreateOrderInput(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { purpose, amountPaise, name, email, phone, pan, metadata } = parsed.data;
  const receipt = `dhe_${purpose}_${randomUUID().replace(/-/g, "").slice(0, 12)}`;

  try {
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt,
      notes: {
        purpose,
        name,
        email,
        phone,
        ...(pan ? { pan } : {}),
        ...(metadata ?? {}),
      },
    });

    const { error: dbError } = await supabase.from("payment_orders").insert({
      razorpay_order_id: order.id,
      purpose,
      amount_paise: amountPaise,
      currency: "INR",
      status: "created",
      payer_name: name,
      payer_email: email,
      payer_phone: phone,
      metadata: { pan, ...(metadata ?? {}) },
    });

    if (dbError) {
      console.error("[create-order] db insert", dbError);
      return NextResponse.json(
        { error: "Failed to record order." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("[create-order]", error);
    return NextResponse.json(
      { error: "Failed to create Razorpay order." },
      { status: 500 }
    );
  }
}
