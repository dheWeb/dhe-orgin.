/**
 * Bootstrap Supabase with starter content (replaces lost Firestore data).
 * Idempotent — only inserts when tables are empty / keys missing.
 *
 * Usage: node scripts/seed-supabase-bootstrap.mjs
 */
import { join } from "path";
import { parseEnvFile } from "./lib/parse-env.mjs";

const env = parseEnvFile(join(process.cwd(), ".env.local")) ?? {};

const supabaseUrl = (
  env.NEXT_PUBLIC_SUPABASE_URL ?? env.SUPABASE_URL ?? ""
).trim().replace(/\/$/, "");
const serviceKey = (env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();

if (!supabaseUrl || !serviceKey) {
  console.error(
    "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required in dhe.org.in-main/.env.local"
  );
  process.exit(1);
}

const headers = {
  apikey: serviceKey,
  Authorization: `Bearer ${serviceKey}`,
  "Content-Type": "application/json",
};

async function rest(path, init = {}) {
  const res = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: { ...headers, ...init.headers },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${path} ${res.status}: ${body.slice(0, 200)}`);
  }
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

const STARTER_NOTICES = [
  {
    title: "Shiksha Mahakumbh 6.0 — NIT Hamirpur, 9–11 Oct 2026",
    image_path: "/2024K/k6.webp",
    published_at: "2026-01-15T00:00:00Z",
    is_pinned: true,
    status: "published",
  },
  {
    title: "Shiksha Mahakumbh National Educational Movement",
    image_path: "/2024K/k6.webp",
    published_at: "2024-06-01T00:00:00Z",
    status: "published",
  },
  {
    title: "Educational Leadership & National Collaboration",
    image_path: "/2024K/up_cm.webp",
    published_at: "2024-05-15T00:00:00Z",
    status: "published",
  },
  {
    title: "DHE signed MoU with INST Mohali",
    image_path: "/R1.webp",
    published_at: "2024-04-20T00:00:00Z",
    status: "published",
  },
  {
    title: "Holistic Educational Transformation",
    image_path: "/2024K/k1.webp",
    published_at: "2024-03-10T00:00:00Z",
    status: "published",
  },
  {
    title: "National Educational Dialogue",
    image_path: "/2024K/k4.webp",
    published_at: "2024-02-28T00:00:00Z",
    status: "published",
  },
  {
    title: "Leadership & Innovation Program",
    image_path: "/k3.webp",
    published_at: "2024-01-15T00:00:00Z",
    status: "published",
  },
  {
    title: "Empowering Future Bharat",
    image_path: "/sm1.webp",
    published_at: "2023-12-20T00:00:00Z",
    status: "published",
  },
  {
    title: "Building Viksit Bharat",
    image_path: "/sm2.webp",
    published_at: "2023-11-05T00:00:00Z",
    status: "published",
  },
];

const CMS_DEFAULTS = [
  {
    key: "home_tagline",
    label: "Home page tagline",
    value: { text: "Empowering holistic education for Viksit Bharat" },
  },
  {
    key: "site_contact",
    label: "Site contact",
    value: { phone: "7903431900", email: "director@dhe.org.in" },
  },
  {
    key: "director_message",
    label: "Director message excerpt",
    value: {
      excerpt:
        "Holistic education integrates mind, body, and spirit for nation-building.",
    },
  },
];

async function seedNotices() {
  const existing = await rest("notices?select=id&limit=1");
  if (existing?.length) {
    console.log("Notices: rows exist — skip seed");
    return;
  }

  await rest("notices", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(STARTER_NOTICES),
  });
  console.log(`Notices: seeded ${STARTER_NOTICES.length} starter items`);
}

async function seedCms() {
  const existing = await rest("site_content?select=key");
  const have = new Set((existing ?? []).map((r) => r.key));
  const missing = CMS_DEFAULTS.filter((row) => !have.has(row.key));

  if (!missing.length) {
    console.log("CMS: all default keys present");
    return;
  }

  await rest("site_content", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(missing),
  });
  console.log(`CMS: inserted ${missing.length} keys`);
}

async function main() {
  await seedNotices();
  await seedCms();
  console.log("Supabase bootstrap complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
