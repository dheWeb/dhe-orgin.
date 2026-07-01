/**
 * Write Sentry env vars to dhe.org.in-main/.env.local and sync to Vercel.
 * Usage: set vars in environment, then node scripts/sync-sentry-env.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import { parseEnvFile } from "./lib/parse-env.mjs";

const root = process.cwd();
const envPath = join(root, ".env.local");

const SENTRY_KEYS = [
  "NEXT_PUBLIC_SENTRY_DSN",
  "SENTRY_DSN",
  "SENTRY_AUTH_TOKEN",
  "SENTRY_ORG",
  "SENTRY_PROJECT",
];

const fromProcess = Object.fromEntries(
  SENTRY_KEYS.map((k) => [k, process.env[k]?.trim()]).filter(([, v]) => v)
);

if (!fromProcess.NEXT_PUBLIC_SENTRY_DSN && !fromProcess.SENTRY_DSN) {
  console.error(
    "Set NEXT_PUBLIC_SENTRY_DSN (and optionally SENTRY_AUTH_TOKEN) in the environment first."
  );
  process.exit(1);
}

if (!fromProcess.SENTRY_DSN && fromProcess.NEXT_PUBLIC_SENTRY_DSN) {
  fromProcess.SENTRY_DSN = fromProcess.NEXT_PUBLIC_SENTRY_DSN;
}

const existing = existsSync(envPath) ? parseEnvFile(envPath) : {};
const merged = { ...existing, ...fromProcess };

const lines = Object.entries(merged).map(([k, v]) => `${k}=${v}`);
writeFileSync(envPath, `${lines.join("\n")}\n`, "utf8");
console.log("Updated .env.local with Sentry keys (not printed).");

const monorepoRoot = join(root, "..");
const targets = ["production", "preview", "development"];

for (const target of targets) {
  console.log(`\n=== Vercel ${target} ===`);
  for (const key of SENTRY_KEYS) {
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

console.log("\nSentry env sync complete. Redeploy production for source maps.");
