import { describe, expect, it } from "vitest";
import { mapRazorpayPayment } from "@/lib/payments/map-razorpay-payment";

describe("mapRazorpayPayment", () => {
  it("maps REST payment fields", () => {
    const mapped = mapRazorpayPayment({
      id: "pay_abc",
      amount: 50000,
      currency: "INR",
      status: "captured",
      order_id: "order_xyz",
      email: "a@b.com",
      contact: "7903431900",
      notes: { name: "Test" },
    });
    expect(mapped.id).toBe("pay_abc");
    expect(mapped.amount).toBe(50000);
    expect(mapped.order_id).toBe("order_xyz");
  });
});
