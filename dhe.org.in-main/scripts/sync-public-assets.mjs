/**
 * Download public assets from production www.dhe.org.in into local public/.
 * Skips files that already exist. Run: npm run sync:assets
 */
import { mkdirSync, writeFileSync, existsSync, statSync } from "fs";
import { dirname, join } from "path";

const BASE = "https://www.dhe.org.in";

const ASSET_PATHS = [
  "/logo.webp",
  "/dhe.webp",
  "/logo.png",
  "/logos/dhe.webp",
  "/2024K/k1.webp",
  "/2024K/k4.webp",
  "/2024K/k6.webp",
  "/2024K/up_cm.webp",
  "/Recruitment-Policy.pdf",
  "/lmc/letter-12-lmc-update-2.pdf",
  "/lmc/letter-01-dhe-sonu-sharma-coordinator.pdf",
  "/14.webp",
  "/15.webp",
  "/16.webp",
  "/accounts/dhe.pdf",
  "/accounts/sm.pdf",
  "/accounts/sm.png",
  "/Proceeding.pdf",
  "/sm1.webp",
  "/sm2.webp",
  "/k1.webp",
  "/R1.webp",
];

async function download(path) {
  const dest = join(process.cwd(), "public", path.replace(/^\//, ""));
  if (existsSync(dest) && statSync(dest).size > 0) {
    console.log("skip (exists):", path);
    return;
  }

  const url = `${BASE}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn("missing on production:", path, res.status);
    return;
  }

  const buf = Buffer.from(await res.arrayBuffer());
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, buf);
  console.log("saved:", path, `(${buf.length} bytes)`);
}

async function main() {
  console.log("Syncing assets from", BASE);
  for (const path of ASSET_PATHS) {
    await download(path);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
