import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getPublicRazorpayKeyId, getRazorpayConfig, isRazorpayConfigured } from "@/lib/env/razorpay";
import { isSupabaseAdminConfigured, getSupabaseAdmin } from "@/lib/supabase/admin";
import { getRazorpayClient } from "@/lib/razorpay/client";
import { validateCreateOrderInput } from "@/lib/payments/process-webhook";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import {
  getRazorpayErrorCode,
  getRazorpayErrorMessage,
  getRazorpayKeyMismatch,
} from "@/lib/razorpay/errors";

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

  const keyMismatch = getRazorpayKeyMismatch();
  if (keyMismatch) {
    console.warn("[create-order]", keyMismatch, "(checkout uses server keyId)");
  }

  if (!isRazorpayConfigured() || !isSupabaseAdminConfigured()) {
    return NextResponse.json(
      { error: "Payments are not configured.", code: "not_configured" },
      { status: 503 }
    );
  }

  const razorpay = getRazorpayClient();
  const supabase = getSupabaseAdmin();
  if (!razorpay || !supabase) {
    return NextResponse.json(
      { error: "Payments are not configured.", code: "not_configured" },
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

  const { purpose, amountPaise, name, email, phone, pan, address, metadata } =
    parsed.data;
  const receipt = `dhe_${purpose}_${randomUUID().replace(/-/g, "").slice(0, 12)}`;

  const notes: Record<string, string> = {
    purpose,
    name: name.slice(0, 256),
    email: email.slice(0, 256),
    phone: phone.slice(0, 256),
  };
  if (pan) notes.pan = pan.slice(0, 256);
  if (address) notes.address = address.slice(0, 256);

  let orderId: string;
  let orderAmount: number;
  let orderCurrency: string;
  try {
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt,
      notes,
    });
    orderId = order.id;
    orderAmount = Number(order.amount);
    orderCurrency = String(order.currency);
  } catch (error) {
    console.error("[create-order] razorpay", error);
    const code = getRazorpayErrorCode(error);
    return NextResponse.json(
      {
        error: getRazorpayErrorMessage(error),
        code: code ?? "razorpay_error",
      },
      { status: 502 }
    );
  }

  const { error: dbError } = await supabase.from("payment_orders").insert({
    razorpay_order_id: orderId,
    purpose,
    amount_paise: amountPaise,
    currency: "INR",
    status: "created",
    payer_name: name,
    payer_email: email,
    payer_phone: phone,
    metadata: {
      pan,
      ...(address ? { address } : {}),
      ...(metadata ?? {}),
    },
  });

  if (dbError) {
    console.error("[create-order] db insert", dbError);
    const missingTable = dbError.code === "42P01";
    return NextResponse.json(
      {
        error: missingTable
          ? "Payment database is not ready. Please contact DHE."
          : "Failed to record order. Please try again.",
        code: missingTable ? "db_schema" : "db_error",
        orderId: orderId,
      },
      { status: 500 }
    );
  }

  const keyId = getPublicRazorpayKeyId() || getRazorpayConfig()?.keyId;

  return NextResponse.json({
    orderId,
    amount: orderAmount,
    currency: orderCurrency,
    keyId,
  });
}
