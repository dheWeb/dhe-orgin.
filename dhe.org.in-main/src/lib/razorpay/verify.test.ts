import { describe, expect, it, beforeEach, afterEach } from "vitest";
import {
  verifyPaymentSignature,
  verifyWebhookSignature,
} from "./verify";

describe("razorpay verify", () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env };
    process.env.RAZORPAY_KEY_ID = "rzp_test_key";
    process.env.RAZORPAY_KEY_SECRET = "test_secret";
    process.env.RAZORPAY_WEBHOOK_SECRET = "whsec_test";
  });

  afterEach(() => {
    process.env = env;
  });

  it("rejects invalid webhook signatures", () => {
    expect(verifyWebhookSignature('{"event":"test"}', "bad-sig")).toBe(false);
  });

  it("rejects invalid payment signatures", () => {
    expect(
      verifyPaymentSignature("order_1", "pay_1", "invalid-signature")
    ).toBe(false);
  });
});
