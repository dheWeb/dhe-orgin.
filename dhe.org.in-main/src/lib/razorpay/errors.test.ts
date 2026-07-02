import { describe, expect, it } from "vitest";
import {
  getRazorpayErrorMessage,
  getRazorpayKeyMismatch,
} from "@/lib/razorpay/errors";

describe("getRazorpayErrorMessage", () => {
  it("returns auth message for 401", () => {
    expect(
      getRazorpayErrorMessage({
        statusCode: 401,
        error: { description: "Authentication failed" },
      })
    ).toMatch(/authentication failed/i);
  });

  it("returns API description when present", () => {
    expect(
      getRazorpayErrorMessage({
        error: { description: "The amount must be at least INR 1.00" },
      })
    ).toContain("amount");
  });
});

describe("getRazorpayKeyMismatch", () => {
  it("detects public/server key mismatch", () => {
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = "rzp_live_a";
    process.env.RAZORPAY_KEY_ID = "rzp_live_b";
    process.env.RAZORPAY_KEY_SECRET = "secret";
    process.env.RAZORPAY_WEBHOOK_SECRET = "whsec";
    expect(getRazorpayKeyMismatch()).toMatch(/does not match/);
    delete process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    delete process.env.RAZORPAY_KEY_ID;
    delete process.env.RAZORPAY_KEY_SECRET;
    delete process.env.RAZORPAY_WEBHOOK_SECRET;
  });
});
