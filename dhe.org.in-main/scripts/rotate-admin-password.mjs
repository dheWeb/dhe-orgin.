/**
 * Set a unique ADMIN_PASSWORD in .env.local (distinct from DB password) and sync to Vercel.
 * Usage: node scripts/rotate-admin-password.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { randomBytes } from "crypto";
import { execSync } from "child_process";

const root = process.cwd();
const envPath = join(root, ".env.local");
if (!existsSync(envPath)) {
  console.error("Missing .env.local");
  process.exit(1);
}

const newPassword = randomBytes(18).toString("base64url");
let content = readFileSync(envPath, "utf8");

if (/^ADMIN_PASSWORD=/m.test(content)) {
  content = content.replace(/^ADMIN_PASSWORD=.*$/m, `ADMIN_PASSWORD=${newPassword}`);
} else {
  content += `\nADMIN_PASSWORD=${newPassword}\n`;
}

writeFileSync(envPath, content, "utf8");
console.log("Updated ADMIN_PASSWORD in .env.local");

const monorepoRoot = join(root, "..");
for (const target of ["production", "preview", "development"]) {
  try {
    execSync(`npx vercel env rm ADMIN_PASSWORD ${target} --yes`, {
      cwd: monorepoRoot,
      stdio: "pipe",
    });
  } catch {
    /* ignore */
  }
  execSync(`npx vercel env add ADMIN_PASSWORD ${target}`, {
    cwd: monorepoRoot,
    input: newPassword,
    stdio: ["pipe", "inherit", "inherit"],
  });
  console.log(`Synced ADMIN_PASSWORD to Vercel ${target}`);
}

console.log("\nSave this admin password in your password manager:");
console.log(newPassword);
