# DHE Website (Next.js)

Official website for the Department of Holistic Education — [www.dhe.org.in](https://www.dhe.org.in).

## Local development

```bash
cd dhe.org.in-main
cp .env.example .env.local
# Fill in ADMIN_*, Supabase, Razorpay, reCAPTCHA, Brevo (see .env.example)
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Related products

**TEJAS** (Talent Evaluation & Joint Assessment Series) is a separate product and repository:

- Site: [tejas.dhe.org.in](https://tejas.dhe.org.in)
- Repo: [github.com/dheWeb/tejas](https://github.com/dheWeb/tejas)

Do not import TEJAS code into this codebase.

## Deploy on Vercel

Monorepo root contains `vercel.json` that builds `dhe.org.in-main/`.
Production project: **`dhe-orgin-ctai`** → `www.dhe.org.in`.

1. Link repo to Vercel (root directory = monorepo root).
2. Node.js **20.x**.
3. Copy env vars from `.env.example` into Vercel (Production + Preview).
4. Domains: `www.dhe.org.in`, `dhe.org.in`.

### Required env vars

| Variable | Purpose |
|----------|---------|
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | HTTP Basic Auth for `/admin`, `/WD`, `/donationdatadekh`, etc. |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Supabase client |
| `SUPABASE_SERVICE_ROLE_KEY` | Server APIs, admin, webhooks |
| `RAZORPAY_*` / `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Donations & membership payments |
| `RECAPTCHA_*` / `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Form spam protection |
| `BREVO_API_KEY` + `SMTP_FROM` | Receipt emails (Brevo REST API) |

Optional: `SENTRY_DSN`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Rate limits use Supabase (Upstash not used — no free Vercel plan).

**Firebase is retired** — do not set `NEXT_PUBLIC_FIREBASE_*`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run test` | Unit tests (Vitest) |
| `npm run seed:bootstrap` | Seed starter notices + CMS in Supabase |
| `node scripts/sync-vercel-env.mjs production` | Push `.env.local` secrets to Vercel |

## Stack

Next.js 15 (App Router), TypeScript, Tailwind CSS, Supabase (Postgres + Storage), Razorpay, Brevo email.
