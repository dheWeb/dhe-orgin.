# TEJAS Platform

**Talent Evaluation & Joint Assessment Series**

Independent frontend for [tejas.dhe.org.in](https://tejas.dhe.org.in) — India's National Talent Development Ecosystem by the Department of Holistic Education (DHE).

## Architecture

TEJAS is engineered as a **standalone product**, separate from the main `dhe.org.in` website. This repository must never import code from the DHE main site.

```
tejas/
├── app/              # Next.js App Router pages
├── components/       # Shared UI components
├── features/         # Feature-specific sections
├── design-system/    # Design tokens
├── data/             # Typed mock data (Phase 0)
├── config/           # SEO, navigation
├── hooks/
├── lib/
└── types/
```

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons
- shadcn/ui-style components

## Development

```bash
cd tejas
npm install
npm run dev
```

Runs on [http://localhost:3001](http://localhost:3001) (port 3001 to avoid conflict with DHE main site).

## Build

```bash
npm run build
npm start
```

## Deployment

Deploy as a **separate Vercel project** with root directory set to `tejas/`:

1. Create new Vercel project linked to this repo (or a dedicated TEJAS repo)
2. Set root directory: `tejas`
3. Configure domain: `tejas.dhe.org.in`

## Phase 0 Scope

- ✅ 16 pages with mock data
- ✅ Design system & reusable components
- ✅ Responsive, accessible UI
- ✅ SEO metadata
- ❌ No backend, auth, payments, or APIs

## Pages

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/about` | About TEJAS |
| `/olympiads` | Olympiads landing |
| `/olympiads/[slug]` | Olympiad detail |
| `/editions` | Current editions |
| `/editions/previous` | Previous editions |
| `/prepare` | Prepare hub |
| `/prepare/mock-tests` | Mock tests |
| `/resources` | Resources hub |
| `/schools` | Schools |
| `/rankings` | Rankings |
| `/hall-of-fame` | Hall of Fame |
| `/scholarships` | Scholarships |
| `/faq` | FAQ |
| `/contact` | Contact |

## License

© Department of Holistic Education, India
