/**
 * Test admin Basic auth against production using .env.local credentials.
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const envPath = join(process.cwd(), ".env.local");
if (!existsSync(envPath)) {
  console.error("Missing dhe.org.in-main/.env.local");
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

const user = env.ADMIN_USERNAME?.trim();
const pass = env.ADMIN_PASSWORD?.trim();
if (!user || !pass) {
  console.error("ADMIN_USERNAME or ADMIN_PASSWORD missing in .env.local");
  process.exit(1);
}

const base = process.argv[2] ?? "https://www.dhe.org.in";
const auth = Buffer.from(`${user}:${pass}`).toString("base64");

for (const path of ["/admin", "/api/admin/donations"]) {
  const res = await fetch(`${base}${path}`, {
    headers: { Authorization: `Basic ${auth}` },
    redirect: "manual",
  });
  console.log(path, res.status, res.status === 200 || res.status === 307 ? "OK" : "FAIL");
}
