# DHE Website (Next.js)

Official website for the Department of Holistic Education — [dhe.org.in](https://www.dhe.org.in).

## Local development

```bash
cd dhe.org.in-main
cp .env.example .env.local
# Fill in ADMIN_*, SMTP_*, and Firebase values in .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

This repo is a monorepo. The Next.js app lives in **`dhe.org.in-main/`**.

### Use one Vercel project only

Keep **`dhe-orgin-ctai`** (domain `www.dhe.org.in`) as production. Delete the duplicate **`dhe-orgin`** project if it still exists — both deploy on every push and double your build + image optimization usage.

1. Import the GitHub repo in Vercel (or use existing `dhe-orgin-ctai`).
2. Set **Root Directory** to `dhe.org.in-main` (or use the root `vercel.json` which builds that folder).
3. Set **Node.js** to **20.x** (20.19+ recommended).
4. Add environment variables from `.env.example` (Production + Preview as needed).
5. Attach custom domains `www.dhe.org.in` and `dhe.org.in`.

### Required env vars

| Variable | Purpose |
|----------|---------|
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | HTTP Basic Auth for `/WD`, `/donationdatadekh`, `/noticeboarddata`, `/api/sendMail` |
| `SMTP_USER` / `SMTP_PASS` | Workshop invitation emails |
| `NEXT_PUBLIC_NOTICE_ADMIN_EMAILS` | Google sign-in allowlist for `/noticeboarddata` |
| `NEXT_PUBLIC_FIREBASE_*` | Recommended for production (overrides baked-in dev defaults) |

Admin routes return **503** in production if `ADMIN_*` is missing.

Image optimization is disabled on Vercel (`images.unoptimized`) to stay within Hobby plan limits; assets are served from `/public` via the CDN.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |

## Stack

Next.js 15 (App Router), TypeScript, Tailwind CSS, Ant Design, Firebase client SDK.
