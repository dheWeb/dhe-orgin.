# Staging environment (AUD-220 / I5-09)

Use a separate Supabase project and Vercel preview deployment before promoting schema or CMS changes to production.

## 1. Supabase staging

1. Create a new project in [Supabase Dashboard](https://supabase.com/dashboard).
2. Run all files in `supabase/migrations/` in order in the SQL Editor.
3. Copy production `site_content` rows if you need realistic CMS data (optional).

## 2. Vercel preview

Set these in **Preview** environment (not Production):

| Variable | Notes |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Staging project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Staging anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Staging service role |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Razorpay **test** keys |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Staging admin gate |
| `BREVO_API_KEY` | Optional test sender |

## 3. Smoke test on preview URL

- `GET /api/health` → `ok`
- Donation flow with ₹1 test payment
- Admin login → CMS save
- `npm run build` in CI (already runs on PR)

## 4. Promote to production

Apply the same migration SQL to production Supabase, then merge to `main` for Vercel production deploy.
