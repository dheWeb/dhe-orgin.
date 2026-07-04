/**
 * DHE comprehensive launch audit — crawl, JSON-LD, security, PageSpeed.
 * Run: node scripts/launch-audit.mjs
 */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = "https://www.dhe.org.in";

const RICH_RESULTS_PAGES = ["/", "/programs", "/donation", "/contact", "/cells/rd"];

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

async function auditStructuredData(path) {
  const url = `${BASE}${path}`;
  const res = await fetch(url);
  const html = await res.text();
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1] ?? null;
  const httpAssets = (html.match(/(?:src|href)="http:\/\//g) ?? []).length;
  return { path, url, canonical, types: extractJsonLd(html), httpAssets };
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
    };
  } catch (e) {
    return { strategy, error: String(e) };
  }
}

async function main() {
  console.log("DHE Launch Audit\n");

  const urls = await fetchSitemapUrls();
  console.log(`1. Crawling ${urls.length} sitemap URLs…`);
  const crawl = await crawlUrls(urls);
  const broken = crawl.filter((c) => !c.ok);
  console.log(`   ${crawl.filter((c) => c.ok).length}/${urls.length} OK`);
  if (broken.length) broken.forEach((b) => console.log(`   ✗ ${b.url}`));

  console.log("\n2. Structured data…");
  const structured = await Promise.all(RICH_RESULTS_PAGES.map(auditStructuredData));
  structured.forEach((s) =>
    console.log(`   ${s.types.length ? "✓" : "✗"} ${s.path} → [${s.types.slice(0, 4).join(", ")}${s.types.length > 4 ? "…" : ""}]`)
  );

  console.log("\n3. Security headers…");
  const security = await checkSecurityHeaders();
  for (const h of SECURITY_HEADERS) {
    console.log(`   ${security[h] ? "✓" : "✗"} ${h}`);
  }

  console.log("\n4. PageSpeed…");
  const mobile = await runPageSpeed("mobile");
  const desktop = await runPageSpeed("desktop");
  for (const ps of [mobile, desktop]) {
    if (ps.error) console.log(`   ⚠ ${ps.strategy}: ${ps.error}`);
    else console.log(`   ${ps.performance >= 90 ? "✓" : "⚠"} ${ps.strategy}: ${ps.performance}/100 LCP ${ps.lcp}`);
  }

  const report = `# DHE Launch Audit Report

Generated: ${new Date().toISOString()}

## Summary
| Check | Result |
|-------|--------|
| Sitemap crawl | ${crawl.filter((c) => c.ok).length}/${urls.length} URLs → 200 |
| Broken | ${broken.length} |
| Mixed HTTP assets | ${structured.some((s) => s.httpAssets > 0) ? "Found" : "None"} |
| JSON-LD pages | ${structured.filter((s) => s.types.length).length}/${structured.length} |

## Crawl
${crawl.map((c) => `- [${c.ok ? "x" : " "}] ${c.status} ${c.url}`).join("\n")}

## Structured Data
${structured.map((s) => `- **${s.path}**: ${s.types.join(", ") || "none"}`).join("\n")}

[Rich Results Test](https://search.google.com/test/rich-results?url=${encodeURIComponent(BASE)})

## Security
${SECURITY_HEADERS.map((h) => `- **${h}**: ${security[h] ? "present" : "missing"}`).join("\n")}

## Core Web Vitals
${mobile.error ? `- Mobile: run at https://pagespeed.web.dev/?url=${encodeURIComponent(BASE)}` : `- Mobile: ${mobile.performance}/100 · LCP ${mobile.lcp} · CLS ${mobile.cls}`}
${desktop.error ? `- Desktop: run manually` : `- Desktop: ${desktop.performance}/100 · LCP ${desktop.lcp}`}

## Google Search Console (required — manual)
1. https://search.google.com/search-console
2. Add \`${BASE}\`
3. Verify via DNS or \`NEXT_PUBLIC_GSC_VERIFICATION\` env
4. Submit \`sitemap.xml\`
5. Monitor Coverage, CWV, Enhancements, Performance

## Commands
\`\`\`bash
npm run launch-audit
npm run post-launch -- --skip-email
npm run smoke:prod
\`\`\`
`;

  writeFileSync(join(__dirname, "..", "docs", "LAUNCH_AUDIT_REPORT.md"), report);
  console.log("\nReport: docs/LAUNCH_AUDIT_REPORT.md");
  process.exit(broken.length === 0 ? 0 : 1);
}

main();
