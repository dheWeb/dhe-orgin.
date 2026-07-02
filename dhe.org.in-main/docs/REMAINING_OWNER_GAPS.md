# Remaining owner / enterprise gaps

**Last updated:** 2026-07-03  
**Production:** https://www.dhe.org.in — beta-ready; enterprise targets in `EXHAUSTIVE_RESTRUCTURE_PLAN.md` §D remain open.

## Cannot complete in code alone

| ID | Item | Owner action |
|----|------|--------------|
| K-16 | Lighthouse mobile Performance ≥95, LCP &lt;2.5s | CDN tuning, image audit, real-device profiling |
| K-18 | Firestore disabled | Firebase console → disable client SDK / Firestore |
| I5-04 | Daily Supabase backups verified | Enable PITR/backups on Supabase plan; test restore |
| I5-09 | Staging environment | Create staging Supabase + Vercel preview project |
| I5-10 | 30-day post-launch sign-off | External uptime (UptimeRobot etc.) + ops review |
| AUD-141 | Trust deed PDF on transparency | Upload signed PDF to CMS / `public/` |
| — | Brevo SPF/DKIM DNS | DNS records at domain registrar |
| — | Secret rotation cadence | Follow `docs/secret-rotation-runbook.md` |

## Partial — acceptable for beta, not enterprise

| Area | Status |
|------|--------|
| CMS §B.3 relational tables + RBAC | JSON keys in `site_content`; admin Basic Auth fallback |
| Structure org chart | Client-only (`react-organizational-chart`); static cell links SSR |
| Cell slideshow pages | Gallery client-hydrated; text content SSR via parent |
| Load testing webhooks | Not run in CI |
| Full 280-item manual regression | See `docs/AUD_TRIAGE.md` |

## Code-complete in this repo (reference)

- Razorpay donations + membership; no `jodo.in`
- Idempotent PDF receipts + Brevo email (donation + membership)
- `/api/health`, daily Vercel cron, OpenAPI, disaster-recovery runbook
- Home DHE-first CTAs; SMK as `/programs/shiksha-mahakumbh` with external RASE links secondary
- JSON-LD breadcrumbs on major public sections; OG images on public pages registry
