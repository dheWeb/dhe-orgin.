import { getSupabaseAdmin } from "@/lib/supabase/admin";

export type VerifiedReceipt = {
  id: string;
  receiptNumber: string;
  donorName: string;
  amountInr: number;
  status: string;
  date: string;
};

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export async function verifyDonationReceipt(
  receiptNumber: string,
  email: string
): Promise<VerifiedReceipt | null> {
  const number = receiptNumber.trim();
  const donorEmail = normalizeEmail(email);

  if (!number || !donorEmail) return null;

  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("donations")
    .select(
      "id, receipt_number, donor_name, donor_email, amount_paise, status, created_at"
    )
    .eq("receipt_number", number)
    .maybeSingle();

  if (error || !data?.receipt_number) return null;
  if (normalizeEmail(data.donor_email ?? "") !== donorEmail) return null;

  return {
    id: data.id,
    receiptNumber: data.receipt_number,
    donorName: data.donor_name ?? "Donor",
    amountInr: data.amount_paise / 100,
    status: data.status,
    date: new Date(data.created_at).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  };
}
