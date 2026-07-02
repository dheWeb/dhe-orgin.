# AUD-001 … AUD-280 — Triage summary

**Last updated:** 2026-07-03  
**Site:** https://www.dhe.org.in

This document triages every audit ID from `EXHAUSTIVE_RESTRUCTURE_PLAN.md` §C.  
Statuses: **FIXED** | **PARTIAL** | **WONTFIX** (intentional) | **OPEN** (owner/external) | **DEFERRED** (post-beta)

---

## Summary counts

| Status | Count (approx.) |
|--------|-----------------|
| FIXED | ~230 |
| PARTIAL | ~25 |
| WONTFIX | ~8 |
| OPEN (owner) | ~12 |
| DEFERRED | ~5 |

---

## OPEN — requires owner / external systems

| AUD | Item |
|-----|------|
| K-05 / AUD-163 | Hindi thanks in emails/PDFs | **FIXED** — `hindi-thanks.ts` (owner may refine wording) |
| K-16 / AUD-198 | Lighthouse Performance ≥95, LCP <2.5s on production |
| K-17 | Per-row sign-off in §C table | **DONE** — `docs/AUD_REGISTER_STATUS.md` (280 rows) |
| K-18 / I5-01 | Disable Firestore in Firebase console |
| AUD-017 | Secret rotation (see `secret-rotation-runbook.md`) |
| AUD-205 | External uptime monitor | **PARTIAL** — Vercel cron `/api/cron/health` every 15m; optional UptimeRobot |
| AUD-220 / I5-09 | Staging Supabase + Vercel preview env |
| AUD-141 | Trust deed public PDF (file not in repo) |
| §L | Legal Hindi+English privacy/terms sign-off |
| §L | Brevo SPF/DKIM DNS at registrar |
| §B.3 | Full relational CMS schema + RBAC roles |
| I5-05 | Retire Basic Auth (optional; Supabase auth is primary) |

---

## WONTFIX — intentional or accepted

| AUD | Reason |
|-----|--------|
| AUD-047 / AUD-134 | `spritual` slug kept; `/cells/spiritual` → redirect |
| AUD-145 | `tentative_schdule.xlsx` filename kept; `/tentative_schedule.xlsx` redirects |
| AUD-050 | `comingsoon` → redirect `/structure` |
| AUD-224–226 | GTM, newsletter, share buttons — out of beta scope |
| AUD-214 | Firebase App Check — Firebase retired |

---

## PARTIAL — code exists; polish or content ongoing

| AUD | Notes |
|-----|------|
| AUD-043 | Per-page OG images on key routes; not every page |
| AUD-044 | JSON-LD on home, events, programs, cells; not all 15 legacy gaps |
| AUD-056 | DHE-first home; SMK remains one program block |
| AUD-087 | `/hi` hub + nav link; not full Hindi site |
| AUD-103 | Lighthouse a11y 76 prod — contrast work ongoing |
| AUD-116–120 | Event/marquee freshness — edit via `/admin/cms` |
| AUD-142 | Events in CMS JSON, not relational `events` table |
| I3-04 | Cells: `registry.json` + `cell_overrides` JSON, not full cell editor |
| AUD-030 / AUD-165 | PAN optional on donate form; stored in payment order notes |

---

## FIXED — representative P0/P1 (full list in git history)

**Security:** AUD-001–005, 009, 018–019, 023–024, 027, 146–147, 176–177  
**Payments:** AUD-090, 160–164, 168, 170–173, 235 (verify URL + QR on donation PDF)  
**Firebase:** AUD-004, 176, 190–192 (retired)  
**SEO:** AUD-036–042, 045–046, 048, 052, 055  
**UX/Legal:** AUD-059, 063, 084, 088, 104, 171  
**Ops:** AUD-201, 203, 212–213, 217  
**Content/LMC:** AUD-106, 108–109, 113, 139, 123 (80G/12A PDFs in repo)  
**Membership K-04:** Razorpay + idempotent receipt email + admin resend (Jul 2026)

---

## Apply on Supabase (production)

Run migration `supabase/migrations/20260703220000_membership_receipt.sql` in SQL Editor if not yet applied:

```sql
alter table public.membership_applications
  add column if not exists receipt_number text,
  add column if not exists metadata jsonb not null default '{}'::jsonb;
```

---

## Re-verify after deploy

1. `GET /api/health` → ok  
2. Donation ₹1 → receipt email + PDF QR  
3. Membership test → save application → Razorpay → receipt email  
4. `GET /api/openapi` → v1.1  
5. Lighthouse on production URL
