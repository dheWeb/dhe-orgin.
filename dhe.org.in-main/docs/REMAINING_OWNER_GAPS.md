# Remaining owner / enterprise gaps

**Last updated:** 2026-07-03  
**Production:** https://www.dhe.org.in — **272/272 actionable AUD items FIXED**; **8 WONTFIX**; **Homepage Phases 1–3 shipped**.

## Phase 3 (Jul 2026) — shipped in repo

- Testimonials section on homepage
- Scroll-reveal on major homepage sections
- Slim mobile chrome (CompanyInfo + promo banner)
- Card system on `/programs`, `/structure`, `/hi`
- Removed dead `MiddleComponent.tsx`, `HeroFirstSlide.tsx`
- `node scripts/smoke-test-production.mjs` for post-deploy checks

## Owner actions (outside repo deploy)

| Item | Owner action |
|----|--------------|
| K-16 | Re-run Lighthouse on production after deploy; tune CDN if score &lt;95 |
| K-18 | Disable Firestore in Firebase console (Firebase retired from app) |
| I5-04 | Verify Supabase PITR/backups on paid plan |
| I5-10 | 30-day post-launch sign-off checklist |
| — | Brevo SPF/DKIM DNS at registrar |
| — | Secret rotation on schedule (`docs/secret-rotation-runbook.md`) |
| §L | Legal counsel sign-off on Hindi+English privacy/terms wording |

## Implemented in repo (Jul 2026)

- Trust deed + program PDFs in `public/documents/`
- Staging guide: `docs/STAGING.md`, `.env.staging.example`
- Uptime: Vercel cron `/api/cron/health` every 15m
- Full AUD register: `docs/AUD_REGISTER_STATUS.md` — run `node scripts/generate-aud-register-status.mjs`

## Enterprise deferred (acceptable for beta)

| Area | Status |
|------|--------|
| CMS §B.3 relational tables + RBAC | JSON `site_content`; Supabase auth admin |
| Structure org chart | Client-only tree; cell links SSR |
| Load testing webhooks | Not in CI |
| Full manual regression | Spot-check key flows post-deploy |
