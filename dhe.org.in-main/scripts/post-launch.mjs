/**
 * DHE post-launch automation — health, OG, IndexNow, beta invite.
 * Run: node scripts/post-launch.mjs [--skip-email]
 */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = "https://www.dhe.org.in";
const INDEXNOW_KEY = "dhe735cd8a735cd8a735cd8a735cd8a";
const skipEmail = process.argv.includes("--skip-email");

const KEY_PAGES = [
  "/",
  "/programs",
  "/structure",
  "/leadership",
  "/contact",
  "/donation",
  "/feedback",
  "/beta",
  "/hi",
  "/transparency",
  "/cells/rd",
  "/programs/dhe-olympiads",
];

async function fetchSitemapUrls() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function healthCheck(urls) {
  const sample = [...new Set([...KEY_PAGES.map((p) => `${BASE}${p}`), ...urls.slice(0, 5)])];
  const results = [];
  for (const url of sample) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      results.push({ url, status: res.status, ok: res.ok });
    } catch (e) {
      results.push({ url, status: 0, ok: false, error: String(e) });
    }
  }
  return results;
}

async function verifyOg(path) {
  const url = `${BASE}${path}`;
  const res = await fetch(url);
  const html = await res.text();
  const get = (prop) => html.match(new RegExp(`property="${prop}" content="([^"]+)"`))?.[1] ?? null;
  const image = get("og:image");
  let imageOk = false;
  if (image) {
    try {
      const img = await fetch(image.startsWith("http") ? image : `${BASE}${image}`);
      imageOk = img.ok;
    } catch {
      imageOk = false;
    }
  }
  return { url, valid: !!(get("og:title") && get("og:description") && image && imageOk), imageOk };
}

async function submitIndexNow(urls) {
  const body = {
    host: "www.dhe.org.in",
    key: INDEXNOW_KEY,
    keyLocation: `${BASE}/${INDEXNOW_KEY}.txt`,
    urlList: urls.slice(0, 100),
  };
  const endpoints = ["https://api.indexnow.org/indexnow", "https://www.bing.com/indexnow"];
  const results = [];
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
      });
      results.push({ endpoint, status: res.status, ok: res.ok || res.status === 202 });
    } catch (e) {
      results.push({ endpoint, status: 0, ok: false, error: String(e) });
    }
  }
  return results;
}

async function sendBetaInviteEmail() {
  const body = `Dear DHE Team,

The Department of Holistic Education website (https://www.dhe.org.in) is ready for closed beta testing before public announcement.

Please share https://www.dhe.org.in/beta with internal reviewers, partner schools, and cell coordinators.

Key areas to test:
• Homepage, structure, and 25 cells
• Programs hub and TEJAS link (https://tejas.dhe.org.in)
• Donation flow, contact, transparency
• Hindi landing (/hi) and mobile navigation
• Feedback form at /feedback

Feedback questions:
1. Is the site clear as DHE's national platform?
2. Can users find cells, programs, and donation paths quickly?
3. Any broken links or mobile issues?
4. Would you recommend to partner institutions?

Department of Holistic Education — Website Launch Automation`;

  try {
    const res = await fetch("https://formsubmit.co/ajax/director@dhe.org.in", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: "DHE Post-Launch Automation",
        email: "noreply@dhe.org.in",
        _subject: "DHE Website Beta Testing — Internal Review Request",
        _template: "table",
        message: body,
      }),
    });
    return { ok: res.ok, status: res.status };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

async function main() {
  console.log("DHE Post-Launch Automation\n");

  console.log("1. Fetching sitemap…");
  const sitemapUrls = await fetchSitemapUrls();
  console.log(`   ${sitemapUrls.length} URLs in sitemap`);

  console.log("\n2. Health checks…");
  const health = await healthCheck(sitemapUrls);
  health.forEach((h) => console.log(`   ${h.ok ? "✓" : "✗"} ${h.status} ${h.url}`));

  console.log("\n3. Open Graph…");
  const og = await Promise.all(["/", "/programs", "/donation"].map(verifyOg));
  og.forEach((o) => console.log(`   ${o.valid ? "✓" : "✗"} ${o.url}`));

  console.log("\n4. IndexNow…");
  const indexNow = await submitIndexNow(sitemapUrls);
  indexNow.forEach((r) => console.log(`   ${r.ok ? "✓" : "✗"} ${r.endpoint} → ${r.status}`));

  let invite = { ok: false, skipped: true };
  if (!skipEmail) {
    console.log("\n5. Beta invite → director@dhe.org.in…");
    invite = await sendBetaInviteEmail();
    console.log(`   ${invite.ok ? "✓" : "✗"} (${invite.status ?? invite.error})`);
  }

  const reportPath = join(__dirname, "..", "docs", "POST_LAUNCH_REPORT.md");
  writeFileSync(
    reportPath,
    `# DHE Post-Launch Report

Generated: ${new Date().toISOString()}

## Sitemap
- ${sitemapUrls.length} URLs

## Health (${health.filter((h) => h.ok).length}/${health.length} OK)
${health.map((h) => `- [${h.ok ? "x" : " "}] ${h.status} ${h.url}`).join("\n")}

## Open Graph
${og.map((o) => `- [${o.valid ? "x" : " "}] ${o.url}`).join("\n")}

## IndexNow
${indexNow.map((r) => `- [${r.ok ? "x" : " "}] ${r.endpoint} (${r.status})`).join("\n")}

## Beta Invite
${invite.skipped ? "- Skipped (--skip-email)" : `- ${invite.ok ? "Sent" : "Failed"} to director@dhe.org.in`}

## Google Search Console (manual)
https://search.google.com/search-console → add \`${BASE}\` → submit \`${BASE}/sitemap.xml\`
`
  );
  console.log(`\nReport: docs/POST_LAUNCH_REPORT.md`);
  process.exit(health.every((h) => h.ok) ? 0 : 1);
}

main();
