# Deploying dhe.org.in

Production: **https://www.dhe.org.in**  
Vercel project: **`dhe-orgin-ctai`** (not `tejas`)

TEJAS is a separate repo: https://github.com/dheWeb/tejas → https://tejas.dhe.org.in

## Critical: `VERCEL_PROJECT_ID` env var

If your shell has `VERCEL_PROJECT_ID` set (often to the **tejas** project after linking that repo), **every** `vercel deploy` from any directory will go to tejas — even with `--project dhe-orgin-ctai`. That has overwritten `tejas.dhe.org.in` with DHE content.

Before deploying DHE, either unset it or override:

```powershell
# PowerShell — deploy DHE only
$env:VERCEL_PROJECT_ID = "prj_ydZ9PtWd6ZxBTacnCWw0s8wzU8a6"
cd c:\Users\Admin\Desktop\dhe-orgin.-main
npx vercel deploy --prod --yes
```

```powershell
# PowerShell — deploy TEJAS only (use tejas project id from Vercel dashboard)
Remove-Item Env:VERCEL_PROJECT_ID -ErrorAction SilentlyContinue
cd c:\Users\Admin\Desktop\tejas
npx vercel link --project tejas --yes
npx vercel deploy --prod --yes
```

**Preferred:** use **Git push** for DHE (`dhe-orgin-ctai` auto-deploy) and **CLI only from `tejas/`** for TEJAS.

## Safe deploy (DHE only)

From monorepo root (matches Git auto-deploy when `VERCEL_PROJECT_ID` is unset or set to dhe-orgin-ctai):

```bash
npx vercel deploy --prod --yes
```

Requires `.vercel/project.json` at repo root pointing to `dhe-orgin-ctai`.

Alternative — push to GitHub (safest for DHE):

```bash
git push origin main
```

## Do not

- Deploy from `dhe-orgin.-main` while `VERCEL_PROJECT_ID` points to **tejas**
- Deploy from `dhe.org.in-main` while linked to the `tejas` Vercel project
- Keep a nested `dhe.org.in-main/tejas/` copy (removed — use the standalone repo)

## Post-deploy checks

```bash
cd dhe.org.in-main
npm run launch-audit
npm run post-launch -- --skip-email
npm run smoke:prod
```

## Google Search Console

See `dhe.org.in-main/docs/LAUNCH_CHECKLIST.md`

For TEJAS subdomain, use **URL prefix** property `https://tejas.dhe.org.in` (not Domain property). Submit `sitemap.xml`, then use URL Inspection if status shows "Couldn't fetch" on first submit.
