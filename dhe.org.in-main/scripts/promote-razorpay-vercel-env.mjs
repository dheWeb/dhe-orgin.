/**
 * Promote RAZORPAY_*_NEW (or existing) values to canonical Vercel env names.
 * Run from repo root:
 *   npx vercel env run -e production -- node dhe.org.in-main/scripts/promote-razorpay-vercel-env.mjs production
 *   npx vercel env run -e preview -- node dhe.org.in-main/scripts/promote-razorpay-vercel-env.mjs preview
 *
 * Does not print secret values.
 */
import { execSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const monorepoRoot = join(__dirname, "..", "..");

const target = process.argv[2] || "production";

function pick(...keys) {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return null;
}

const keyId = pick("RAZORPAY_KEY_ID_NEW", "RAZORPAY_KEY_ID");
const keySecret = pick("RAZORPAY_KEY_SECRET_NEW", "RAZORPAY_KEY_SECRET");
const webhookSecret = pick(
  "RAZORPAY_WEBHOOK_SECRET_NEW",
  "RAZORPAY_WEBHOOK_SECRET"
);

const missing = [];
if (!keyId) missing.push("RAZORPAY_KEY_ID(_NEW)");
if (!keySecret) missing.push("RAZORPAY_KEY_SECRET(_NEW)");
if (!webhookSecret) missing.push("RAZORPAY_WEBHOOK_SECRET(_NEW)");

if (missing.length) {
  console.error(`Missing for ${target}:`, missing.join(", "));
  process.exit(1);
}

if (!keyId.startsWith("rzp_live_") && target === "production") {
  console.warn(
    `Warning: key id for ${target} does not start with rzp_live_ — confirm Live mode keys.`
  );
}

function upsert(name, value) {
  try {
    execSync(`npx vercel env update ${name} ${target} --value ${JSON.stringify(value)} -y`, {
      cwd: monorepoRoot,
      stdio: ["pipe", "pipe", "pipe"],
    });
    console.log(`updated: ${name} (${target})`);
    return;
  } catch {
    // variable may not exist yet
  }
  execSync(`npx vercel env add ${name} ${target}`, {
    cwd: monorepoRoot,
    input: value,
    stdio: ["pipe", "pipe", "pipe"],
  });
  console.log(`added: ${name} (${target})`);
}

console.log(`Syncing Razorpay env for ${target}…`);
upsert("RAZORPAY_KEY_ID", keyId);
upsert("RAZORPAY_KEY_SECRET", keySecret);
upsert("RAZORPAY_WEBHOOK_SECRET", webhookSecret);
upsert("NEXT_PUBLIC_RAZORPAY_KEY_ID", keyId);
console.log(`Done. Redeploy ${target} for NEXT_PUBLIC_* to take effect.`);
