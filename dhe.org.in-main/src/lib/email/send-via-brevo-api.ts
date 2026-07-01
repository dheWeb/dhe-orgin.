import type { SmtpConfig } from "@/lib/env/server";

type BrevoAttachment = {
  name: string;
  content: string;
};

type BrevoEmailPayload = {
  sender: { email: string; name?: string };
  to: Array<{ email: string; name?: string }>;
  subject: string;
  htmlContent: string;
  attachment?: BrevoAttachment[];
};

function getBrevoApiKey(): string | null {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  if (apiKey) return apiKey;
  const smtpPass = process.env.SMTP_PASS?.trim();
  if (smtpPass?.startsWith("xkeysib-")) return smtpPass;
  return null;
}

export function isBrevoApiConfigured(): boolean {
  return Boolean(getBrevoApiKey());
}

/** Send via Brevo REST API (no SMTP IP allowlist issues on Vercel). */
export async function sendBrevoEmail(
  smtp: SmtpConfig,
  options: {
    to: string;
    toName?: string;
    subject: string;
    html: string;
    attachments?: Array<{ filename: string; content: Buffer }>;
  }
): Promise<void> {
  const apiKey = getBrevoApiKey();
  if (!apiKey) {
    throw new Error("Brevo API key is not configured");
  }

  const payload: BrevoEmailPayload = {
    sender: {
      email: smtp.from,
      name: "Department of Holistic Education",
    },
    to: [{ email: options.to, name: options.toName }],
    subject: options.subject,
    htmlContent: options.html,
  };

  if (options.attachments?.length) {
    payload.attachment = options.attachments.map((file) => ({
      name: file.filename,
      content: file.content.toString("base64"),
    }));
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo API ${res.status}: ${body.slice(0, 200)}`);
  }
}
