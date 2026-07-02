/**
 * Verify env vars are set and core integrations respond (post-rotation).
 * Usage: node scripts/verify-secrets.mjs
 */
import { join } from "path";
import { parseEnvFile } from "./lib/parse-env.mjs";

const env = { ...process.env, ...parseEnvFile(join(process.cwd(), ".env.local")) };

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "RAZORPAY_KEY_ID_NEW",
  "RAZORPAY_KEY_SECRET_NEW",
  "RAZORPAY_WEBHOOK_SECRET_NEW",
  "NEXT_PUBLIC_RAZORPAY_KEY_ID",
  "NEXT_PUBLIC_RECAPTCHA_SITE_KEY",
  "RECAPTCHA_SECRET_KEY",
  "SMTP_FROM",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
];

const recommended = ["BREVO_API_KEY", "SMTP_USER", "SMTP_PASS"];

const optional = [
  "SENTRY_DSN",
  "NEXT_PUBLIC_SENTRY_DSN",
  "SENTRY_AUTH_TOKEN",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "NEXT_PUBLIC_GA_MEASUREMENT_ID",
];

let ok = true;

console.log("=== Required env ===");
for (const key of required) {
  const set = Boolean(env[key]?.trim());
  console.log(set ? "✓" : "✗", key);
  if (!set) ok = false;
}

console.log("\n=== Recommended env ===");
for (const key of recommended) {
  const set = Boolean(env[key]?.trim());
  console.log(set ? "✓" : "○", key);
}

console.log("\n=== Optional (dashboard) ===");
for (const key of optional) {
  const set = Boolean(env[key]?.trim());
  console.log(set ? "✓" : "○", key);
}

const firebaseLeft = Object.keys(env).filter((k) => k.includes("FIREBASE"));
if (firebaseLeft.length) {
  console.log("\n⚠ Remove legacy Firebase vars from .env.local:", firebaseLeft.join(", "));
}

console.log("\n=== Live checks (production) ===");
const base = "https://www.dhe.org.in";

try {
  const health = await fetch(`${base}/api/health`);
  console.log(health.ok ? "✓" : "✗", "/api/health", health.status);
  if (!health.ok) ok = false;
} catch (e) {
  console.log("✗", "/api/health", e.message);
  ok = false;
}

try {
  const notices = await fetch(`${base}/api/notices`);
  const data = await notices.json();
  console.log(
    notices.ok && Array.isArray(data.notices) ? "✓" : "✗",
    "/api/notices",
    `count=${data.notices?.length ?? 0}`
  );
} catch (e) {
  console.log("✗", "/api/notices", e.message);
  ok = false;
}

console.log(ok ? "\nRequired env OK." : "\nFix missing env before deploy.");
process.exit(ok ? 0 : 1);
