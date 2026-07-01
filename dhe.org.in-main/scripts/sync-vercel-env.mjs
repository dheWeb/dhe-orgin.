/**
 * Sync .env.local secrets to Vercel production (non-interactive).
 * Usage: node scripts/sync-vercel-env.mjs
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import { parseEnvFile } from "./lib/parse-env.mjs";

const root = process.cwd();
const envPath = join(root, ".env.local");
if (!existsSync(envPath)) {
  console.error("Missing .env.local");
  process.exit(1);
}

const env = parseEnvFile(envPath);

const keys = [
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
  "NEXT_PUBLIC_NOTICE_ADMIN_EMAILS",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_DB_PASSWORD",
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_SECRET",
  "RAZORPAY_WEBHOOK_SECRET",
  "NEXT_PUBLIC_RAZORPAY_KEY_ID",
  "NEXT_PUBLIC_RECAPTCHA_SITE_KEY",
  "RECAPTCHA_SECRET_KEY",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_FROM",
  "BREVO_API_KEY",
  "SMTP_API_KEY_NEW",
  "SMTP_KEY_NEW",
  "MCP_API_KEY_NEW",
  "NEXT_PUBLIC_SITE_URL",
];

const monorepoRoot = join(root, "..");
const targets = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["production", "preview", "development"];

for (const target of targets) {
  console.log(`\n=== ${target} ===`);
  for (const key of keys) {
    const value = env[key];
    if (!value) {
      console.log("skip (unset):", key);
      continue;
    }
    try {
      execSync(`npx vercel env rm ${key} ${target} --yes`, {
        cwd: monorepoRoot,
        stdio: "pipe",
      });
    } catch {
      // may not exist
    }
    execSync(`npx vercel env add ${key} ${target}`, {
      cwd: monorepoRoot,
      input: value,
      stdio: ["pipe", "inherit", "inherit"],
    });
    console.log("synced:", key);
  }
}

console.log("Vercel production env sync complete.");
