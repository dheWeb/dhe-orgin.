# Deploying dhe.org.in

Production: **https://www.dhe.org.in**  
Vercel project: **`dhe-orgin-ctai`** (not `tejas`)

TEJAS is a separate repo: https://github.com/dheWeb/tejas → https://tejas.dhe.org.in

## Safe deploy (DHE only)

From monorepo root (recommended — matches Git auto-deploy):

```bash
npx vercel deploy --prod --yes
```

Requires `.vercel/project.json` at repo root pointing to `dhe-orgin-ctai`.

Alternative — from app directory:

```bash
cd dhe.org.in-main
npx vercel deploy --prod --yes
```

Both must use project **`dhe-orgin-ctai`**, never **`tejas`**.

## Do not

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
