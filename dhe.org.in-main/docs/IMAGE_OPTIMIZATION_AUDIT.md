# Image optimization audit (P1)

## Scope

- `public/2024K/` — homepage hero slideshow sources
- `public/cells/` — cell slideshow assets (`art`, `event` cells)

## Workspace note

Image binaries are not present in this development tree (or live outside the repo). **No binary recompression was applied** in this sprint to avoid breaking missing assets.

## Code-level optimizations applied

1. **`SlideShow` / `HomeHeroCarousel`** — `next/image` with `priority` on first slide, `sizes="(max-width: 1024px) 100vw, 58vw"`, AVIF/WebP via `next.config.js`.
2. **LCP fallback** — `HeroLcpImage` renders in dynamic `loading` state before carousel hydrates.
3. **Cell registry** — descriptive `alt` text for all slideshow images in `registry.json`.

## Recommended hosting/CDN actions (ops)

| Action | Target |
|--------|--------|
| Compress JPEGs to &lt; 200 KB | `public/2024K/*.jpg`, `*.jpeg` |
| Resize max width 1600px | Hero and cell slideshow sources |
| Prefer WebP/AVIF source files | Upload alongside JPEG fallbacks |
| Set explicit width/height in registry if dimensions known | Future enhancement |

## Verification

After deploying assets, run Lighthouse on `/` and `/cells/art` and confirm LCP &lt; 2.5s on mobile.
