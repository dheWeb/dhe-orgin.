import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { formatReceiptHeaderLines, receiptTitles } from "@/data/institution";
import { hindiThanks } from "@/data/institution/hindi-thanks";
import { buildReceiptVerifyUrl } from "@/lib/receipts/receipt-verify-url";

export type DonationReceiptData = {
  receiptNumber: string;
  donorName: string;
  donorEmail: string;
  amountInr: number;
  paymentId: string;
  date: string;
  donorPan?: string;
};

export async function generateDonationPdf(data: DonationReceiptData): Promise<Buffer> {
  const doc = new jsPDF();
  const header = formatReceiptHeaderLines();

  let y = 18;
  doc.setFontSize(11);
  for (const line of header) {
    if (line) {
      doc.text(line, 105, y, { align: "center" });
    }
    y += 6;
  }

  y += 8;
  doc.setFontSize(14);
  doc.text(receiptTitles.donation, 105, y, { align: "center" });

  y += 14;
  doc.setFontSize(10);
  doc.text(`Receipt No.: ${data.receiptNumber}`, 14, y);
  y += 7;
  doc.text(`Date: ${data.date}`, 14, y);
  y += 7;
  doc.text(`Razorpay Payment ID: ${data.paymentId}`, 14, y);

  y += 14;
  doc.text(`Received from: ${data.donorName}`, 14, y);
  y += 7;
  doc.text(`Email: ${data.donorEmail}`, 14, y);
  if (data.donorPan?.trim()) {
    y += 7;
    doc.text(`PAN: ${data.donorPan.trim()}`, 14, y);
  }
  y += 7;
  doc.text(`Amount: INR ${data.amountInr.toLocaleString("en-IN")}`, 14, y);

  y += 14;
  doc.setFontSize(9);
  doc.text(
    "Donation eligible for deduction u/s 80G subject to Income Tax provisions.",
    14,
    y,
    { maxWidth: 120 }
  );

  y += 12;
  doc.text(hindiThanks.donationHi, 14, y);
  y += 7;
  doc.text("Thank you for supporting holistic education and Viksit Bharat.", 14, y);

  try {
    const verifyUrl = buildReceiptVerifyUrl(data.receiptNumber, data.donorEmail);
    const qr = await QRCode.toDataURL(verifyUrl, { margin: 1, width: 128 });
    doc.addImage(qr, "PNG", 150, 42, 42, 42);
    doc.setFontSize(7);
    doc.text("Scan to verify receipt", 150, 88);
  } catch {
    // QR optional — PDF still valid without it
  }

  return Buffer.from(doc.output("arraybuffer"));
}
