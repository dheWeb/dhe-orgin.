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

/** Intentionally deferred — see docs/AUD_TRIAGE.md */
const WONTFIX = new Set([47, 50, 134, 145, 214, 224, 225, 226]);

function statusFor(id) {
  if (WONTFIX.has(id)) return "WONTFIX";
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
console.log(`Wrote ${rows.length} rows to docs/AUD_REGISTER_STATUS.md`, counts);
