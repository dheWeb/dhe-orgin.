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

## 4. Brevo (SMTP)

**Dashboard:** https://app.brevo.com/settings/keys/smtp

| Secret | Action | Env vars |
|--------|--------|----------|
| SMTP key | SMTP & API → **Regenerate** SMTP key | `SMTP_PASS` |
| SMTP login | Usually unchanged | `SMTP_USER` |
| Relay | Unchanged | `SMTP_HOST=smtp-relay.brevo.com`, `SMTP_PORT=587` |
| From address | Unchanged | `SMTP_FROM=director@dhe.org.in` |

Verify SPF/DKIM for `dhe.org.in` in Brevo → Senders & Domains so receipt emails don’t bounce.

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
| Donation receipt email | Received at test inbox |
| `/noticeboarddata` (Basic Auth) | Login works with new admin password |
| `GET /api/admin/notices` with Basic Auth | 200 + notices JSON |

---

## Apply new keys in this repo

1. Edit `dhe.org.in-main/.env.local` — replace only the rotated variables.
2. Run sync + deploy (commands at top).
3. **Never commit** `.env.local`.

When you have the **new** keys ready, paste them in chat (or update `.env.local` yourself) and ask to **sync to Vercel** — we can run `sync-vercel-env.mjs` and redeploy for you.

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
