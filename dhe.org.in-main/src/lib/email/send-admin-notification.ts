import { dheOfficialContact } from "@/data/institution/receipt-and-lmc";
import { getSmtpConfig } from "@/lib/env/server";
import { isBrevoApiConfigured, sendBrevoEmail } from "@/lib/email/send-via-brevo-api";

export async function notifyAdminFormSubmission(options: {
  formName: string;
  fields: Record<string, string>;
}): Promise<void> {
  const smtp = getSmtpConfig();
  if (!smtp || !isBrevoApiConfigured()) return;

  const rows = Object.entries(options.fields)
    .filter(([, value]) => value.trim())
    .map(
      ([key, value]) =>
        `<tr><td style="padding:4px 8px;font-weight:600">${escapeHtml(key)}</td><td style="padding:4px 8px">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const html = `
    <p>New <strong>${escapeHtml(options.formName)}</strong> submission on dhe.org.in:</p>
    <table border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${rows}</table>
  `;

  try {
    await sendBrevoEmail(smtp, {
      to: dheOfficialContact.email,
      subject: `[DHE] New ${options.formName} submission`,
      html,
    });
  } catch (error) {
    console.error("[notifyAdminFormSubmission]", error);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
