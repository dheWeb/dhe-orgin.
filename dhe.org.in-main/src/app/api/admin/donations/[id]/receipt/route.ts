import { NextRequest, NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/auth/authorize-admin-request";
import { sendDonationReceiptEmail } from "@/lib/email/send-donation-receipt";
import { donationRowToReceiptData } from "@/lib/receipts/donation-receipt-from-row";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, context: RouteContext) {
  if (!(await isAdminRequestAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Database unavailable." }, { status: 503 });
  }

  const { data: row, error } = await supabase
    .from("donations")
    .select(
      "id, receipt_number, donor_name, donor_email, amount_paise, razorpay_payment_id, created_at, metadata"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!row?.donor_email) {
    return NextResponse.json({ error: "Donation or email not found" }, { status: 404 });
  }

  const receiptData = donationRowToReceiptData(row);
  if (!receiptData) {
    return NextResponse.json({ error: "Receipt not available" }, { status: 404 });
  }

  try {
    await sendDonationReceiptEmail(receiptData);
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const meta = {
        ...((row.metadata as Record<string, unknown>) ?? {}),
        receipt_email_sent: true,
      };
      await supabase.from("donations").update({ metadata: meta }).eq("id", id);
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Email failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
