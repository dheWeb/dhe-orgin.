/**
 * Seed public notices from home slide metadata (bootstrap when Firestore export unavailable).
 * Usage: node scripts/seed-notices.mjs
 */
import { readFileSync, existsSync } from "fs";
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

const notices = [
  { title: "Shiksha Mahakumbh National Educational Movement", image: "/2024K/k6.webp", date: "2024-06-01" },
  { title: "Educational Leadership & National Collaboration", image: "/2024K/up_cm.webp", date: "2024-05-15" },
  { title: "DHE signed MoU with INST Mohali", image: "/R1.webp", date: "2024-04-20" },
  { title: "Holistic Educational Transformation", image: "/2024K/k1.webp", date: "2024-03-10" },
  { title: "National Educational Dialogue", image: "/2024K/k4.webp", date: "2024-02-28" },
  { title: "Leadership & Innovation Program", image: "/k3.webp", date: "2024-01-15" },
  { title: "Empowering Future Bharat", image: "/sm1.webp", date: "2023-12-20" },
  { title: "Building Viksit Bharat", image: "/sm2.webp", date: "2023-11-05" },
];

const projectId = process.env.SUPABASE_PROJECT_ID ?? "qrzjnfdapwneieafykoz";
const password = process.env.SUPABASE_DB_PASSWORD;
if (!password) {
  console.error("SUPABASE_DB_PASSWORD required");
  process.exit(1);
}

const connectionString = `postgresql://postgres:${encodeURIComponent(password)}@db.${projectId}.supabase.co:5432/postgres`;

async function main() {
  const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const { rows } = await client.query("select count(*)::int as c from public.notices");
  if (rows[0].c > 0) {
    console.log(`Notices table already has ${rows[0].c} rows — skipping seed.`);
    await client.end();
    return;
  }

  for (const n of notices) {
    await client.query(
      `insert into public.notices (title, image_path, published_at, status, is_pinned)
       values ($1, $2, $3::timestamptz, 'published', false)`,
      [n.title, n.image, n.date]
    );
  }

  await client.end();
  console.log(`Seeded ${notices.length} notices.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
