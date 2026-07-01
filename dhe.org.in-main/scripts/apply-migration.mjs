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
  console.error("SUPABASE_DB_PASSWORD is required");
  process.exit(1);
}

const connectionString = `postgresql://postgres:${encodeURIComponent(password)}@db.${projectId}.supabase.co:5432/postgres`;
const sqlDir = join(process.cwd(), "supabase", "migrations");
const argFile = process.argv[2];

async function main() {
  const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();

  const files = argFile
    ? [argFile]
    : readdirSync(sqlDir)
        .filter((f) => f.endsWith(".sql"))
        .sort();

  for (const file of files) {
    const sqlPath = join(sqlDir, file);
    const sql = readFileSync(sqlPath, "utf8");
    await client.query(sql);
    console.log("Migration applied:", sqlPath);
  }

  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
