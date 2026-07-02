import { createSmtpTransporter, getSmtpConfig } from "@/lib/env/server";
import {
  generateDonationPdf,
  type DonationReceiptData,
} from "@/lib/receipts/generate-donation-pdf";
import { dheOfficialContact } from "@/data/institution";
import { isBrevoApiConfigured, sendBrevoEmail } from "@/lib/email/send-via-brevo-api";

function buildReceiptHtml(
  data: DonationReceiptData,
  downloadUrl?: string
): string {
  return `
      <p>Dear ${data.donorName},</p>
      <p>Thank you for your generous donation to the Department of Holistic Education.</p>
      <p>Receipt No.: <strong>${data.receiptNumber}</strong><br/>
      Amount: <strong>₹${data.amountInr.toLocaleString("en-IN")}</strong></p>
      <p>आपके उदार दान के लिए धन्यवाद — Your support advances holistic education and Viksit Bharat.</p>
      ${downloadUrl ? `<p>Download receipt: <a href="${downloadUrl}">${downloadUrl}</a></p>` : ""}
      <p>For queries: ${dheOfficialContact.email} | ${dheOfficialContact.phone}</p>
    `;
}

export async function sendDonationReceiptEmail(
  data: DonationReceiptData,
  options?: { downloadUrl?: string }
): Promise<void> {
  const pdf = await generateDonationPdf(data);
  const subject = `Donation Receipt ${data.receiptNumber} — DHE / दान रसीद`;
  const html = buildReceiptHtml(data, options?.downloadUrl);

  if (isBrevoApiConfigured()) {
    const from =
      process.env.SMTP_FROM?.trim() ||
      process.env.SMTP_USER?.trim() ||
      getSmtpConfig()?.from;
    if (!from) {
      throw new Error("SMTP_FROM is not configured");
    }
    await sendBrevoEmail(
      { service: "brevo", user: "", pass: "", from },
      {
        to: data.donorEmail,
        toName: data.donorName,
        subject,
        html,
        attachments: [
          {
            filename: `${data.receiptNumber}.pdf`,
            content: pdf,
          },
        ],
      }
    );
    return;
  }

  const smtp = getSmtpConfig();
  if (!smtp) {
    throw new Error("SMTP is not configured");
  }

  const transporter = createSmtpTransporter(smtp);
  await transporter.sendMail({
    from: smtp.from,
    to: data.donorEmail,
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
