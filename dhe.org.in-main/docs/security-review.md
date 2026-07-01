# DHE Website — Security Review

**Site:** https://www.dhe.org.in  
**Updated:** July 2026  
**Stack:** Next.js 15, Supabase, Razorpay, Brevo API

---

## Executive summary

**Firebase has been fully retired.** All dynamic data uses Supabase server APIs with RLS. Public forms use reCAPTCHA and rate limiting. Admin routes use HTTP Basic Auth. Payment webhooks verify HMAC signatures; receipt emails send via Brevo REST API.

**Overall risk:** **MEDIUM** — suitable for beta production. Remaining gaps: Basic Auth without MFA, CSP `unsafe-inline`, optional Sentry/Upstash, and secrets rotation if keys were ever shared in chat.

---

## Verification matrix

| Control | Status | Notes |
|---------|--------|-------|
| HTTPS + HSTS | **YES** | Vercel TLS + HSTS in `next.config.js` |
| CSP headers | **YES** | Razorpay, Google, Botpress (post-consent) |
| XSS | **PARTIAL** | CSP; `unsafe-inline` required for Next/AdSense |
| CSRF | **PARTIAL** | JSON APIs + SameSite cookies; no CSRF tokens |
| Authentication | **YES** | Basic Auth on admin routes via middleware |
| Authorization | **PARTIAL** | Supabase RLS; admin is shared password |
| Rate limiting | **YES** | Supabase `rate_limit_buckets` on forms, payments, errors |
| reCAPTCHA | **YES** | Contact, feedback, membership, workshop forms |
| Firebase | **RETIRED** | No SDK, no env vars, no client writes |
| Receipt email | **YES** | Brevo API on webhook + verify fallback |
| security.txt | **YES** | `/.well-known/security.txt` |
| Dependency CVEs | **5 moderate** | PostCSS/Next, uuid/exceljs — track upstream |

---

## Payment security

| Item | Status |
|------|--------|
| Webhook HMAC verification | Yes |
| Webhook idempotency | Yes |
| Client verify + donation fallback | Yes |
| Receipt PDF + email | Yes |
| PCI scope | SAQ A (Razorpay Checkout) |

---

## Recommendations (remaining)

1. Rotate secrets if ever shared in chat (`docs/secret-rotation-runbook.md`).
2. Add `SENTRY_DSN` for production error tracking.
3. Optional Upstash for edge rate limits (Supabase fallback works).
4. Tighten CSP nonces when AdSense strategy allows.
5. Consider Supabase Auth for admin (replace Basic Auth long-term).

---

## Sign-off

| Role | Status |
|------|--------|
| Beta production (`www.dhe.org.in`) | **Approved** with monitoring |
| Enterprise / full audit (280 items) | **In progress** — see `EXHAUSTIVE_RESTRUCTURE_PLAN.md` |
