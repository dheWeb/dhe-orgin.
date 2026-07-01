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

If receipts fail: create a **v3 API key** (`xkeysib-`) and set `BREVO_API_KEY` in `.env.local`, then sync to Vercel.

Optional SMTP-only path: Brevo → Transactional → Settings → disable **Authorized IPs** for SMTP relay.

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

## Required for admin routes (production)

```
ADMIN_USERNAME=your-username
ADMIN_PASSWORD=your-strong-password
```

Set in Vercel → Project → Settings → Environment Variables (all environments).

## Secret rotation

Rotate keys that were shared in chat: Supabase service role, Razorpay, reCAPTCHA, Brevo SMTP, admin password.
