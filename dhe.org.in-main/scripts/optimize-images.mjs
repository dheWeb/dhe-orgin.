/**
 * Compress large images under public/ to WebP.
 * Usage: node scripts/optimize-images.mjs [--all]
 */
import { readFileSync, existsSync, statSync, readdirSync } from "fs";
import { join, parse, relative } from "path";
import sharp from "sharp";

const publicDir = join(process.cwd(), "public");
const MAX_WIDTH = 1200;
const QUALITY = 78;
const MIN_BYTES = 150 * 1024;
const skipDirs = new Set(["node_modules", ".next"]);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (skipDirs.has(entry.name)) continue;
      walk(full, files);
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function optimizeOne(absPath) {
  const before = statSync(absPath).size;
  if (before < MIN_BYTES && !process.argv.includes("--all")) return null;

  const rel = relative(publicDir, absPath).replace(/\\/g, "/");
  const { dir, name } = parse(rel);
  const outRel = join(dir, `${name}.webp`).replace(/\\/g, "/");
  const output = join(publicDir, outRel);

  if (existsSync(output) && statSync(output).mtimeMs >= statSync(absPath).mtimeMs) {
    return null;
  }

  await sharp(absPath)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(output);

  const after = statSync(output).size;
  console.log(
    `${rel} → ${outRel}: ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB`
  );
  return outRel;
}

async function main() {
  const files = walk(publicDir);
  let count = 0;
  for (const file of files) {
    const result = await optimizeOne(file);
    if (result) count += 1;
  }
  console.log(`Done. ${count} images optimized.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
