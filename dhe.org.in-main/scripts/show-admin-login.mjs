/**
 * Print admin username (not password) for login troubleshooting.
 */
import { join } from "path";
import { existsSync } from "fs";
import { parseEnvFile } from "./lib/parse-env.mjs";

const envPath = join(process.cwd(), ".env.local");
if (!existsSync(envPath)) {
  console.error("Open dhe.org.in-main/.env.local — root .env.local is NOT used for admin.");
  process.exit(1);
}

const env = parseEnvFile(envPath);

console.log("Admin login file: dhe.org.in-main/.env.local");
console.log("Username (ADMIN_USERNAME):", env.ADMIN_USERNAME ?? "(not set)");
console.log("Password: see ADMIN_PASSWORD in the same file (do not share in chat)");
console.log("Login URL: https://www.dhe.org.in/admin");
