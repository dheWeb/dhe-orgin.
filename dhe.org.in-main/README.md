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

1. Import the GitHub repo in Vercel.
2. Set **Root Directory** to `dhe.org.in-main` (or use the root `vercel.json` which builds that folder).
3. Set **Node.js** to **20.x**.
4. Add environment variables from `.env.example` (Production + Preview as needed).
5. Attach custom domains `www.dhe.org.in` and `dhe.org.in`.

### Required env vars (non-Firebase)

| Variable | Purpose |
|----------|---------|
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | HTTP Basic Auth for `/WD`, `/donationdatadekh`, `/noticeboarddata`, `/api/sendMail` |
| `SMTP_USER` / `SMTP_PASS` | Workshop invitation emails |

Admin routes return **503** in production if `ADMIN_*` is missing.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |

## Stack

Next.js 15 (App Router), TypeScript, Tailwind CSS, Ant Design, Firebase client SDK.
