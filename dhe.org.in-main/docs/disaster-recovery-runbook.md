# Disaster recovery runbook — dhe.org.in

**Last updated:** 2026-07-03  
**Owner:** DHE web ops (director@dhe.org.in)

This runbook covers recovery when production (Vercel + Supabase + Razorpay + Brevo) is degraded or unavailable.

---

## 1. Service map

| Component | Provider | Recovery lever |
|-----------|----------|----------------|
| Web app | Vercel (`dheWeb/dhe-orgin.`) | Redeploy `main`, rollback deployment |
| Database | Supabase Postgres | Point-in-time restore (Pro), daily backups |
| File storage | Supabase Storage | Bucket restore from backup export |
| Payments | Razorpay | Dashboard status, webhook replay |
| Email | Brevo API | API key rotation, sender/domain DNS |
| DNS | Registrar / Vercel | `www.dhe.org.in` → Vercel |

---

## 2. Health checks

1. `GET https://www.dhe.org.in/api/health` — expect `status: ok`
2. Admin → **System status** (`/admin`) — Razorpay auth + Brevo account
3. Razorpay dashboard — recent payments + webhook delivery log
4. Brevo — transactional log for receipt sends

---

## 3. Incident severity

| Level | Example | Response |
|-------|---------|----------|
| SEV-1 | Site down, payments broken | Page stakeholders; rollback or hotfix within 1 h |
| SEV-2 | Receipt email failing | Verify Brevo key + `/api/health`; resend via admin receipt route |
| SEV-3 | CMS/admin only | Public site OK; fix admin auth or Supabase RLS |

---

## 4. Vercel outage / bad deploy

1. Open Vercel → project → **Deployments**
2. Identify last known-good deployment → **Promote to Production**
3. If build broken: fix on `main`, `npm run build` locally, push, wait for auto-deploy
4. Manual: `vercel deploy --prod` from `dhe.org.in-main` with linked project

**Env vars:** Never delete `RAZORPAY_*`, `BREVO_API_KEY`, `SUPABASE_*`, `RAZORPAY_WEBHOOK_SECRET` during incident response.

---

## 5. Supabase database recovery

1. Supabase dashboard → **Database** → **Backups**
2. For data corruption: restore to new project or PITR window (plan-dependent)
3. Update Vercel env: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_*`
4. Re-run migrations if restoring to empty DB: `supabase db push` (from maintainer machine)
5. Verify: notices, donations table, admin login

**Export cadence (recommended):** weekly `pg_dump` to encrypted offline storage.

---

## 6. Payment failure (Razorpay)

| Symptom | Check | Fix |
|---------|-------|-----|
| "Failed to create order" | `/api/health` → `payments.razorpayAuthOk` | Sync live `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` on Vercel |
| Payment OK, no DB row | Webhook secret mismatch | Align `RAZORPAY_WEBHOOK_SECRET` with Razorpay dashboard |
| DB row, no email | Brevo / `metadata.receipt_email_sent` | Admin diagnostics `/api/admin/email/diagnostics`; resend receipt |

Webhook URL: `https://www.dhe.org.in/api/payments/razorpay-webhook`

---

## 7. Email failure (Brevo)

1. Confirm `BREVO_API_KEY` is **API** key (`xkeysib-`), not SMTP-only
2. Brevo → Security → disable IP block if Vercel egress changes
3. Verify sender `director@dhe.org.in` authenticated (SPF/DKIM — owner DNS)
4. Test: authenticated admin `POST /api/admin/email/diagnostics`

Idempotent resend: donation verify path + webhook retry sets `receipt_email_sent` in metadata.

---

## 8. Secret compromise

Follow `docs/secret-rotation-runbook.md`:

1. Rotate compromised secret at provider
2. Update Vercel env (all aliases: canonical + `_NEW` where used)
3. Redeploy production
4. Revoke old keys at provider
5. Audit donations/webhook logs for anomaly window

---

## 9. Communication template

> DHE website: We are aware of [issue]. Donations via Razorpay [are/are not] affected. Estimated resolution: [time]. Contact director@dhe.org.in for urgent donation receipts.

Post resolution on noticeboard if outage &gt; 30 minutes.

---

## 10. Post-incident

- [ ] Root cause documented (internal)
- [ ] `/api/health` green 24 h
- [ ] Sample ₹1 test donation + receipt email
- [ ] Update this runbook if steps were wrong or missing
