import { NextRequest, NextResponse } from "next/server";
import { isAdminRequestAuthorized } from "@/lib/auth/authorize-admin-request";
import { sendMembershipReceiptEmail } from "@/lib/email/send-membership-receipt";
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
    .from("membership_applications")
    .select(
      "id, name, email, receipt_number, fee_amount_paise, razorpay_payment_id, membership_category, membership_type, created_at, metadata, payment_status"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!row?.email || row.payment_status !== "paid") {
    return NextResponse.json(
      { error: "Paid membership application not found" },
      { status: 404 }
    );
  }

  if (!row.receipt_number || !row.razorpay_payment_id || row.fee_amount_paise == null) {
    return NextResponse.json({ error: "Receipt data incomplete" }, { status: 404 });
  }

  try {
    await sendMembershipReceiptEmail({
      receiptNumber: row.receipt_number,
      memberName: row.name,
      memberEmail: row.email,
      amountInr: row.fee_amount_paise / 100,
      paymentId: row.razorpay_payment_id,
      date: new Date(row.created_at).toLocaleDateString("en-IN"),
      membershipCategory: row.membership_category,
      membershipType: row.membership_type,
    });
    const meta = {
      ...((row.metadata as Record<string, unknown>) ?? {}),
      receipt_email_sent: true,
    };
    await supabase.from("membership_applications").update({ metadata: meta }).eq("id", id);
    return NextResponse.json({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Email failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
