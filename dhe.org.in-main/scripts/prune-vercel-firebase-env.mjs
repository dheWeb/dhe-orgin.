/**
 * Remove legacy NEXT_PUBLIC_FIREBASE_* vars from Vercel (all environments).
 * Usage: node scripts/prune-vercel-firebase-env.mjs
 */
import { execSync } from "child_process";
import { join } from "path";

const FIREBASE_KEYS = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
];

const monorepoRoot = join(process.cwd(), "..");
const targets = ["production", "preview", "development"];

for (const target of targets) {
  console.log(`\n=== ${target} ===`);
  for (const key of FIREBASE_KEYS) {
    try {
      execSync(`npx vercel env rm ${key} ${target} --yes`, {
        cwd: monorepoRoot,
        stdio: "pipe",
      });
      console.log("removed:", key);
    } catch {
      console.log("skip (absent):", key);
    }
  }
}

console.log("\nFirebase env vars pruned from Vercel.");
