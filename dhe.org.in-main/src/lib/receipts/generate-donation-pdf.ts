import { jsPDF } from "jspdf";
import { formatReceiptHeaderLines, receiptTitles } from "@/data/institution";

export type DonationReceiptData = {
  receiptNumber: string;
  donorName: string;
  donorEmail: string;
  amountInr: number;
  paymentId: string;
  date: string;
};

export function generateDonationPdf(data: DonationReceiptData): Buffer {
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
  y += 7;
  doc.text(`Amount: INR ${data.amountInr.toLocaleString("en-IN")}`, 14, y);

  y += 14;
  doc.setFontSize(9);
  doc.text(
    "Donation eligible for deduction u/s 80G subject to Income Tax provisions.",
    14,
    y,
    { maxWidth: 180 }
  );

  y += 12;
  doc.text("धन्यवाद — आपके उदार दान के लिए हार्दिक आभार।", 14, y);
  y += 7;
  doc.text("Thank you for supporting holistic education and Viksit Bharat.", 14, y);

  return Buffer.from(doc.output("arraybuffer"));
}
