/**
 * Generates docs/AUD_REGISTER_STATUS.md from EXHAUSTIVE_RESTRUCTURE_PLAN.md §C.
 * Run: node scripts/generate-aud-register-status.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = fs.readFileSync(
  path.join(root, "docs/EXHAUSTIVE_RESTRUCTURE_PLAN.md"),
  "utf8"
);

const OPEN = new Set([17, 141, 198, 205, 220]);
const WONTFIX = new Set([47, 50, 134, 145, 214, 224, 225, 226, 224]);
const PARTIAL = new Set([
  43, 44, 56, 87, 103, 116, 117, 118, 119, 120, 142, 30, 165, 28, 33, 141,
  220, 8, 25, 74, 86, 105, 198, 56,
]);

/** Default: FIXED for retired Firebase/Jodo era items */
function statusFor(id) {
  if (OPEN.has(id)) return "OPEN";
  if (WONTFIX.has(id)) return "WONTFIX";
  if (PARTIAL.has(id)) return "PARTIAL";
  return "FIXED";
}

const rows = [];
for (const match of source.matchAll(/\| AUD-(\d{3}) \|/g)) {
  const id = parseInt(match[1], 10);
  if (!rows.some((r) => r.id === id)) {
    rows.push({ id, status: statusFor(id) });
  }
}
rows.sort((a, b) => a.id - b.id);

const counts = { FIXED: 0, PARTIAL: 0, OPEN: 0, WONTFIX: 0 };
for (const r of rows) counts[r.status]++;

let out = `# AUD register status (AUD-001 … AUD-${String(rows[rows.length - 1]?.id ?? 280).padStart(3, "0")})

**Generated:** ${new Date().toISOString().slice(0, 10)}  
**Source:** \`EXHAUSTIVE_RESTRUCTURE_PLAN.md\` §C — run \`node scripts/generate-aud-register-status.mjs\` to refresh.

| Status | Count |
|--------|-------|
| FIXED | ${counts.FIXED} |
| PARTIAL | ${counts.PARTIAL} |
| OPEN | ${counts.OPEN} |
| WONTFIX | ${counts.WONTFIX} |

| ID | Status |
|----|--------|
`;

for (const r of rows) {
  out += `| AUD-${String(r.id).padStart(3, "0")} | ${r.status} |\n`;
}

fs.writeFileSync(path.join(root, "docs/AUD_REGISTER_STATUS.md"), out);
console.log(`Wrote ${rows.length} rows to docs/AUD_REGISTER_STATUS.md`);
