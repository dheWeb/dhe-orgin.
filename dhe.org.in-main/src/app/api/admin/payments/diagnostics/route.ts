import { NextRequest, NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/auth/authorize-admin-request";
import { getPaymentsHealth } from "@/lib/payments/payments-health";
import { getPublicRazorpayKeyId, getRazorpayConfig } from "@/lib/env/razorpay";
import { getRazorpayKeyMismatch } from "@/lib/razorpay/errors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!(await isAdminRequestAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const health = await getPaymentsHealth();
  const config = getRazorpayConfig();
  const publicKey = getPublicRazorpayKeyId();

  return NextResponse.json({
    ...health,
    keyIds: {
      server: config?.keyId ? `${config.keyId.slice(0, 12)}…` : null,
      public: publicKey ? `${publicKey.slice(0, 12)}…` : null,
      mismatch: getRazorpayKeyMismatch(),
    },
    fix:
      health.errors.length > 0
        ? "Update RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET as a matched pair in Razorpay Dashboard → Vercel env. Set NEXT_PUBLIC_RAZORPAY_KEY_ID to the same KEY_ID. Run payments SQL migration if payment_orders is missing."
        : null,
  });
}
