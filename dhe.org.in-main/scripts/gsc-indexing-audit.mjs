/**
 * GSC indexing audit — probes URLs that commonly appear in Search Console reports.
 * Run: node scripts/gsc-indexing-audit.mjs
 */
const BASE = "https://www.dhe.org.in";

const PROBES = [
  { path: "/Publication", expect: 308, label: "legacy Publication redirect" },
  { path: "/Publications", expect: 308, label: "legacy Publications redirect" },
  { path: "/publication", expect: 308, label: "legacy publication redirect" },
  { path: "/members", expect: 308, label: "legacy members redirect" },
  { path: "/committee", expect: 308, label: "legacy committee redirect" },
  { path: "/Members", expect: 308, label: "legacy Members redirect" },
  { path: "/donate", expect: 308, label: "legacy donate redirect" },
  { path: "/join", expect: 308, label: "legacy join redirect" },
  { path: "/comingsoon", expect: 308, label: "legacy comingsoon redirect" },
  { path: "/VibhagRoute/test", expect: 308, label: "legacy VibhagRoute redirect" },
  { path: "/cells/nonexistent", expect: 404, label: "invalid cell slug" },
  { path: "/programs/invalid-slug", expect: 404, label: "invalid program slug" },
  { path: "/beta", expect: 200, noindex: true, label: "beta noindex" },
  { path: "/search", expect: 200, noindex: true, label: "search noindex" },
  { path: "/registrationForm", expect: 200, noindex: true, label: "registrationForm noindex" },
  { path: "/admin/login", expect: 200, noindex: true, label: "admin login noindex" },
  { path: "/donation/thank-you", expect: 200, noindex: true, label: "donation thank-you noindex" },
  { path: "/contribute/thank-you", expect: 200, noindex: true, label: "contribute thank-you noindex" },
  { path: "/contact/thank-you", expect: 200, noindex: true, label: "contact thank-you noindex" },
  { path: "/feedback/thank-you", expect: 200, noindex: true, label: "feedback thank-you noindex" },
];

function hasNoindex(html) {
  return /noindex/i.test(html);
}

async function probe({ path, expect, noindex, label }) {
  const url = `${BASE}${path}`;
  try {
    const res = await fetch(url, { redirect: "manual" });
    const html = res.status === 200 ? await res.text() : "";
    const statusOk = res.status === expect;
    const noindexOk = noindex === undefined || hasNoindex(html) === noindex;
    const ok = statusOk && noindexOk;
    const detail =
      noindex !== undefined
        ? `status=${res.status} noindex=${hasNoindex(html)}`
        : `status=${res.status}`;
    return { path, label, ok, detail, location: res.headers.get("location") };
  } catch (e) {
    return { path, label, ok: false, detail: String(e) };
  }
}

async function main() {
  console.log("GSC Indexing Audit\n");
  const results = [];
  for (const item of PROBES) {
    const r = await probe(item);
    results.push(r);
    const icon = r.ok ? "✓" : "✗";
    const loc = r.location ? ` → ${r.location}` : "";
    console.log(`  ${icon} ${r.label}: ${r.detail}${loc}`);
  }
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} passed`);
  if (failed.length) process.exit(1);
}

main();
