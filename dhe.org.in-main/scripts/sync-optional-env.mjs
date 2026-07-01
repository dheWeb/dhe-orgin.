/**
 * Sync Upstash + GA4 env vars to dhe.org.in-main/.env.local and Vercel.
 *
 * Upstash: set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
 * GA4: set NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. G-VZ55ESSK6V)
 *
 * Usage:
 *   $env:UPSTASH_REDIS_REST_URL="https://..."
 *   $env:UPSTASH_REDIS_REST_TOKEN="..."
 *   $env:NEXT_PUBLIC_GA_MEASUREMENT_ID="G-..."
 *   node scripts/sync-optional-env.mjs
 */
import { writeFileSync, existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import { parseEnvFile } from "./lib/parse-env.mjs";

const root = process.cwd();
const envPath = join(root, ".env.local");

const OPTIONAL_KEYS = [
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "NEXT_PUBLIC_GA_MEASUREMENT_ID",
];

const fromProcess = Object.fromEntries(
  OPTIONAL_KEYS.map((k) => [k, process.env[k]?.trim()]).filter(([, v]) => v)
);

if (!Object.keys(fromProcess).length) {
  console.error(
    "Set at least one of: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, NEXT_PUBLIC_GA_MEASUREMENT_ID"
  );
  process.exit(1);
}

if (
  (fromProcess.UPSTASH_REDIS_REST_URL && !fromProcess.UPSTASH_REDIS_REST_TOKEN) ||
  (!fromProcess.UPSTASH_REDIS_REST_URL && fromProcess.UPSTASH_REDIS_REST_TOKEN)
) {
  console.error("Upstash requires both UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.");
  process.exit(1);
}

const existing = existsSync(envPath) ? parseEnvFile(envPath) : {};
const merged = { ...existing, ...fromProcess };

writeFileSync(
  envPath,
  `${Object.entries(merged)
    .map(([k, v]) => `${k}=${v}`)
    .join("\n")}\n`,
  "utf8"
);
console.log("Updated .env.local with optional keys (not printed).");

const monorepoRoot = join(root, "..");
const targets = ["production", "preview", "development"];

for (const target of targets) {
  console.log(`\n=== Vercel ${target} ===`);
  for (const key of OPTIONAL_KEYS) {
    const value = merged[key];
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

console.log("\nOptional env sync complete. Redeploy production to apply GA4.");
