# Optional environment variables

Monitoring and rate limiting work **without** these — Supabase fallbacks are enabled.

## Brevo email (receipts)

Receipt emails use the **Brevo REST API** on Vercel (SMTP is blocked by IP allowlists).

```
BREVO_API_KEY=xkeysib-...   # Brevo → SMTP & API → API Keys → Create v3 key
SMTP_FROM=director@dhe.org.in
SMTP_USER=...               # optional legacy SMTP
SMTP_PASS=xsmtpsib-...        # SMTP key — NOT the same as BREVO_API_KEY
```

If receipts fail with `401` or `unrecognised IP`:

1. **Brevo → Security → Authorized IPs** → deactivate API IP blocking (needed for Vercel), or authorize the blocked IP from Brevo’s email alert.
2. Ensure **`BREVO_API_KEY`** (`xkeysib-…`) is set on Vercel **Production** — not the SMTP key (`xsmtpsib-…`).

Create a **v3 API key** in Brevo → SMTP & API → API Keys, set `BREVO_API_KEY` in `dhe.org.in-main/.env.local`, then:

```powershell
cd dhe.org.in-main
node scripts/sync-vercel-env.mjs production
cd ..
npx vercel deploy --prod --yes
node scripts/test-receipt-resend.mjs
```

**Do not** run bare `vercel env pull` — it defaults to **development** and overwrites local secrets. Use:

```powershell
npx vercel env pull dhe.org.in-main/.env.vercel-backup --environment=production --yes
```

## Optional: Sentry

```
SENTRY_DSN=https://...@....ingest.sentry.io/...
```

When unset, errors are logged to Supabase `error_logs` and viewable at `GET /api/admin/errors`.

## Optional: Upstash Redis

```
UPSTASH_REDIS_REST_URL=https://....upstash.io
UPSTASH_REDIS_REST_TOKEN=...
```

When unset, rate limits use Supabase `rate_limit_buckets` (distributed across instances).

## Optional: Google Analytics 4

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Loaded only after cookie consent (`CookieConsent.tsx`). Omit in development unless testing analytics.

## Required for admin routes (production)

```
ADMIN_USERNAME=your-username
ADMIN_PASSWORD=your-strong-password
```

Set in Vercel → Project → Settings → Environment Variables (all environments).

## Secret rotation

Rotate keys that were shared in chat: Supabase service role, Razorpay, reCAPTCHA, Brevo SMTP, admin password.
