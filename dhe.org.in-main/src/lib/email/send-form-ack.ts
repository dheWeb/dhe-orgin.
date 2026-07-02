import { createSmtpTransporter, getSmtpConfig } from "@/lib/env/server";
import { dheOfficialContact } from "@/data/institution";
import { isBrevoApiConfigured, sendBrevoEmail } from "@/lib/email/send-via-brevo-api";

export async function sendFormAckEmail(options: {
  toEmail: string;
  toName?: string;
  subject: string;
  html: string;
}): Promise<void> {
  const toName = options.toName?.trim() || options.toEmail;

  if (isBrevoApiConfigured()) {
    const from =
      process.env.SMTP_FROM?.trim() ||
      process.env.SMTP_USER?.trim() ||
      getSmtpConfig()?.from;
    if (!from) return;
    await sendBrevoEmail(
      { service: "brevo", user: "", pass: "", from },
      { to: options.toEmail, toName, subject: options.subject, html: options.html }
    );
    return;
  }

  const smtp = getSmtpConfig();
  if (!smtp) return;
  const transporter = createSmtpTransporter(smtp);
  await transporter.sendMail({
    from: smtp.from,
    to: options.toEmail,
    subject: options.subject,
    html: options.html,
  });
}

export async function sendRegistrationConfirmEmail(options: {
  toEmail: string;
  toName: string;
  programLabel: string;
}): Promise<void> {
  await sendFormAckEmail({
    toEmail: options.toEmail,
    toName: options.toName,
    subject: `Registration received — ${options.programLabel} | DHE`,
    html: `
      <p>Dear ${options.toName},</p>
      <p>We have received your registration interest for <strong>${options.programLabel}</strong>.</p>
      <p>DHE will contact you at this email when the next program opens or if we need additional details.</p>
      <p>धन्यवाद — पंजीकरण प्राप्त हुआ।</p>
      <p>Questions: ${dheOfficialContact.email} | ${dheOfficialContact.phone}</p>
      <p><a href="https://www.dhe.org.in">www.dhe.org.in</a></p>
    `,
  });
}

export async function sendContactAckEmail(options: {
  toEmail: string;
}): Promise<void> {
  await sendFormAckEmail({
    toEmail: options.toEmail,
    subject: "We received your message — DHE",
    html: `
      <p>Thank you for contacting the Department of Holistic Education.</p>
      <p>We have received your message and will respond to <strong>${options.toEmail}</strong> as soon as possible.</p>
      <p>धन्यवाद — आपका संदेश प्राप्त हुआ।</p>
      <p>${dheOfficialContact.email} | ${dheOfficialContact.phone}</p>
    `,
  });
}

export async function sendFeedbackAckEmail(options: {
  toEmail: string;
  toName: string;
}): Promise<void> {
  await sendFormAckEmail({
    toEmail: options.toEmail,
    toName: options.toName,
    subject: "Feedback received — DHE",
    html: `
      <p>Dear ${options.toName},</p>
      <p>Thank you for sharing your feedback with DHE. Your response helps us improve programs nationwide.</p>
      <p>धन्यवाद — आपकी प्रतिक्रिया प्राप्त हुई।</p>
      <p>${dheOfficialContact.email}</p>
    `,
  });
}

export async function sendMembershipApplicationAckEmail(options: {
  toEmail: string;
  toName: string;
  feeInr: number;
}): Promise<void> {
  await sendFormAckEmail({
    toEmail: options.toEmail,
    toName: options.toName,
    subject: "DHE membership application saved — complete payment",
    html: `
      <p>Dear ${options.toName},</p>
      <p>Your DHE membership application has been saved. Please complete the Razorpay payment of <strong>₹${options.feeInr.toLocaleString("en-IN")}</strong> on the membership page to finalize your application.</p>
      <p><a href="https://www.dhe.org.in/contribute">Continue at dhe.org.in/contribute</a></p>
      <p>धन्यवाद — सदस्यता आवेदन प्राप्त हुआ।</p>
      <p>${dheOfficialContact.email} | ${dheOfficialContact.phone}</p>
    `,
  });
}
