# Secret rotation runbook — DHE (www.dhe.org.in)

**Project:** `qrzjnfdapwneieafykoz` (Supabase) · Vercel `dhe-orgin-ctai`  
**Why:** Keys were shared in chat / reused across services. Rotate **before** revoking old keys.

---

## Golden rule (zero-downtime)

1. **Generate new keys** in each dashboard (keep old keys active).
2. **Update** `dhe.org.in-main/.env.local` with new values.
3. **Sync to Vercel** and redeploy:
   ```powershell
   cd dhe.org.in-main
   node scripts/sync-vercel-env.mjs production preview development
   cd ..
   npx vercel deploy --prod --yes
   ```
4. **Smoke-test** (see checklist below).
5. **Revoke old keys** only after everything passes.

---

## 1. Supabase

**Dashboard:** https://supabase.com/dashboard/project/qrzjnfdapwneieafykoz/settings/api

| Secret | Where to rotate | Env vars to update |
|--------|-----------------|-------------------|
| Anon (public) key | Settings → API → **anon** `public` key (or new Publishable key) | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Service role key | Settings → API → **service_role** `secret` key | `SUPABASE_SERVICE_ROLE_KEY` |
| New API keys (if enabled) | Settings → API → Secret keys | `SUPABASE_SECRET_KEY`, `SUPABASE_PUBLISHABLE_KEY` |
| Database password | Settings → **Database** → Reset database password | `SUPABASE_DB_PASSWORD` |

**Important**

- **Avoid “Reset JWT secret”** unless you intend to invalidate *all* existing JWT keys at once.
- After DB password change, update local migration scripts and any tools using direct Postgres.
- `NEXT_PUBLIC_SUPABASE_URL` usually stays the same (`https://qrzjnfdapwneieafykoz.supabase.co`).

---

## 2. Razorpay (live)

**Dashboard:** https://dashboard.razorpay.com/app/keys  
**Webhooks:** https://dashboard.razorpay.com/app/webhooks

| Secret | Action | Env vars |
|--------|--------|----------|
| API key secret | Keys → **Regenerate** Key Secret (or create new Live key pair) | `RAZORPAY_KEY_SECRET` |
| Key ID | If new key pair created | `RAZORPAY_KEY_ID`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` |
| Webhook secret | Webhooks → your webhook → **Regenerate secret** | `RAZORPAY_WEBHOOK_SECRET` |

**Webhook URL (must stay):**

```
https://www.dhe.org.in/api/payments/razorpay-webhook
```

**Events:** `payment.captured`, `payment.failed`, `order.paid`

After rotation, send a test payment (₹1) and confirm webhook delivery in Razorpay → Webhooks → Logs.

---

## 3. Google reCAPTCHA

**Console:** https://www.google.com/recaptcha/admin (project: “dhe project”)

| Step | Action |
|------|--------|
| 1 | Create a **new** reCAPTCHA v2/v3 key pair for `www.dhe.org.in` and `dhe.org.in` |
| 2 | Copy Site key → `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` |
| 3 | Copy Secret key → `RECAPTCHA_SECRET_KEY` |
| 4 | Deploy, test contact / feedback / membership forms |
| 5 | Delete or disable the **old** key pair |

---

## 4. Brevo (email / receipts)

**Dashboard:** https://app.brevo.com/settings/keys/smtp  
**API keys:** https://app.brevo.com/settings/keys/api  
**IP security:** https://app.brevo.com/security/authorised_ips

| Secret | Action | Env vars |
|--------|--------|----------|
| **v3 API key** (required on Vercel) | SMTP & API → **API Keys** → Create v3 key | `BREVO_API_KEY` (`xkeysib-…`) |
| SMTP key (local / legacy) | Regenerate SMTP key | `SMTP_PASS` (`xsmtpsib-…`) |
| SMTP login | Usually unchanged | `SMTP_USER` |
| From address | Unchanged | `SMTP_FROM=director@dhe.org.in` |

**Vercel / serverless:** Receipts use the **REST API**, not SMTP. After deploy, open **Brevo → Security → Authorized IPs** and either:

1. **Deactivate** “Blocking unauthorized IP addresses” for **API** (recommended for Vercel — IPs change per request), or  
2. Authorize each blocked IP from the email Brevo sends (not practical long-term on Vercel).

Without this step, production returns `401 unrecognised IP address` even with a valid `BREVO_API_KEY`.

Verify SPF/DKIM for `dhe.org.in` in Brevo → Senders & Domains.

---

## 5. Also rotate (recommended)

| Item | Where | Env var |
|------|-------|---------|
| Admin Basic Auth password | Choose a **new** password (not same as DB password) | `ADMIN_PASSWORD` |
| Admin username | Only if compromised | `ADMIN_USERNAME` |

---

## Post-rotation smoke tests

Run after deploy:

| Test | Expected |
|------|----------|
| `GET https://www.dhe.org.in/api/health` | `{"status":"ok"}` |
| `GET https://www.dhe.org.in/api/notices` | JSON with notices |
| Footer contact form | Submits without reCAPTCHA error |
| `/donation` → Razorpay ₹1 test | Order created; webhook in Razorpay logs |
| `GET /api/health` → `payments.razorpayAuthOk` | `true` (after deploy with payment fixes) |
| `GET /api/admin/payments/diagnostics` (admin login) | No errors; keys aligned |
| Donation receipt email | Received at test inbox |
| `/noticeboarddata` (Basic Auth) | Login works with new admin password |
| `GET /api/admin/notices` with Basic Auth | 200 + notices JSON |

---

## Apply new keys in this repo

1. Edit `dhe.org.in-main/.env.local` — replace only the rotated variables.
2. Run sync + deploy (commands at top).
3. **Never commit** `.env.local`.

When you have the **new** keys ready, paste them in chat (or update `.env.local` yourself) and ask to **sync to Vercel** — we can run `sync-vercel-env.mjs` and redeploy for you.

### “Failed to create Razorpay order” on `/donation`

The app prefers rotated env names (`RAZORPAY_*_NEW`) when present on Vercel.

1. In **Razorpay Dashboard → API Keys**, confirm Live Key ID + Secret are active.
2. In **Vercel**, ensure these are set for **Production** (either canonical or `_NEW` names):
   - `RAZORPAY_KEY_ID` or `RAZORPAY_KEY_ID_NEW`
   - `RAZORPAY_KEY_SECRET` or `RAZORPAY_KEY_SECRET_NEW`
   - `RAZORPAY_WEBHOOK_SECRET` or `RAZORPAY_WEBHOOK_SECRET_NEW`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` (optional — checkout uses server `keyId` from create-order)
3. To copy `_NEW` → canonical names:  
   `npx vercel env run -e production -- node dhe.org.in-main/scripts/promote-razorpay-vercel-env.mjs production`
4. Redeploy, then check `GET /api/health` → `payments.razorpayAuthOk: true`.
5. If `ordersTableReady` is false, run `20260630120000_payments.sql` in Supabase SQL Editor.

---

## Rotation log (fill in when done)

| Service | Rotated on (date) | By | Old key revoked? |
|---------|-------------------|-----|------------------|
| Supabase service role | | | ☐ |
| Supabase DB password | | | ☐ |
| Razorpay API secret | | | ☐ |
| Razorpay webhook secret | | | ☐ |
| reCAPTCHA | | | ☐ |
| Brevo SMTP | | | ☐ |
| Admin password | | | ☐ |
| Sentry auth token | | | ☐ |
