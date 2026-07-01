import { describe, expect, it } from "vitest";
import { donationRowToReceiptData } from "@/lib/receipts/donation-receipt-from-row";

describe("donationRowToReceiptData", () => {
  it("maps a donation row to receipt data", () => {
    const result = donationRowToReceiptData({
      id: "abc",
      receipt_number: "DHE-2025-26-00001",
      donor_name: "Test Donor",
      donor_email: "donor@example.com",
      amount_paise: 50000,
      razorpay_payment_id: "pay_123",
      created_at: "2026-06-30T12:00:00.000Z",
    });

    expect(result).toMatchObject({
      receiptNumber: "DHE-2025-26-00001",
      donorName: "Test Donor",
      donorEmail: "donor@example.com",
      amountInr: 500,
      paymentId: "pay_123",
    });
  });

  it("returns null when receipt number is missing", () => {
    expect(
      donationRowToReceiptData({
        id: "abc",
        receipt_number: null,
        donor_name: "Test",
        donor_email: "a@b.com",
        amount_paise: 100,
        razorpay_payment_id: "pay_x",
        created_at: "2026-06-30T12:00:00.000Z",
      })
    ).toBeNull();
  });
});
