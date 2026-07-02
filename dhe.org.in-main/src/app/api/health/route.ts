import { NextResponse } from "next/server";
import { getPaymentsHealth } from "@/lib/payments/payments-health";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const payments = await getPaymentsHealth();
  const healthy =
    payments.configured &&
    payments.keysAligned &&
    payments.ordersTableReady &&
    payments.razorpayAuthOk;

  return NextResponse.json({
    status: healthy ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    service: "dhe.org.in",
    payments,
  });
}
