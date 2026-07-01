/**
 * Resend receipt for latest donation via production admin API.
 */
import { join } from "path";
import { parseEnvFile } from "./lib/parse-env.mjs";

const env = parseEnvFile(join(process.cwd(), ".env.local")) ?? {};
const user = env.ADMIN_USERNAME?.trim();
const pass = env.ADMIN_PASSWORD?.trim();
if (!user || !pass) {
  console.error("ADMIN_USERNAME / ADMIN_PASSWORD required in .env.local");
  process.exit(1);
}

const base = process.argv[2] ?? "https://www.dhe.org.in";
const auth = Buffer.from(`${user}:${pass}`).toString("base64");
const headers = { Authorization: `Basic ${auth}` };

const listRes = await fetch(`${base}/api/admin/donations`, { headers });
if (!listRes.ok) {
  console.error("List donations failed:", listRes.status, await listRes.text());
  process.exit(1);
}

const donations = await listRes.json();
const row = Array.isArray(donations) ? donations[0] : donations?.donations?.[0];
if (!row?.id) {
  console.log("No donations to test receipt resend.");
  process.exit(0);
}

console.log("Resending receipt for", row.id, row.donor_email ?? row.donorEmail);
const res = await fetch(`${base}/api/admin/donations/${row.id}/receipt`, {
  method: "POST",
  headers,
});

const body = await res.text();
console.log("Status:", res.status);
console.log(body.slice(0, 300));
