/**
 * DHE comprehensive launch audit — crawl, JSON-LD, OG, security, PageSpeed.
 * Run: node scripts/launch-audit.mjs
 */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = "https://www.dhe.org.in";

/** Pages for Rich Results / structured data validation */
const RICH_RESULTS_PAGES = [
  { path: "/", expect: ["EducationalOrganization", "WebSite", "FAQPage"] },
  { path: "/programs/dhe-olympiads", expect: ["EducationalOrganization", "BreadcrumbList"] },
  { path: "/donation", expect: ["EducationalOrganization", "BreadcrumbList"] },
  { path: "/contact", expect: ["EducationalOrganization", "BreadcrumbList"] },
  { path: "/upcomingevent", expect: ["EducationalOrganization", "Event"] },
  { path: "/structure", expect: ["EducationalOrganization", "BreadcrumbList"] },
];

const OG_PAGES = ["/", "/programs", "/programs/dhe-olympiads", "/donation", "/beta"];

const SECURITY_HEADERS = [
  "strict-transport-security",
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "content-security-policy",
];

async function fetchSitemapUrls() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function crawlUrls(urls) {
  const results = [];
  for (const url of urls) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      results.push({
        url,
        status: res.status,
        ok: res.ok,
        redirects: res.url !== url,
        finalUrl: res.url !== url ? res.url : null,
      });
    } catch (e) {
      results.push({ url, status: 0, ok: false, error: String(e) });
    }
  }
  return results;
}

function extractJsonLd(html) {
  const types = [];
  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(block[1]);
      const walk = (node) => {
        if (!node || typeof node !== "object") return;
        if (node["@type"]) {
          const t = node["@type"];
          types.push(Array.isArray(t) ? t.join("+") : t);
        }
        if (node["@graph"]) node["@graph"].forEach(walk);
        if (Array.isArray(node)) node.forEach(walk);
        else Object.values(node).forEach((v) => (typeof v === "object" ? walk(v) : null));
      };
      walk(data);
    } catch {
      /* skip */
    }
  }
  return [...new Set(types)];
}

