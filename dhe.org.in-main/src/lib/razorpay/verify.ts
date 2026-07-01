import { createHmac, timingSafeEqual } from "crypto";
import { getRazorpayConfig } from "@/lib/env/razorpay";

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) {
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

/** Verify Razorpay webhook `x-razorpay-signature` against raw request body. */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string | null
): boolean {
  const config = getRazorpayConfig();
  if (!config || !signature) {
    return false;
  }

  const expected = createHmac("sha256", config.webhookSecret)
    .update(rawBody)
    .digest("hex");

  return safeEqual(expected, signature);
}

/** Verify client payment callback signature. */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const config = getRazorpayConfig();
  if (!config) {
    return false;
  }

  const expected = createHmac("sha256", config.keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return safeEqual(expected, signature);
}
