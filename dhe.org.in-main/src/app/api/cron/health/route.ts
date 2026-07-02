import { NextRequest, NextResponse } from "next/server";
import { getEmailHealth } from "@/lib/email/email-health";
import { getPaymentsHealth } from "@/lib/payments/payments-health";
import { logStructured } from "@/lib/logging/structured-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Vercel Cron / external monitor — pings subsystem health (AUD-205). */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim();
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const [payments, email] = await Promise.all([
    getPaymentsHealth(),
    getEmailHealth(),
  ]);

  const ok =
    payments.configured &&
    payments.keysAligned &&
    payments.ordersTableReady &&
    payments.razorpayAuthOk &&
    payments.membershipReceiptColumnsReady &&
    email.configured &&
    email.brevoAccountOk;

  if (!ok) {
    logStructured("warn", "cron.health.degraded", {
      paymentsErrors: payments.errors,
      emailErrors: email.errors,
    });
  }

  return NextResponse.json({
    status: ok ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    payments,
    email,
  });
}
