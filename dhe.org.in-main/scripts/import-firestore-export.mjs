/**
 * Import legacy Firestore JSON exports into Supabase.
 *
 * Place exports in scripts/firestore-export/:
 *   events.json, Donation.json, Workshop.json
 *
 * Each file: array of objects OR { documents: [{ id, fields }] }.
 *
 * Usage: node scripts/import-firestore-export.mjs
 */
import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import pg from "pg";

function loadEnvLocal() {
  const envPath = join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    const value = trimmed.slice(eq + 1);
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const projectId = process.env.SUPABASE_PROJECT_ID ?? "qrzjnfdapwneieafykoz";
const password = process.env.SUPABASE_DB_PASSWORD;
if (!password) {
  console.error("SUPABASE_DB_PASSWORD required");
  process.exit(1);
}

const connectionString = `postgresql://postgres:${encodeURIComponent(password)}@db.${projectId}.supabase.co:5432/postgres`;
const exportDir = join(process.cwd(), "scripts", "firestore-export");

function readJson(name) {
  const path = join(exportDir, name);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8"));
}

function normalizeRows(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.documents)) {
    return data.documents.map((doc) => ({
      id: doc.id || doc.name?.split("/").pop(),
      ...(doc.fields || doc.data || doc),
    }));
  }
  return [];
}

async function importNotices(client) {
  const rows = normalizeRows(readJson("events.json"));
  if (!rows.length) {
    console.log("Skip notices: no events.json");
    return;
  }
  for (const row of rows) {
    await client.query(
      `insert into public.notices (title, image_path, published_at, status)
       values ($1, $2, coalesce($3::timestamptz, now()), 'published')
       on conflict do nothing`,
      [
        row.title ?? "Notice",
        row.imageUrl ?? row.image_path ?? null,
        row.date ? new Date(row.date).toISOString() : null,
      ]
    );
  }
  console.log(`Imported ${rows.length} notices`);
}

async function importDonations(client) {
  const rows = normalizeRows(readJson("Donation.json"));
  if (!rows.length) {
    console.log("Skip donations: no Donation.json");
    return;
  }
  for (const row of rows) {
    const amount = Number(row.Amount ?? row.amount ?? 0);
    await client.query(
      `insert into public.donations (donor_name, donor_email, donor_phone, amount_paise, status, metadata)
       values ($1, $2, $3, $4, 'captured', $5::jsonb)
       on conflict do nothing`,
      [
        row.name ?? row.donor_name ?? "Donor",
        row.email ?? row.donor_email ?? null,
        row.PhoneNumber ?? row.phone ?? null,
        Math.round(amount * 100),
        JSON.stringify({ legacy: true, source: "firestore" }),
      ]
    );
  }
  console.log(`Imported ${rows.length} donations`);
}

async function importWorkshops(client) {
  const rows = normalizeRows(readJson("Workshop.json"));
  if (!rows.length) {
    console.log("Skip workshops: no Workshop.json");
    return;
  }
  for (const row of rows) {
    await client.query(
      `insert into public.workshop_registrations (name, email, phone, address)
       values ($1, $2, $3, $4)`,
      [
        row.name ?? "",
        row.email ?? "",
        row.PhoneNumber ?? row.phone ?? "",
        row.Address ?? row.address ?? "",
      ]
    );
  }
  console.log(`Imported ${rows.length} workshop registrations`);
}

async function main() {
  if (!existsSync(exportDir)) {
    console.log(
      `No ${exportDir} folder. Create it and add events.json, Donation.json, Workshop.json from Firestore export.`
    );
    console.log("Files present:", readdirSync(join(process.cwd(), "scripts")).join(", "));
    process.exit(0);
  }

  const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();
  await importNotices(client);
  await importDonations(client);
  await importWorkshops(client);
  await client.end();
  console.log("Firestore import complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
