import { hindiThanks } from "@/data/institution/hindi-thanks";
import { createSmtpTransporter, getSmtpConfig } from "@/lib/env/server";
import {
  generateMembershipPdf,
  type MembershipReceiptData,
} from "@/lib/receipts/generate-membership-pdf";
import { dheOfficialContact } from "@/data/institution";
import { isBrevoApiConfigured, sendBrevoEmail } from "@/lib/email/send-via-brevo-api";

function buildHtml(data: MembershipReceiptData): string {
  return `
    <p>Dear ${data.memberName},</p>
    <p>Thank you for your DHE membership payment.</p>
    <p>Receipt No.: <strong>${data.receiptNumber}</strong><br/>
    Amount: <strong>₹${data.amountInr.toLocaleString("en-IN")}</strong></p>
    <p>${hindiThanks.membership}</p>
    <p>For queries: ${dheOfficialContact.email} | ${dheOfficialContact.phone}</p>
  `;
}

export async function sendMembershipReceiptEmail(
  data: MembershipReceiptData
): Promise<void> {
  const pdf = generateMembershipPdf(data);
  const subject = `Membership Receipt ${data.receiptNumber} — DHE / सदस्यता रसीद`;
  const html = buildHtml(data);

  if (isBrevoApiConfigured()) {
    const from =
      process.env.SMTP_FROM?.trim() ||
      process.env.SMTP_USER?.trim() ||
      getSmtpConfig()?.from;
    if (!from) throw new Error("SMTP_FROM is not configured");
    await sendBrevoEmail(
      { service: "brevo", user: "", pass: "", from },
      {
        to: data.memberEmail,
        toName: data.memberName,
        subject,
        html,
        attachments: [{ filename: `${data.receiptNumber}.pdf`, content: pdf }],
      }
    );
    return;
  }

  const smtp = getSmtpConfig();
  if (!smtp) throw new Error("SMTP is not configured");

  const transporter = createSmtpTransporter(smtp);
  await transporter.sendMail({
    from: smtp.from,
    to: data.memberEmail,
    subject,
    html,
    attachments: [
      {
        filename: `${data.receiptNumber}.pdf`,
        content: pdf,
        contentType: "application/pdf",
      },
    ],
  });
}
