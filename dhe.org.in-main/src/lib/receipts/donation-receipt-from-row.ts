import type { DonationReceiptData } from "@/lib/receipts/generate-donation-pdf";

export type DonationRow = {
  id: string;
  receipt_number: string | null;
  donor_name: string | null;
  donor_email: string | null;
  amount_paise: number;
  razorpay_payment_id: string;
  created_at: string;
};

export function donationRowToReceiptData(row: DonationRow): DonationReceiptData | null {
  if (!row.receipt_number) {
    return null;
  }

  return {
    receiptNumber: row.receipt_number,
    donorName: row.donor_name ?? "Donor",
    donorEmail: row.donor_email ?? "",
    amountInr: row.amount_paise / 100,
    paymentId: row.razorpay_payment_id,
    date: new Date(row.created_at).toLocaleDateString("en-IN"),
  };
}
