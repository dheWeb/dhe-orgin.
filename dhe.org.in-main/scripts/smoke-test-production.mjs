#!/usr/bin/env node
/**
 * Production smoke test — run after deploy.
 * Usage: node scripts/smoke-test-production.mjs [baseUrl]
 */
const BASE = (process.argv[2] || "https://www.dhe.org.in").replace(/\/$/, "");

const checks = [
  { name: "Homepage", path: "/", expect: 200 },
  { name: "Health API", path: "/api/health", expect: 200 },
  { name: "Trust deed PDF", path: "/documents/trust-deed-vbitr.pdf", expect: 200 },
  { name: "Programs hub", path: "/programs", expect: 200 },
  { name: "Structure", path: "/structure", expect: 200 },
  { name: "Hindi landing", path: "/hi", expect: 200 },
  { name: "Transparency", path: "/transparency", expect: 200 },
];

let failed = 0;

for (const { name, path, expect } of checks) {
  const url = `${BASE}${path}`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    const ok = res.status === expect;
    console.log(`${ok ? "✓" : "✗"} ${name} — ${res.status} ${url}`);
    if (!ok) failed++;
    if (path === "/api/health" && ok) {
      const body = await res.json().catch(() => null);
      if (body?.status !== "ok" && body?.ok !== true) {
        console.log("  ⚠ health body unexpected:", JSON.stringify(body));
      }
    }
  } catch (err) {
    console.log(`✗ ${name} — ${err.message}`);
    failed++;
  }
}

console.log(failed ? `\n${failed} check(s) failed` : "\nAll smoke checks passed");
process.exit(failed ? 1 : 0);
