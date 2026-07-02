import { createSmtpTransporter, getSmtpConfig } from "@/lib/env/server";
import { dheOfficialContact } from "@/data/institution";
import { isBrevoApiConfigured, sendBrevoEmail } from "@/lib/email/send-via-brevo-api";

export async function sendRegistrationConfirmEmail(options: {
  toEmail: string;
  toName: string;
  programLabel: string;
}): Promise<void> {
  const subject = `Registration received — ${options.programLabel} | DHE`;
  const html = `
    <p>Dear ${options.toName},</p>
    <p>We have received your registration interest for <strong>${options.programLabel}</strong>.</p>
    <p>DHE will contact you at this email when the next program opens or if we need additional details.</p>
    <p>धन्यवाद — पंजीकरण प्राप्त हुआ।</p>
    <p>Questions: ${dheOfficialContact.email} | ${dheOfficialContact.phone}</p>
    <p><a href="https://www.dhe.org.in">www.dhe.org.in</a></p>
  `;

  if (isBrevoApiConfigured()) {
    const from =
      process.env.SMTP_FROM?.trim() ||
      process.env.SMTP_USER?.trim() ||
      getSmtpConfig()?.from;
    if (!from) return;
    await sendBrevoEmail(
      { service: "brevo", user: "", pass: "", from },
      { to: options.toEmail, toName: options.toName, subject, html }
    );
    return;
  }

  const smtp = getSmtpConfig();
  if (!smtp) return;
  const transporter = createSmtpTransporter(smtp);
  await transporter.sendMail({
    from: smtp.from,
    to: options.toEmail,
    subject,
    html,
  });
}
