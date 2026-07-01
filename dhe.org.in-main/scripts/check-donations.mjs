/**
 * List recent donations from Supabase (service role).
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import pg from "pg";

const envPath = join(process.cwd(), ".env.local");
const env = {};
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  env[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
}

const projectId = env.SUPABASE_PROJECT_ID ?? "qrzjnfdapwneieafykoz";
const client = new pg.Client({
  connectionString: `postgresql://postgres:${encodeURIComponent(env.SUPABASE_DB_PASSWORD)}@db.${projectId}.supabase.co:5432/postgres`,
  ssl: { rejectUnauthorized: false },
});
await client.connect();

const donations = await client.query(
  `select id, donor_email, receipt_number, amount_paise, created_at, status
   from donations order by created_at desc limit 5`
);

console.log("Recent donations:", donations.rows.length);
for (const row of donations.rows) {
  console.log(
    `- ${row.created_at} | ${row.receipt_number ?? "no receipt"} | ₹${row.amount_paise / 100} | ${row.donor_email ?? "no email"} | ${row.status}`
  );
}

const webhooks = await client.query(
  `select event_type, processing_error, created_at
   from payment_webhook_events order by created_at desc limit 5`
);

console.log("\nRecent webhooks:");
for (const e of webhooks.rows) {
  console.log(`- ${e.created_at} | ${e.event_type} | err=${e.processing_error ?? "none"}`);
}

await client.end();
