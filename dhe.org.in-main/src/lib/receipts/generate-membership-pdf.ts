import { jsPDF } from "jspdf";
import { formatReceiptHeaderLines, receiptTitles } from "@/data/institution";

export type MembershipReceiptData = {
  receiptNumber: string;
  memberName: string;
  memberEmail: string;
  amountInr: number;
  paymentId: string;
  date: string;
  membershipCategory?: string;
  membershipType?: string;
};

export function generateMembershipPdf(data: MembershipReceiptData): Buffer {
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
  doc.text(receiptTitles.registration, 105, y, { align: "center" });

  y += 14;
  doc.setFontSize(10);
  doc.text(`Receipt No.: ${data.receiptNumber}`, 14, y);
  y += 7;
  doc.text(`Date: ${data.date}`, 14, y);
  y += 7;
  doc.text(`Razorpay Payment ID: ${data.paymentId}`, 14, y);

  y += 14;
  doc.text(`Member: ${data.memberName}`, 14, y);
  y += 7;
  doc.text(`Email: ${data.memberEmail}`, 14, y);
  if (data.membershipCategory || data.membershipType) {
    y += 7;
    doc.text(
      `Membership: ${[data.membershipCategory, data.membershipType].filter(Boolean).join(" — ")}`,
      14,
      y
    );
  }
  y += 7;
  doc.text(`Amount: INR ${data.amountInr.toLocaleString("en-IN")}`, 14, y);

  y += 14;
  doc.setFontSize(9);
  doc.text(
    "This receipt confirms membership payment to the Department of Holistic Education.",
    14,
    y,
    { maxWidth: 180 }
  );

  y += 12;
  doc.text("धन्यवाद — DHE सदस्यता के लिए आभार।", 14, y);
  y += 7;
  doc.text("Thank you for joining the holistic education movement.", 14, y);

  return Buffer.from(doc.output("arraybuffer"));
}
