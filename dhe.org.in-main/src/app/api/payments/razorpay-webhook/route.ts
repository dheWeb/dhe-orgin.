import { NextRequest, NextResponse } from "next/server";
import { isRazorpayConfigured } from "@/lib/env/razorpay";
import { isSupabaseAdminConfigured } from "@/lib/supabase/admin";
import type { RazorpayWebhookEvent } from "@/lib/payments/types";
import { processRazorpayWebhookEvent } from "@/lib/payments/process-webhook";
import { verifyWebhookSignature } from "@/lib/razorpay/verify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!isRazorpayConfigured()) {
    return NextResponse.json(
      { error: "Razorpay is not configured." },
      { status: 503 }
    );
  }

  if (!isSupabaseAdminConfigured()) {
    return NextResponse.json(
      { error: "Database is not configured." },
      { status: 503 }
    );
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  let payload: RazorpayWebhookEvent & { id?: string };
  try {
    payload = JSON.parse(rawBody) as RazorpayWebhookEvent & { id?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const eventId =
    req.headers.get("x-razorpay-event-id") ||
    payload.id ||
    `${payload.event}:${payload.created_at}:${payload.payload.payment?.entity.id ?? payload.payload.order?.entity.id ?? "unknown"}`;

  try {
    await processRazorpayWebhookEvent(payload, eventId);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[razorpay-webhook]", error);
    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
