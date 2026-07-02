import { NextRequest, NextResponse } from "next/server";
import { verifyDonationReceipt } from "@/lib/receipts/verify-donation-receipt";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RECEIPT_REGEX = /^DHE-\d{4}-\d{2}-\d+$/i;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const limit = await checkRateLimit(`receipt-verify:${ip}`);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  const receiptNumber = String(
    req.nextUrl.searchParams.get("receipt_number") ?? ""
  ).trim();
  const email = String(req.nextUrl.searchParams.get("email") ?? "").trim();

  if (!receiptNumber || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Valid receipt number and email are required." },
      { status: 400 }
    );
  }

  if (!RECEIPT_REGEX.test(receiptNumber)) {
    return NextResponse.json(
      { error: "Receipt number format is invalid." },
      { status: 400 }
    );
  }

  const verified = await verifyDonationReceipt(receiptNumber, email);
  if (!verified) {
    return NextResponse.json(
      { valid: false, error: "No matching receipt found for these details." },
      { status: 404 }
    );
  }

  const pdfUrl = `/api/receipts/${verified.id}/pdf?email=${encodeURIComponent(email)}`;

  return NextResponse.json({
    valid: true,
    ...verified,
    pdfUrl,
  });
}
