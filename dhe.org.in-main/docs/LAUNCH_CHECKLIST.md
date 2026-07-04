# DHE Launch Checklist

Production: [https://www.dhe.org.in](https://www.dhe.org.in)  
TEJAS (linked program): [https://tejas.dhe.org.in](https://tejas.dhe.org.in)

---

## Day 1 — Google Search Console (essential)

Google does **not** use IndexNow. This is the only manual gate for Google indexing.

1. Open [Google Search Console](https://search.google.com/search-console)
2. **Add property** → URL prefix: `https://www.dhe.org.in`
3. **Verify ownership** (choose one):
   - **DNS TXT** on `dhe.org.in` (recommended — covers www + apex)
   - **HTML meta tag**: set `NEXT_PUBLIC_GSC_VERIFICATION` in Vercel → redeploy
   - **HTML file** in `public/`
4. **Sitemaps** → submit: `sitemap.xml`
5. **URL Inspection** → homepage → Request indexing
6. Validate [Rich Results Test](https://search.google.com/test/rich-results?url=https://www.dhe.org.in)

Monitor weekly: **Coverage · Core Web Vitals · Enhancements · Performance**

---

## Day 1 — Analytics

GA4 is consent-gated via `DeferredThirdParty.tsx`.

1. Confirm `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set on Vercel production
2. Accept cookies on site → verify realtime in GA4
3. Set `NEXT_PUBLIC_GSC_VERIFICATION` if using meta-tag GSC verification

Tracked events (existing): donation checkout, feedback `generate_lead`, WhatsApp click

---

## Automated checks

```bash
cd dhe.org.in-main
npm run launch-audit          # Full sitemap crawl + JSON-LD + security + PageSpeed
npm run post-launch           # IndexNow + OG + health + beta invite email
npm run post-launch -- --skip-email   # Re-run without email
npm run smoke:prod            # Quick smoke test
```

Reports: `docs/LAUNCH_AUDIT_REPORT.md`, `docs/POST_LAUNCH_REPORT.md`

---

## IndexNow (automated — Bing/Yandex, not Google)

Key file: `https://www.dhe.org.in/dhe735cd8a735cd8a735cd8a735cd8a.txt`

Run `npm run post-launch` to ping IndexNow with all sitemap URLs.

---

## Open Graph

Dynamic OG image: `/opengraph-image` (1200×630 PNG)

Test sharing:
- [Facebook Debugger](https://developers.facebook.com/tools/debug/?q=https://www.dhe.org.in)
- [LinkedIn Inspector](https://www.linkedin.com/post-inspector/)
- Homepage, `/programs`, `/donation`

---

## Beta testing

- Beta hub: [https://www.dhe.org.in/beta](https://www.dhe.org.in/beta) (noindex)
- Feedback form: [https://www.dhe.org.in/feedback](https://www.dhe.org.in/feedback)
- Email: director@dhe.org.in

---

## Security (already configured)

| Control | Location |
|---------|----------|
| HSTS | `next.config.js` |
| CSP | `next.config.js` |
| X-Frame-Options | SAMEORIGIN |
| Referrer-Policy | strict-origin-when-cross-origin |
| Sentry | Error monitoring |

---

## Core Web Vitals targets

| Metric | Good |
|--------|------|
| LCP | ≤ 2.5s |
| CLS | ≤ 0.1 |
| INP | ≤ 200ms |
| Lighthouse Performance | ≥ 90 |

Run: [PageSpeed Insights](https://pagespeed.web.dev/?url=https://www.dhe.org.in)

---

## Launch timeline

| When | Action |
|------|--------|
| **Day 1** | GSC verify + sitemap + Rich Results Test |
| **Day 2–3** | Beta feedback via `/beta` + `/feedback` · Vercel/Sentry logs |
| **Day 4–7** | Re-run `launch-audit` · fix slow pages |
| **Week 2** | Public announcement · GSC Performance monitoring |

---

## Mobile audit (manual)

Test on Android Chrome + iPhone Safari:

- [ ] Sticky header + hamburger menu
- [ ] Donation Razorpay flow
- [ ] Cell pages and programs
- [ ] Hindi `/hi` page
- [ ] Cookie consent + GA loading after accept