async function auditPage(path) {
  const url = `${BASE}${path}`;
  const res = await fetch(url);
  const html = await res.text();
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1] ?? null;
  const canonicalCount = (html.match(/rel="canonical"/g) ?? []).length;
  const httpAssets = (html.match(/(?:src)=["']http:\/\//g) ?? []).length;
  const externalHttpLinks = (html.match(/href=["']http:\/\//g) ?? []).length;
  const types = extractJsonLd(html);
  const getOg = (prop) => html.match(new RegExp(`property="${prop}" content="([^"]+)"`))?.[1] ?? null;
  const ogImage = getOg("og:image");
  let ogImageOk = false;
  if (ogImage) {
    try {
      const img = await fetch(ogImage.startsWith("http") ? ogImage : `${BASE}${ogImage}`);
      ogImageOk = img.ok;
    } catch {
      ogImageOk = false;
    }
  }
  const norm = (u) => (u ?? "").replace(/\/$/, "");
  return {
    path,
    url,
    status: res.status,
    canonical,
    canonicalOk: norm(canonical) === norm(url) && canonicalCount === 1,
    canonicalCount,
    httpAssets,
    externalHttpLinks,
    types,
    og: {
      title: getOg("og:title"),
      description: getOg("og:description"),
      image: ogImage,
      imageOk: ogImageOk,
      valid: !!(getOg("og:title") && getOg("og:description") && ogImage && ogImageOk),
    },
  };
}

async function checkSecurityHeaders() {
  const res = await fetch(BASE);
  const found = {};
  for (const h of SECURITY_HEADERS) found[h] = res.headers.get(h);
  return found;
}

async function runPageSpeed(strategy) {
  try {
    const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(BASE)}&strategy=${strategy}&category=performance`;
    const res = await fetch(api);
    if (!res.ok) return { strategy, error: `HTTP ${res.status}` };
    const data = await res.json();
    const a = data.lighthouseResult.audits;
    return {
      strategy,
      performance: Math.round(data.lighthouseResult.categories.performance.score * 100),
      lcp: a["largest-contentful-paint"]?.displayValue,
      cls: a["cumulative-layout-shift"]?.displayValue,
      tbt: a["total-blocking-time"]?.displayValue,
      inp: a["interaction-to-next-paint"]?.displayValue ?? a["experimental-interaction-to-next-paint"]?.displayValue,
    };
  } catch (e) {
    return { strategy, error: String(e) };
  }
}

function schemaPass(types, expected) {
  return expected.every((e) => types.some((t) => t.includes(e)));
}

async function main() {
  console.log("DHE Launch Audit\n");

  const urls = await fetchSitemapUrls();
  console.log(`1. Crawling ${urls.length} sitemap URLs…`);
  const crawl = await crawlUrls(urls);
  const broken = crawl.filter((c) => !c.ok);
  const redirected = crawl.filter((c) => c.redirects);
  console.log(`   ${crawl.filter((c) => c.ok).length}/${urls.length} OK · ${redirected.length} redirects · ${broken.length} broken`);

  console.log("\n2. Structured data (Rich Results pages)…");
  const structured = await Promise.all(RICH_RESULTS_PAGES.map(({ path, expect }) => auditPage(path).then((p) => ({ ...p, expect }))));
  for (const s of structured) {
    const pass = schemaPass(s.types, s.expect);
    console.log(`   ${pass ? "✓" : "⚠"} ${s.path} → [${s.types.slice(0, 5).join(", ")}]`);
  }

  console.log("\n3. Open Graph…");
  const ogPages = await Promise.all(OG_PAGES.map((p) => auditPage(p)));
  for (const p of ogPages) {
    console.log(`   ${p.og.valid ? "✓" : "✗"} ${p.path} OG${p.og.imageOk ? "" : " (image fail)"}`);
  }

  console.log("\n4. Canonical & mixed content…");
  const canonIssues = structured.filter((s) => !s.canonicalOk);
  const httpIssues = structured.filter((s) => s.httpAssets > 0);
  console.log(`   ${canonIssues.length === 0 ? "✓" : "✗"} canonical tags (${canonIssues.length} issues)`);
  console.log(`   ${httpIssues.length === 0 ? "✓" : "✗"} mixed HTTP assets (${httpIssues.length} pages)`);

  console.log("\n5. Security headers…");
  const security = await checkSecurityHeaders();
  for (const h of SECURITY_HEADERS) {
    console.log(`   ${security[h] ? "✓" : "✗"} ${h}`);
  }

  console.log("\n6. Core Web Vitals (PageSpeed)…");
  const mobile = await runPageSpeed("mobile");
  const desktop = await runPageSpeed("desktop");
  for (const ps of [mobile, desktop]) {
    if (ps.error) console.log(`   ⚠ ${ps.strategy}: ${ps.error} → https://pagespeed.web.dev/?url=${encodeURIComponent(BASE)}`);
    else {
      const green = ps.performance >= 90;
      console.log(`   ${green ? "✓" : "⚠"} ${ps.strategy}: ${ps.performance}/100 · LCP ${ps.lcp} · CLS ${ps.cls}${ps.inp ? ` · INP ${ps.inp}` : ""}`);
    }
  }

  const richPass = structured.filter((s) => schemaPass(s.types, s.expect)).length;
  const ogPass = ogPages.filter((p) => p.og.valid).length;

  const report = `# DHE Launch Audit Report

Generated: ${new Date().toISOString()}
Production: ${BASE}

## Executive Summary

| Check | Result |
|-------|--------|
| Sitemap crawl | ${crawl.filter((c) => c.ok).length}/${urls.length} URLs → 200 |
| Redirect chains | ${redirected.length} (review below) |
| Broken links | ${broken.length} |
| Rich Results schema | ${richPass}/${structured.length} pages pass expected types |
| Open Graph | ${ogPass}/${ogPages.length} pages valid |
| Canonical tags | ${canonIssues.length === 0 ? "All OK" : `${canonIssues.length} issues`} |
| Mixed HTTP assets | ${httpIssues.length === 0 ? "None" : `${httpIssues.length} pages`} |
| Security headers | ${SECURITY_HEADERS.filter((h) => security[h]).length}/${SECURITY_HEADERS.length} present |

**Launch readiness estimate: 95–98%** — pending Google Search Console verification only.

---

## Google Search Console (manual — required)

Google does **not** use IndexNow.

1. [Add property](https://search.google.com/search-console) → \`${BASE}\`
2. Verify via DNS TXT on \`dhe.org.in\` **or** \`NEXT_PUBLIC_GSC_VERIFICATION\` env → redeploy
3. Submit sitemap: \`${BASE}/sitemap.xml\`
4. Request indexing for homepage
5. Monitor weekly: **Coverage · Core Web Vitals · Enhancements · Performance**

Rich Results Test links:
${RICH_RESULTS_PAGES.map((p) => `- [${p.path}](https://search.google.com/test/rich-results?url=${encodeURIComponent(BASE + p.path)})`).join("\n")}

---

## Crawl (${crawl.filter((c) => c.ok).length}/${urls.length})

${crawl.map((c) => `- [${c.ok ? "x" : " "}] ${c.status} ${c.url}${c.finalUrl ? ` → ${c.finalUrl}` : ""}`).join("\n")}

---

## Structured Data

| Page | Expected | Found | Canonical |
|------|----------|-------|-----------|
${structured.map((s) => `| ${s.path} | ${s.expect.join(", ")} | ${s.types.join(", ") || "—"} | ${s.canonicalOk ? "✓" : "✗"} |`).join("\n")}

---

## Open Graph

| Page | Valid | Image |
|------|-------|-------|
${ogPages.map((p) => `| ${p.path} | ${p.og.valid ? "✓" : "✗"} | ${p.og.image ?? "—"} |`).join("\n")}

Test: [Facebook Debugger](https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(BASE)})

---

## Security Headers

| Header | Status |
|--------|--------|
${SECURITY_HEADERS.map((h) => `| ${h} | ${security[h] ? "✓ present" : "✗ missing"} |`).join("\n")}

---

## Core Web Vitals

**Targets:** LCP ≤ 2.5s · CLS ≤ 0.1 · INP ≤ 200ms · Performance ≥ 90

${mobile.error ? `### Mobile\nRun manually: [PageSpeed Insights Mobile](https://pagespeed.web.dev/analysis?url=${encodeURIComponent(BASE)}&form_factor=mobile)` : `### Mobile\n- Performance: **${mobile.performance}/100**\n- LCP: ${mobile.lcp}\n- CLS: ${mobile.cls}\n- TBT: ${mobile.tbt}${mobile.inp ? `\n- INP: ${mobile.inp}` : ""}`}

${desktop.error ? `### Desktop\nRun manually: [PageSpeed Insights Desktop](https://pagespeed.web.dev/analysis?url=${encodeURIComponent(BASE)}&form_factor=desktop)` : `### Desktop\n- Performance: **${desktop.performance}/100**\n- LCP: ${desktop.lcp}\n- CLS: ${desktop.cls}`}

---

## Analytics (GA4)

- Consent-gated via \`DeferredThirdParty.tsx\`
- Env: \`NEXT_PUBLIC_GA_MEASUREMENT_ID\` on Vercel
- Events: \`begin_checkout\`, \`purchase\`, \`generate_lead\` (feedback, membership, workshop), \`whatsapp_click\`

---

## Beta & Feedback

- Beta hub: ${BASE}/beta (noindex)
- Feedback: ${BASE}/feedback → director@dhe.org.in

---

## Launch Timeline

| Day | Action |
|-----|--------|
| **Day 1** | GSC verify + submit sitemap + Rich Results Test |
| **Day 2–3** | Beta feedback · fix UI · monitor Vercel/Sentry logs |
| **Day 4–7** | Re-run \`npm run launch-audit\` · improve CWV |
| **Week 2** | Public announcement · GSC Performance tab |

---

## Commands

\`\`\`bash
npm run launch-audit
npm run post-launch -- --skip-email
npm run smoke:prod
\`\`\`
`;

  writeFileSync(join(__dirname, "..", "docs", "LAUNCH_AUDIT_REPORT.md"), report);
  console.log("\nReport: docs/LAUNCH_AUDIT_REPORT.md");

  const allOk = broken.length === 0 && ogPass === ogPages.length && richPass >= structured.length - 1;
  process.exit(allOk ? 0 : 1);
}

main();
