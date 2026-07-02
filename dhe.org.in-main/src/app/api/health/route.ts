import { NextResponse } from "next/server";
import { getEmailHealth } from "@/lib/email/email-health";
import { getPaymentsHealth } from "@/lib/payments/payments-health";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const [payments, email] = await Promise.all([
    getPaymentsHealth(),
    getEmailHealth(),
  ]);
  const healthy =
    payments.configured &&
    payments.keysAligned &&
    payments.ordersTableReady &&
    payments.razorpayAuthOk &&
    email.configured;

  return NextResponse.json({
    status: healthy ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    service: "dhe.org.in",
    payments,
    email,
  });
}
