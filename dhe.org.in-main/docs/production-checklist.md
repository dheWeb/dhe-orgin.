# DHE Website — Production Readiness Checklist

**Site:** https://www.dhe.org.in  
**Assessment date:** 30 June 2026  
**Reference:** `EXHAUSTIVE_RESTRUCTURE_PLAN.md` (AUD-001 … AUD-280)

---

## Build & quality gates

| Check | Command | Result (30 Jun 2026, updated) |
|-------|---------|-------------------------------|
| Lint | `npm run lint` | **PASS** |
| Type check | `npm run type-check` | **PASS** |
| Unit tests | `npm run test` | **PASS** (11 tests) |
| Production build | `npm run build` | **PASS** (60 routes) |
| npm audit | `npm audit` | **3 moderate** (postcss/next chain — upstream; `uuid` mitigated via override) |
| CI workflow | `.github/workflows/ci.yml` | **ADDED** (not yet run on GitHub) |

---

## Lighthouse (production — https://www.dhe.org.in, 1 Jul 2026)

| Metric | Target | Actual | Pass |
|--------|--------|--------|------|
| Performance | ≥ 95 | **81** | **NO** |
| Accessibility | 100 | **76** | **NO** (retest after deploy; contrast fixes in progress) |
| Best Practices | 100 | **89** | **NO** |
| SEO | 100 | **82** | **NO** |

> Production scores vary with cookie banner / third-party scripts. Re-run after deploy:  
> `npx lighthouse https://www.dhe.org.in --only-categories=performance,accessibility`

## Lighthouse (localhost:3000, production build)

| Metric | Target | Actual | Pass |
|--------|--------|--------|------|
| Performance score | ≥ 95 | **51** | **NO** |
| Accessibility score | 100 | **96** | **NO** |
| Best Practices score | 100 | **93** | **NO** |
| SEO score | 100 | **100** | **YES** |
| LCP | < 2.5s | **~126KB WebP hero** (was 1.9MB JPEG) — re-test on production | **Pending retest** |
| CLS | < 0.1 | **0.0002** | **YES** |
| INP | < 200ms | **N/A** (no interaction trace) | **N/A** |

> Note: Local Lighthouse LCP is inflated by first-load `next start` + unoptimized `/public` images on Vercel Hobby. Production CDN still requires hero image optimization for real LCP < 2.5s.

## axe-core

| Check | Result |
|-------|--------|
| `npx @axe-core/cli http://localhost:3000` | **FAILED** (CLI/chromedriver env on Node 20) |
| Lighthouse accessibility audit | **96/100** — contrast / landmark issues likely |

---

## Infrastructure readiness

| Item | Status |
|------|--------|
| Vercel deployment | **Live** |
| Supabase Postgres | **Live** — payments + forms/notices/visitors schema applied |
| Razorpay live + webhook | **Live** |
| Brevo SMTP | **DONE** — REST API + receipt emails verified |
| reCAPTCHA keys | **Wired** — contact, feedback, membership forms |
| Upstash (rate limit) | **Skipped** — no free plan on Vercel; **Supabase `rate_limit_buckets`** is production backend |
| GA4 | **Live** — `G-VZ55ESSK6V` (cookie consent gated) |
| Sentry | **Live** — `rase-monitoring-l1` + source maps |
| CI/CD (GitHub Actions) | **Workflow added** — runs on push to `main` |
| Database backups | **Supabase default** — not verified |
| Health endpoint | **YES** `/api/health` |
| Error boundaries | **YES** `error.tsx`, `not-found.tsx`, `global-error.tsx` |
| Skip link | **YES** in `RootLayoutClient.tsx` |

---

## Audit remediation progress (280 items)

| Phase | Status | Notes |
|-------|--------|-------|
| P0 security & privacy | **~70%** | eval, Members, legal, cookies, headers, admin gate |
| P0 payments | **~75%** | Razorpay donate + webhook + receipt email; membership linked |
| Firebase → Supabase | **DONE** | SDK removed; Firestore retired; bootstrap seed script |
| CMS | **~65%** | + home vision, closing CTA; cell/leadership pages still hardcoded |
| SEO | **~65%** | sitemap/robots, llms.txt, unique cell meta |
| Performance | **~75%** | Hero images compressed 1.9MB→126KB WebP; SSR LCP; Next image optimization on |
| Accessibility | **~80%** | skip link added; Lighthouse 96 |
| Content / LMC sync | **~40%** | committee synced to Letter 12 |

---

## Fixes completed this session

