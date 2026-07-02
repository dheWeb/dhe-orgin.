# DHE website — disaster recovery runbook (stub)

**Last updated:** 30 June 2026  
**Production:** https://www.dhe.org.in  
**Repo:** `dheWeb/dhe-orgin.` (branch `main`)

## 1. Incident classification

| Severity | Example | Response |
|----------|---------|----------|
| P0 | Site down, payments broken, data leak | Page on-call, rotate secrets, rollback deploy |
| P1 | Forms failing, admin inaccessible | Fix env / Supabase / redeploy |
| P2 | Broken PDF link, CMS typo | Content fix + redeploy |

## 2. Quick health checks

```bash
curl -s https://www.dhe.org.in/api/health
curl -s -o /dev/null -w "%{http_code}" https://www.dhe.org.in/
```

## 3. Rollback (Vercel)

1. Vercel → Project `dhe-orgin-ctai` → Deployments
2. Promote last known-good deployment to Production
3. Verify `/api/health`, donation test ₹1, receipt email

## 4. Database (Supabase)

- **Backups:** Supabase dashboard → Database → Backups (verify schedule)
- **Migrations:** `node scripts/apply-migration.mjs <filename.sql>` from `dhe.org.in-main/`
- **Bootstrap content:** `npm run seed:bootstrap` (idempotent)

## 5. Secrets rotation

See `docs/secret-rotation-runbook.md` and `npm run check-rotation`.

Rotate in order: Razorpay webhook secret → Supabase service role → Brevo → reCAPTCHA → redeploy.

## 6. Asset recovery

If `public/` assets lost:

```bash
cd dhe.org.in-main
npm run sync:assets
```

Owner must re-upload 80G/12A PDFs if not on production (see `docs/asset-upload-checklist.md`).

## 7. Contacts

- **DHE office:** director@dhe.org.in / 7903431900
- **Hosting:** Vercel team `dhe-projects`
- **Payments:** Razorpay dashboard webhook logs

## 8. Post-incident

- [ ] Root cause in GitHub issue
- [ ] Update `docs/production-checklist.md`
- [ ] Re-run smoke tests (donation, contact form, notices)
