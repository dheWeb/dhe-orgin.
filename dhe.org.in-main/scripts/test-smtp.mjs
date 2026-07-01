/**
 * Send a test email via Brevo SMTP from .env.local
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const envPath = join(process.cwd(), ".env.local");
const env = {};
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  env[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
}

const to = process.argv[2] ?? env.ADMIN_USERNAME;
if (!to) {
  console.error("Usage: node scripts/test-smtp.mjs [recipient@email.com]");
  process.exit(1);
}

const apiKey = env.BREVO_API_KEY?.trim() || env.SMTP_PASS?.trim();
if (!apiKey) {
  console.error("Set BREVO_API_KEY or SMTP_PASS in .env.local");
  process.exit(1);
}

const res = await fetch("https://api.brevo.com/v3/smtp/email", {
  method: "POST",
  headers: {
    "api-key": apiKey,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    sender: { email: env.SMTP_FROM, name: "DHE" },
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
