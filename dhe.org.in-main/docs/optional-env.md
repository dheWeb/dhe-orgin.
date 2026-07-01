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
NEXT_PUBLIC_SENTRY_DSN=https://...@....ingest.us.sentry.io/...
SENTRY_DSN=https://...@....ingest.us.sentry.io/...   # same DSN (server)
SENTRY_AUTH_TOKEN=...                                 # build-time source maps (Vercel only)
SENTRY_ORG=rase-co-in
SENTRY_PROJECT=rase-monitoring-l1
```

When unset, errors are logged to Supabase `error_logs` and viewable at `GET /api/admin/errors`.

Sync from local (after exporting vars in your shell):

```powershell
cd dhe.org.in-main
$env:NEXT_PUBLIC_SENTRY_DSN="https://..."
$env:SENTRY_AUTH_TOKEN="..."
$env:SENTRY_ORG="rase-co-in"
$env:SENTRY_PROJECT="rase-monitoring-l1"
node scripts/sync-sentry-env.mjs
npx vercel deploy --prod --yes
```

Vercel log drains / OTLP are configured in the Sentry ↔ Vercel integration UI, not in app env.

## Upstash Redis (not used on this project)

**Decision:** Upstash is **not provisioned**. Vercel’s Upstash integration has no free tier (`--plan free` fails); pay-as-you-go starts at usage billing.

**Production rate limiting** uses Supabase `rate_limit_buckets` (see `src/lib/security/rate-limit.ts`). No `UPSTASH_*` env vars are required.

If you add Upstash later (paid plan only):

```
UPSTASH_REDIS_REST_URL=https://....upstash.io
UPSTASH_REDIS_REST_TOKEN=...
```

The SDK will prefer Upstash when both vars are set; otherwise Supabase is used automatically.

## Optional: Google Analytics 4

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-VZ55ESSK6V
```

Loaded only after cookie consent (`CookieConsent.tsx`). Omit in development unless testing analytics.

Sync:

```powershell
$env:NEXT_PUBLIC_GA_MEASUREMENT_ID="G-VZ55ESSK6V"
node scripts/sync-optional-env.mjs
```

## Required for admin routes (production)

```
ADMIN_USERNAME=your-username
ADMIN_PASSWORD=your-strong-password
```

Set in Vercel → Project → Settings → Environment Variables (all environments).

## Secret rotation

Rotate keys that were shared in chat: Supabase service role, Razorpay, reCAPTCHA, Brevo SMTP, admin password.
