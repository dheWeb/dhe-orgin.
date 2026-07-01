/**
 * Print admin username (not password) for login troubleshooting.
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const envPath = join(process.cwd(), ".env.local");
if (!existsSync(envPath)) {
  console.error("Open dhe.org.in-main/.env.local — root .env.local is NOT used for admin.");
  process.exit(1);
}

const env = {};
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  env[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
}

console.log("Admin login file: dhe.org.in-main/.env.local");
console.log("Username (ADMIN_USERNAME):", env.ADMIN_USERNAME ?? "(not set)");
console.log("Password: see ADMIN_PASSWORD in the same file (do not share in chat)");
console.log("Login URL: https://www.dhe.org.in/admin");