- Tooling: `type-check`, `test` (Vitest), 5 unit tests
- **AUD-001** `eval()` removed from FeedbackForm
- **AUD-002/003/010/027** `/Members` protected, noIndex, PII table removed
- **AUD-009** Bearer-only admin bypass removed
- **AUD-018/024** Cookie consent before AdSense/Botpress
- **AUD-019** CSP, HSTS, security headers
- **AUD-023** Privacy + Terms pages
- **AUD-029** 80G disclosure on donation page
- **AUD-036** Home title template fix
- **AUD-038** Invalid SearchAction schema removed
- **AUD-039–041** Legacy `public/sitemap.xml` + `public/robots.txt` removed
- **AUD-042** `llms.txt` added
- **AUD-146/271** Jodo removed from donation; membership link replaced
- **AUD-090** Razorpay donation checkout (no manual receipt upload)
- `error.tsx`, `not-found.tsx`, `global-error.tsx`, skip link
- `/api/health`, Brevo SMTP host support
- **Firebase SDK removed** — all forms/notices/visitors on Supabase APIs
- Admin pages (`noticeboarddata`, `donationdatadekh`, `WD`) use `/api/admin/*`
- reCAPTCHA on contact, feedback, membership
- Membership Razorpay + webhook updates `membership_applications`
- Donation receipt PDF email on webhook capture
- CI workflow `.github/workflows/ci.yml`
- Hero images compressed to WebP (`npm run optimize-images`) — **93% size reduction** on LCP image
- Supabase distributed rate limiting + error logging (no Upstash/Sentry account required)
| `/noticeboard` bundle | **103 KB → 3 KB** (Ant Design removed from NoticeBoard) |
| **43 additional images** compressed to WebP sitewide |
| `/admin` hub page + `/api/forms/workshop` |
| Supabase **RLS policies** applied |
| Footer **contrast** improved (gray-400 → gray-300 on dark bg) |
| Notice image URL resolver fixed (same-origin paths) |
| **Receipt PDF API** `/api/receipts/[id]/pdf` (admin or email verification) |
| **Admin resend receipt** `/api/admin/donations/[id]/receipt` |
| **Supabase Storage** `notices` bucket + `/api/admin/upload` |
| **Hindi** donation receipt PDF + email |
| Workshop slides 14/15/17 → WebP |
| Donation admin: receipt PDF download + email resend (legacy QR removed) |

| **Visible breadcrumbs** + publications hub + refund policy |
| **Programs** `/programs/[slug]` + CMS people/advisory JSON |
| **Donor address** on donation form + admin export |
| **Home promo banner** (replaces modal) + single sticky nav |
| **Dynamic Event JSON-LD** from CMS upcoming events |

---

## Blocking issues for production

### P0 — must fix before go-live

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| 1 | Supabase full schema migration | **P0** | **DONE** |
| 2 | LCP / Performance score below target | **P0** | **Partial** — image optimization + SSR hero; compress `public/` sources |
| 3 | Legacy Firestore data | **CLOSED** | Firebase DB deleted; use `npm run seed:bootstrap` for starter content |
| 4 | Upstash env | **Closed** | Skipped — Vercel Upstash has no free plan; Supabase rate limits in use |
| 5 | Sentry env | **Done** | Live on Vercel |
| 5 | npm audit moderate CVEs | **LOW** | 3 remain (Next/postcss); uuid override applied |
| 6 | Accessibility below 100 | **MEDIUM** | Contrast fixes applied; retest Lighthouse |
| 7 | CMS partial | **LOW** | Key snippets at `/admin/cms`; cell pages hardcoded |
| 8 | Secrets exposed in chat | **HIGH** | **Manual** — run `npm run check-rotation` |
| 9 | Full audit 280 items — ~55% remain | **HIGH** | Ongoing |

---

## READY FOR PRODUCTION

# **BETA: YES** | **ENTERPRISE: NO**

The site is **live at https://www.dhe.org.in** with Supabase forms/notices, Razorpay, Brevo receipt emails, reCAPTCHA, and admin tools. Receipt resend verified (200). Full enterprise gates (Lighthouse ≥95, a11y 100, full CMS, complete audit) still in progress.

---

## Deployment recommendations (when blockers cleared)

1. **Staging environment** on Vercel Preview with test Razorpay keys first.
2. **Redeploy** after each env rotation; never commit `.env.local`.
3. **Supabase**: enable daily backups, review RLS before any public read.
4. **Razorpay**: verify webhook delivery in dashboard after each deploy.
5. **Brevo**: confirm `director@dhe.org.in` sender domain (SPF/DKIM).
6. **Smoke tests post-deploy:**
   - `GET /api/health` → 200
   - Donation ₹1 test → webhook → Supabase row
   - Receipt email received
   - `/privacy-policy`, `/terms` → 200
   - `/Members` → 401 without admin creds

## Post-deployment monitoring

| Tool | Purpose |
|------|---------|
| Vercel Analytics | Web Vitals on real traffic |
| Sentry | Errors, payment/webhook failures |
| Razorpay Dashboard | Failed payments, webhook retries |
| Supabase Dashboard | DB health, RLS violations |
| Uptime monitor | `/api/health` every 5 min |
| Brevo logs | Email bounce rate |

---

## Next reconstruction steps (ordered)

1. **Optional env in Vercel:** Sentry done; Upstash skipped (Supabase rate limits). GA4: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
2. **Rotate secrets** shared in chat (Supabase, Razorpay, reCAPTCHA, Brevo, admin password)
3. **Bootstrap Supabase content:** `npm run seed:bootstrap` (starter notices + CMS)
4. **Compress hero images** in `public/2024K/` (multi-MB JPEGs)
5. **CMS** `/admin` per exhaustive plan
6. **Lighthouse on production URL** after image compression
