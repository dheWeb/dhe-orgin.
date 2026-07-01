# DHE Website — Security Review

**Site:** https://www.dhe.org.in  
**Review date:** 30 June 2026  
**Scope:** Post–Phase 0/1 hardening pass (audit-driven fixes)  
**Reviewer:** Automated + code review (enterprise checklist)

---

## Executive summary

Security posture **improved** in this pass (admin auth, headers, PII route lockdown, webhook verification, cookie gating). The site is **not yet production-hardened** for a public institution handling payments and PII. **Critical gaps remain:** client-side Firebase writes, missing reCAPTCHA on forms, no distributed rate limiting, and incomplete secrets rotation discipline.

**Overall risk:** **MEDIUM–HIGH** until Firebase client writes are removed and server-side validation is enforced.

---

## Verification matrix

| Control | Status | Notes |
|---------|--------|-------|
| HTTPS enforcement | **PARTIAL** | Vercel provides TLS; `next.config.js` adds apex→www redirect + HSTS header |
| CSP headers | **IMPLEMENTED** | Content-Security-Policy in `next.config.js` (allows Razorpay, Google, Botpress after consent) |
| HSTS | **IMPLEMENTED** | `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` |
| XSS protection | **PARTIAL** | CSP + removed `eval()` in FeedbackForm; `unsafe-inline`/`unsafe-eval` still required for Next/AdSense |
| CSRF protection | **NOT IMPLEMENTED** | Public forms lack CSRF tokens; admin uses Basic Auth only |
| Authentication | **PARTIAL** | Basic Auth on `/WD`, `/donationdatadekh`, `/noticeboarddata`, `/Members`, `/api/sendMail` |
| Authorization | **PARTIAL** | Notice admin uses env email allowlist (bypassable); no Supabase RBAC CMS yet |
| Rate limiting | **NOT IMPLEMENTED** | No Upstash/API throttling on public POST or webhooks |
| Dependency vulnerabilities | **5 moderate** | `npm audit`: PostCSS (via Next), uuid (via exceljs) — no fix without breaking changes |
| Environment variable security | **GOOD** | Secrets in Vercel + `.env.local` (gitignored); `.env.example` has placeholders only |
| Secrets management | **AT RISK** | Keys were shared in chat during setup — **rotate** Supabase service role, Razorpay secret, Brevo SMTP key, reCAPTCHA secret |

---

## Findings by severity

### Critical (P0) — open

| ID | Finding | Recommendation |
|----|---------|----------------|
| SEC-001 | **Client Firestore writes** on feedback, contact, membership, noticeboard admin | Migrate to Supabase + server API routes with validation + RLS |
| SEC-002 | **Firebase config in client bundle** | Remove Firebase SDK; use server-only Supabase service role |
| SEC-003 | **No reCAPTCHA** on public forms despite keys in env | Verify token server-side on all POST endpoints |
| SEC-004 | **No rate limiting** on `/api/payments/*`, future `/api/forms/*` | Upstash Redis rate limits per IP |

### High (P1) — open

| ID | Finding | Recommendation |
|----|---------|----------------|
| SEC-005 | Notice admin auth is client-side email check | Supabase Auth + role `notice_editor` |
| SEC-006 | Admin Basic Auth only (no MFA, no lockout) | Move to Supabase Auth or Vercel SSO for `/admin` |
| SEC-007 | CSP allows `unsafe-inline` / `unsafe-eval` | Tighten with nonces when AdSense/Botpress strategy allows |
| SEC-008 | Payment webhook has no IP allowlist | Optional Razorpay webhook IP validation + idempotency (idempotency **done**) |
| SEC-009 | Donation receipt emails not sent from webhook | Wire SMTP in webhook handler; never log PII |

### Medium (P2) — open

| ID | Finding | Recommendation |
|----|---------|----------------|
| SEC-010 | `exceljs` / `uuid` moderate CVE | Upgrade or replace export library |
| SEC-011 | Admin exports PII to PDF client-side | Server-side export with audit log |
| SEC-012 | No Sentry/error monitoring | Add `@sentry/nextjs` with PII scrubbing |
| SEC-013 | No security.txt / responsible disclosure page | Add `/security` or `/.well-known/security.txt` |

### Fixed in this pass

| ID | Fix |
|----|-----|
| FIX-001 | Removed `eval()` from `FeedbackForm.tsx` |
| FIX-002 | `/Members` middleware-protected + `noIndex` + removed public PII table |
| FIX-003 | Removed Bearer-password-only admin bypass |
| FIX-004 | Cookie consent gates AdSense + Botpress |
| FIX-005 | Security headers (HSTS, CSP, X-Frame-Options, etc.) |
| FIX-006 | Razorpay webhook HMAC verification |
| FIX-007 | Jodo payment links removed from donation form |
| FIX-008 | Privacy policy + terms pages live |
| FIX-009 | Brevo SMTP via host/port (not Gmail service string) |

---

## Payment security

| Item | Status |
|------|--------|
| Razorpay live keys in Vercel | Configured |
| Webhook signature verification | **Yes** (`x-razorpay-signature`) |
| Webhook idempotency | **Yes** (`payment_webhook_events` table) |
| Client payment verify | **Yes** (`/api/payments/razorpay/verify`) |
| Server-side order creation | **Yes** |
| Receipt PDF + email on capture | **No** — webhook records donation only |
| PCI scope | SAQ A (Razorpay Checkout hosted) |

---

## Data protection (DPDP / privacy)

| Item | Status |
|------|--------|
| Privacy policy | **Published** `/privacy-policy` |
| Terms of use | **Published** `/terms` |
| Cookie consent | **Implemented** (banner) |
| Data retention policy | Mentioned in privacy policy; not operationalized |
| Right to erasure process | Manual via email only |

---

## Recommendations (priority order)

1. **Rotate all secrets** exposed during setup (Supabase, Razorpay, Brevo, reCAPTCHA).
2. **Remove Firebase SDK** — complete Supabase migration (Phase 1).
3. **Server-side form APIs** with reCAPTCHA + rate limits.
4. **Supabase Auth** for admin/CMS (replace Basic Auth).
5. **Sentry + structured logging** (no secrets in logs).
6. **CI pipeline** with `lint`, `type-check`, `test`, `build`, `npm audit` on every PR.
7. **Tighten CSP** after third-party script audit.

---

## Sign-off

| Role | Status |
|------|--------|
| Security review | **CONDITIONAL FAIL** — P0 items open |
| Ready for production | **NO** |
