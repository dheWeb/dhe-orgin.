/**
 * Send a test email via Brevo REST API from .env.local
 */
import { join } from "path";
import { parseEnvFile } from "./lib/parse-env.mjs";

const env = parseEnvFile(join(process.cwd(), ".env.local")) ?? {};

const to = process.argv[2] ?? env.ADMIN_USERNAME;
if (!to) {
  console.error("Usage: node scripts/test-smtp.mjs [recipient@email.com]");
  process.exit(1);
}

const apiKey =
  env.BREVO_API_KEY?.trim() ||
  env.SMTP_API_KEY_NEW?.trim() ||
  env.SMTP_KEY_NEW?.trim() ||
  env.MCP_API_KEY_NEW?.trim() ||
  (env.SMTP_PASS?.trim()?.startsWith("xkeysib-") ? env.SMTP_PASS.trim() : "");
if (!apiKey) {
  console.error(
    "Set BREVO_API_KEY (xkeysib-...) in dhe.org.in-main/.env.local — SMTP xsmtpsib keys do not work with the API."
  );
  process.exit(1);
}

const from = env.SMTP_FROM?.trim() || env.SMTP_USER?.trim();
if (!from) {
  console.error("Set SMTP_FROM in .env.local");
  process.exit(1);
}

const res = await fetch("https://api.brevo.com/v3/smtp/email", {
  method: "POST",
  headers: {
    "api-key": apiKey,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    sender: { email: from, name: "DHE" },
    to: [{ email: to }],
    subject: "DHE SMTP test — receipt pipeline",
    htmlContent: "<p>If you receive this, Brevo email API is working for dhe.org.in.</p>",
  }),
});

if (!res.ok) {
  console.error("Brevo API failed:", res.status, await res.text());
  process.exit(1);
}

console.log("Brevo API email sent to", to);
