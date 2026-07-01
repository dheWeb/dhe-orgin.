import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/auth/admin-gate";
import { generateDonationPdf } from "@/lib/receipts/generate-donation-pdf";
import { donationRowToReceiptData } from "@/lib/receipts/donation-receipt-from-row";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

function normalizeEmail(value: string | null): string | null {
  const trimmed = value?.trim().toLowerCase();
  return trimmed || null;
}

export async function GET(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  if (!id?.trim()) {
    return NextResponse.json({ error: "Receipt id required" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Database unavailable." }, { status: 503 });
  }

  const { data: row, error } = await supabase
    .from("donations")
    .select(
      "id, receipt_number, donor_name, donor_email, amount_paise, razorpay_payment_id, created_at"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!row) {
    return NextResponse.json({ error: "Donation not found" }, { status: 404 });
  }

  const adminOk = isAdminAuthorized(req.headers.get("authorization"));
  const emailParam = normalizeEmail(req.nextUrl.searchParams.get("email"));

  if (!adminOk) {
    const donorEmail = normalizeEmail(row.donor_email);
    if (!emailParam || !donorEmail || emailParam !== donorEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const receiptData = donationRowToReceiptData(row);
  if (!receiptData) {
    return NextResponse.json({ error: "Receipt not available" }, { status: 404 });
  }

  const pdf = generateDonationPdf(receiptData);
  const filename = `${receiptData.receiptNumber}.pdf`;

  return new NextResponse(new Uint8Array(pdf), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
