/**
 * Verify env vars are set and core integrations respond (post-rotation).
 * Usage: node scripts/verify-secrets.mjs
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";

function loadEnvLocal() {
  const envPath = join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return {};
  const env = {};
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
  }
  return env;
}

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_SECRET",
  "RAZORPAY_WEBHOOK_SECRET",
  "NEXT_PUBLIC_RAZORPAY_KEY_ID",
  "NEXT_PUBLIC_RECAPTCHA_SITE_KEY",
  "RECAPTCHA_SECRET_KEY",
  "SMTP_HOST",
  "SMTP_USER",
  "SMTP_PASS",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
];

const env = { ...process.env, ...loadEnvLocal() };
let ok = true;

console.log("=== Env presence ===");
for (const key of required) {
  const set = Boolean(env[key]?.trim());
  console.log(set ? "✓" : "✗", key);
  if (!set) ok = false;
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

if (env.RECAPTCHA_SECRET_KEY) {
  const verify = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: env.RECAPTCHA_SECRET_KEY,
      response: "test-invalid-token",
    }),
  });
  const rec = await verify.json();
  console.log(
    rec["error-codes"]?.includes("invalid-input-response") ? "✓" : "?",
    "reCAPTCHA secret (API reachable)",
    rec.success === false ? "secret accepted by Google" : JSON.stringify(rec)
  );
}

console.log(ok ? "\nAll required env vars set." : "\nMissing env vars — fix before deploy.");
process.exit(ok ? 0 : 1);
