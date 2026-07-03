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
  "/accounts/12a-vbitr-trust.pdf",
  "/accounts/80g-vbitr-trust.pdf",
  "/accounts/sm.pdf",
  "/accounts/sm.png",
  "/Proceeding.pdf",
  "/book.png",
  "/residentialcamps/second.webp",
  "/sm1.webp",
  "/sm2.webp",
  "/k1.webp",
  "/R1.webp",
];

/** Production path → local ASCII path (when filenames were normalized in code). */
const ASSET_ALIASES = [
  {
    urlPath: "/residentialcamps/DHE_प्रथम _आवासीय_आवास_वर्ग.pdf",
    destPath: "/residentialcamps/dhe-first-residential-camp.pdf",
  },
];

async function downloadToDest(urlPath, destPath) {
  const dest = join(process.cwd(), "public", destPath.replace(/^\//, ""));
  if (existsSync(dest) && statSync(dest).size > 0) {
    console.log("skip (exists):", destPath);
    return;
  }

  const url = `${BASE}${encodeURI(urlPath)}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn("missing on production:", urlPath, res.status);
    return;
  }

  const buf = Buffer.from(await res.arrayBuffer());
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, buf);
  console.log("saved:", destPath, `(${buf.length} bytes)`);
}

async function download(path) {
  await downloadToDest(path, path);
}

async function main() {
  console.log("Syncing assets from", BASE);
  for (const path of ASSET_PATHS) {
    await download(path);
  }
  for (const alias of ASSET_ALIASES) {
    await downloadToDest(alias.urlPath, alias.destPath);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
