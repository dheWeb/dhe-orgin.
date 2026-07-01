import Razorpay from "razorpay";
import { getRazorpayConfig } from "@/lib/env/razorpay";

let razorpayClient: Razorpay | null = null;

export function getRazorpayClient(): Razorpay | null {
  const config = getRazorpayConfig();
  if (!config) {
    return null;
  }

  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: config.keyId,
      key_secret: config.keySecret,
    });
  }

  return razorpayClient;
}
