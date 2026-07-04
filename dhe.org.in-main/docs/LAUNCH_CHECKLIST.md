# DHE Launch Checklist

Production: [https://www.dhe.org.in](https://www.dhe.org.in)  
TEJAS: [https://tejas.dhe.org.in](https://tejas.dhe.org.in)

**Launch readiness: ~95–98%** — only Google Search Console verification remains manual.

---

## Day 1 — Google Search Console (essential)

Google does **not** use IndexNow for indexing.

1. [Google Search Console](https://search.google.com/search-console) → **Add property** → `https://www.dhe.org.in`
2. **Verify ownership:**
   - **DNS TXT** on `dhe.org.in` (recommended)
   - **HTML meta tag:** `NEXT_PUBLIC_GSC_VERIFICATION` in Vercel → redeploy
   - **HTML file** in `public/`
3. **Sitemaps** → submit `sitemap.xml`
4. **URL Inspection** → homepage → **Request indexing**
5. [Rich Results Test](https://search.google.com/test/rich-results?url=https://www.dhe.org.in) on key pages

**Monitor weekly:** Coverage · Core Web Vitals · Enhancements · Search Performance

---

## Day 1 — Core Web Vitals & Lighthouse

Run manually (API may rate-limit):

- [PageSpeed Mobile](https://pagespeed.web.dev/analysis?url=https://www.dhe.org.in&form_factor=mobile)
- [PageSpeed Desktop](https://pagespeed.web.dev/analysis?url=https://www.dhe.org.in&form_factor=desktop)

| Metric | Target |
|--------|--------|
| LCP | ≤ 2.5s |
| CLS | ≤ 0.1 |
| INP | ≤ 200ms |
| Lighthouse Performance | ≥ 90 |

Automated: `npm run launch-audit`

---

## Day 1 — Structured Data & Rich Results

Validate JSON-LD on:

| Page | Expected schema |
|------|-----------------|
| `/` | EducationalOrganization, WebSite, FAQPage |
| `/programs/dhe-olympiads` | Organization, BreadcrumbList |
| `/donation` | Organization, BreadcrumbList |
| `/contact` | Organization, BreadcrumbList |
| `/upcomingevent` | Organization, Event |

[Test each in Rich Results Test](https://search.google.com/test/rich-results)

---

## Day 1 — Crawl check (automated)

```bash
npm run launch-audit    # 79+ sitemap URLs, canonicals, mixed HTTP, OG
npm run smoke:prod      # Quick smoke on key routes
```

Checks: no 404s, redirect chains, duplicate canonicals, mixed HTTP assets.

---

## Day 1 — Security (automated)

Verified via `launch-audit`:

- HTTPS + HSTS (`max-age=63072000; includeSubDomains; preload`)
- CSP, X-Frame-Options (SAMEORIGIN), X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- Sentry error monitoring

---

## Day 1 — Analytics

GA4 is **consent-gated** — confirm `NEXT_PUBLIC_GA_MEASUREMENT_ID` on Vercel production.

| Event | Trigger |
|-------|---------|
| `begin_checkout` / `purchase` | Razorpay donation |
| `generate_lead` | Feedback, membership, workshop forms |
| `whatsapp_click` | Floating WhatsApp button |

---

## Day 1 — Open Graph

Dynamic image: `https://www.dhe.org.in/opengraph-image`

- [Facebook Debugger](https://developers.facebook.com/tools/debug/?q=https://www.dhe.org.in)
- [LinkedIn Inspector](https://www.linkedin.com/post-inspector/)

---

## Day 1 — IndexNow (Bing/Yandex, not Google)

Key: `https://www.dhe.org.in/dhe735cd8a735cd8a735cd8a735cd8a.txt`

```bash
npm run post-launch -- --skip-email
```

---

## Day 2–3 — Beta feedback

- Beta hub: [/beta](https://www.dhe.org.in/beta) (noindex)
- Feedback form: [/feedback](https://www.dhe.org.in/feedback)
- Email: director@dhe.org.in
- Monitor: Vercel logs, Sentry, `/api/health`

---

## Day 4–7 — Performance pass

- Re-run `npm run launch-audit`
- Fix pages with Performance < 90
- Check GSC **Experience → Core Web Vitals**

---

## Week 2 — Public launch

- Incorporate beta feedback
- Public announcement + social sharing (test OG previews)
- Monitor GSC **Performance** (impressions, clicks, CTR)

---

## Mobile audit (manual — real devices)

Test on **Android Chrome** + **iPhone Safari**:

- [ ] Sticky header + navigation
- [ ] Donation Razorpay flow
- [ ] Cell / program pages
- [ ] Hindi `/hi` page
- [ ] Tap targets ≥ 44px, readable fonts
- [ ] Cookie consent → GA loads after accept

---

## Automated commands

```bash
cd dhe.org.in-main
npm run launch-audit
npm run post-launch              # IndexNow + OG + beta invite email
npm run post-launch -- --skip-email
npm run smoke:prod
```

Reports: `docs/LAUNCH_AUDIT_REPORT.md`, `docs/POST_LAUNCH_REPORT.md`

Deploy guide: `../docs/DEPLOY.md`
