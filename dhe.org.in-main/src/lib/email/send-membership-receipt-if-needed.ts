import { sendMembershipReceiptEmail } from "@/lib/email/send-membership-receipt";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export type MembershipApplicationRow = {
  id: string;
  name: string;
  email: string;
  receipt_number: string | null;
  fee_amount_paise: number | null;
  razorpay_payment_id: string | null;
  membership_category: string;
  membership_type: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

function emailWasSent(metadata: Record<string, unknown> | null): boolean {
  return metadata?.receipt_email_sent === true;
}

/** Send membership receipt once; safe from verify/webhook retries. */
export async function sendMembershipReceiptIfNeeded(
  applicationId: string,
  options?: { receiptNumber?: string; amountInr?: number; paymentId?: string }
): Promise<{ sent: boolean; skipped?: boolean; error?: string; receiptNumber?: string }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { sent: false, error: "Database unavailable" };
  }

  const { data: row, error } = await supabase
    .from("membership_applications")
    .select(
      "id, name, email, receipt_number, fee_amount_paise, razorpay_payment_id, membership_category, membership_type, metadata, created_at"
    )
    .eq("id", applicationId)
    .maybeSingle();

  if (error || !row) {
    return { sent: false, error: error?.message || "Application not found" };
  }

  const app = row as MembershipApplicationRow;
  if (!app.email) {
    return { sent: false, skipped: true, error: "No member email" };
  }

  if (emailWasSent(app.metadata)) {
    return { sent: false, skipped: true, receiptNumber: app.receipt_number ?? undefined };
  }

  if (!app.razorpay_payment_id) {
    return { sent: false, error: "Payment not recorded" };
  }

  const receiptNumber = options?.receiptNumber ?? app.receipt_number;
  if (!receiptNumber) {
    return { sent: false, error: "Receipt number not allocated" };
  }

  const amountInr =
    options?.amountInr ??
    (app.fee_amount_paise != null ? app.fee_amount_paise / 100 : undefined);
  if (amountInr == null) {
    return { sent: false, error: "Fee amount unavailable" };
  }

  try {
    await sendMembershipReceiptEmail({
      receiptNumber,
      memberName: app.name,
      memberEmail: app.email,
      amountInr,
      paymentId: options?.paymentId ?? app.razorpay_payment_id,
      date: new Date(app.created_at).toLocaleDateString("en-IN"),
      membershipCategory: app.membership_category,
      membershipType: app.membership_type,
    });

    const meta = { ...(app.metadata ?? {}), receipt_email_sent: true };
    await supabase
      .from("membership_applications")
      .update({ metadata: meta, receipt_number: receiptNumber })
      .eq("id", applicationId);

    return { sent: true, receiptNumber };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Email failed";
    return { sent: false, error: message };
  }
}
