import { sendDonationReceiptEmail } from "@/lib/email/send-donation-receipt";
import {
  donationRowToReceiptData,
  type DonationRow,
} from "@/lib/receipts/donation-receipt-from-row";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

function emailWasSent(metadata: Record<string, unknown> | null): boolean {
  return metadata?.receipt_email_sent === true;
}

/** Send receipt once per donation; safe to call from verify/webhook retries. */
export async function sendDonationReceiptIfNeeded(
  donationId: string
): Promise<{ sent: boolean; skipped?: boolean; error?: string }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { sent: false, error: "Database unavailable" };
  }

  const { data: row, error } = await supabase
    .from("donations")
    .select(
      "id, receipt_number, donor_name, donor_email, amount_paise, razorpay_payment_id, created_at, metadata, pan"
    )
    .eq("id", donationId)
    .maybeSingle();

  if (error || !row) {
    return { sent: false, error: error?.message || "Donation not found" };
  }

  const donation = row as DonationRow & { metadata: Record<string, unknown> | null };
  if (!donation.donor_email) {
    return { sent: false, skipped: true, error: "No donor email" };
  }

  if (emailWasSent(donation.metadata)) {
    return { sent: false, skipped: true };
  }

  if (!donation.razorpay_payment_id || donation.amount_paise == null) {
    return { sent: false, error: "Incomplete donation record" };
  }

  const receiptData = donationRowToReceiptData(donation);
  if (!receiptData) {
    return { sent: false, error: "Receipt data unavailable" };
  }

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dhe.org.in";
  const downloadUrl = `${site}/api/receipts/${donation.id}/pdf?email=${encodeURIComponent(donation.donor_email)}`;

  try {
    await sendDonationReceiptEmail(receiptData, { downloadUrl });
    const meta = { ...(donation.metadata ?? {}), receipt_email_sent: true };
    await supabase.from("donations").update({ metadata: meta }).eq("id", donationId);
    return { sent: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Email failed";
    return { sent: false, error: message };
  }
}
