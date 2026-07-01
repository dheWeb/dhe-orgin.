/**
 * Print secrets that should be rotated (shared in chat / long-lived).
 * Does not print values.
 */
console.log("=== Rotate these in provider dashboards ===");
const keys = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "RAZORPAY_KEY_SECRET",
  "RAZORPAY_WEBHOOK_SECRET",
  "RECAPTCHA_SECRET_KEY",
  "BREVO_API_KEY / SMTP_PASS",
  "ADMIN_PASSWORD",
  "SENTRY_AUTH_TOKEN",
];
for (const k of keys) console.log("•", k);
console.log("\nSee docs/secret-rotation-runbook.md");
