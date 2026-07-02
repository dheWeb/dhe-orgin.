# DHE public asset upload checklist

Use this when closing **AUD-123–131** (missing PDFs, hero images, cell slides, workshop assets).

The git `public/` folder in this repo is intentionally minimal. Production at https://www.dhe.org.in may serve assets from Vercel or an external CDN. Upload missing files to **`dhe.org.in-main/public/`** (preserve paths below) and redeploy.

## Priority P0 — legal & donations

| Path | Used by | Notes |
|------|---------|--------|
| `public/accounts/80g-vbitr-trust.pdf` | Donation page, Accounts | 80G certificate |
| `public/accounts/12a-vbitr-trust.pdf` | Donation page, Accounts | 12A registration |
| `public/accounts/dhe.pdf` | Accounts page QR card | DHE bank QR |
| `public/accounts/sm.pdf` | Accounts page | Shiksha Mahakumbh account QR |
| `public/accounts/sm.png` | Accounts page thumbnail | |
| `public/lmc/letter-12-*.pdf` | Leadership page | Current LMC letter (Letter 12) |
| `public/lmc/letter-01-*.pdf` | Committee/history links | Coordinator letter (optional) |

## Priority P1 — brand & homepage

| Path | Used by |
|------|---------|
| `public/logo.webp` | Header, notices fallback, OG |
| `public/dhe.webp` | Favicon |
| `public/logo.png` | Legacy redirect target |
| `public/2024K/k1.webp`, `k4.webp`, `k6.webp`, `up_cm.webp` | Home gallery, notices seed |
| `public/new.gif` | Marquee (if re-enabled) |

## Priority P1 — cell slide images

All paths under `public/cells/**` referenced in `src/data/cells/registry.json`. Run locally after upload:

```bash
cd dhe.org.in-main
npm run optimize-images
```

Key folders (25 cells): `artcell/`, `eventmanagementcell/`, `rdcell/`, etc. — match each `slides[].src` in registry.

## Priority P2 — programs & workshops

| Path | Used by |
|------|---------|
| `public/14.webp` – `public/17.webp` | Workshop carousel |
| `public/Proceeding.pdf` | Books / Journals |
| `public/Recruitment-Policy.pdf` | Header → Careers |
| `public/residentialcamps/*.pdf` | Residential camps page |

## Priority P2 — logos & ecosystem

| Path | Used by |
|------|---------|
| `public/logos/dhe.webp` | Accounts, footer ecosystem |
| `public/logos/*.webp` | Footer ecosystem grid (Tredul, Sarvatra, etc.) |

## Verification after upload

1. `npm run build` — no broken static imports
2. Spot-check URLs: `/accounts/80g-vbitr-trust.pdf`, `/logo.webp`, one cell slideshow
3. Lighthouse — LCP on `/` should improve once hero WebP exists
4. Donation flow — 80G PDF links return 200

## Optional: Supabase Storage

Notices admin may upload notice images to Supabase Storage; paths stored in `notices.image_path`. Ensure bucket public URLs resolve via `resolveNoticeImageUrl`.

---

**Owner action:** Provide a zip of institutional PDFs + photography to upload, or confirm assets already live on Vercel and only need to be committed to git for DR.
