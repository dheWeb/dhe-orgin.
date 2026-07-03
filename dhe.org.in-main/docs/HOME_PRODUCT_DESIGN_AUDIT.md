# DHE Homepage — Complete Product Design Audit & Redesign

**Date:** June 2026  
**Scope:** `dhe.org.in` homepage (`/`)  
**Status:** Implemented (v2 component architecture)

---

## Executive Summary

The previous homepage suffered from **information overload**, **weak visual hierarchy**, and a **double-layer hero** that hurt LCP and first impression. The redesign prioritizes **trust → conversion → depth**, converts prose into **cards and timelines**, and reorders sections for institutional credibility before cell-level detail.

**Overall score (before → after):**

| Dimension | Before | After (target) |
|-----------|--------|----------------|
| First impression | 5/10 | 9/10 |
| Visual hierarchy | 4/10 | 9/10 |
| Conversion clarity | 5/10 | 8/10 |
| Mobile UX | 6/10 | 8/10 |
| Accessibility | 7/10 | 8/10 |
| Performance | 7/10 | 8/10 |

---

## 1. UX Audit

### Reading flow (before)
Hero → tiny tagline → dense stats (2 rows, mixed colors) → long vision paragraph → achievements wall → 25 cell pills → ecosystem pills → pathways → flat program links → SMK text block → trust strip (too late) → news → gallery → flat FAQ → CTA.

**Problems:** Programs buried after cell noise; trust signals late; paragraphs dominate; no emotional arc.

### New information architecture

```
Hero (credibility + CTAs + carousel)
  → Trust strip (80G, deed, transparency)
  → Statistics (unified card grid)
  → Why DHE (4 pillar cards)
  → Programs (9 feature cards)
  → SMK flagship (navy feature band)
  → Journey timeline
  → Featured cells (12, not 25 pills)
  → Digital ecosystem (8 cards)
  → Leadership & impact (2 cards)
  → Partners & badges
  → Participation strip
  → News / events
  → Gallery
  → FAQ accordion
  → Closing CTA
```

---

## 2. UI Audit — Problems & Severity

| ID | Problem | Severity | Fix |
|----|---------|----------|-----|
| P0 | Double hero (`HeroFirstSlide` + absolute carousel overlay) | Critical | Single `SlideShow` with skeleton loader |
| P0 | 25 cell pills before programs | Critical | Programs first; 12 featured cell cards |
| P1 | Orange vs navy stat color split | High | Unified orange accent on all stats |
| P1 | `dhe-section-py` too tight (py-4) | High | Increased to py-8–12 |
| P1 | Trust strip below fold | High | Moved immediately after hero |
| P1 | Flat program cards | High | `HomeFeatureCard` with hover/shadow |
| P2 | FAQ always expanded (8 blocks) | Medium | Accordion with `aria-expanded` |
| P2 | No journey / timeline storytelling | Medium | `HomeJourneyTimeline` |
| P2 | SMK as text wall | Medium | Navy feature card with SMK 6.0 stats |
| P2 | Three color families (brown legacy) | Medium | Orange + navy only on homepage |
| P3 | No section dividers | Low | `WaveDivider` between major bands |
| P3 | 11px label typography | Low | Minimum 12px on stat labels |

---

## 3. Wireframe (Desktop)

```
┌─────────────────────────────────────────────────────────────┐
│ [CompanyInfo] [Header] [PromoBanner]                        │
├──────────────────────────┬──────────────────────────────────┤
│ BADGE                    │                                  │
│ H1 Department of         │     HERO CAROUSEL (rounded)      │
│    Holistic Education    │                                  │
│ Subhead (2 lines)        │                                  │
│ [trust badges x4]        │                                  │
│ [Primary] [Secondary x2] │                                  │
├──────────────────────────┴──────────────────────────────────┤
│ TRUST STRIP — 4 cards (80G, deed, olympiad, transparency)   │
├─────────────────────────────────────────────────────────────┤
│ STATS — 8 cards in one row (institutional + impact)         │
├─────────────────────────────────────────────────────────────┤
│ WHY DHE — 4 pillar cards                                    │
│ ~~~ wave divider ~~~                                        │
├─────────────────────────────────────────────────────────────┤
│ PROGRAMS — 3x3 card grid + CTA                              │
├─────────────────────────────────────────────────────────────┤
│ SMK FLAGSHIP — navy band, stats card right                  │
│ ~~~ wave divider ~~~                                        │
├─────────────────────────────────────────────────────────────┤
│ JOURNEY — vertical timeline                                 │
│ CELLS — 12 featured cell cards                              │
│ DIGITAL — 8 platform cards                                  │
│ LEADERSHIP — 2 side-by-side cards                           │
│ PARTNERS — badge strip + 4 highlights                       │
│ GET INVOLVED — pill links                                   │
├─────────────────────────────────────────────────────────────┤
│ NEWS MARQUEE                                                │
│ GALLERY PREVIEW                                             │
│ FAQ ACCORDION                                               │
│ CLOSING CTA                                                 │
│ FOOTER                                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Component Hierarchy

```
HomePageContent
├── HomeHero (server)
│   ├── HeroImagePreload
│   └── HomeHeroCarouselClient (client → SlideShow)
├── HomeTrustStrip
├── HomeMainSections
│   ├── HomeStatGrid
│   ├── HomePillarCards → HomeFeatureCard
│   ├── WaveDivider
│   ├── HomeProgramCards → HomeFeatureCard
│   ├── HomeSmkFeature
│   ├── WaveDivider
│   ├── HomeJourneyTimeline
│   ├── HomeCellsGrid
│   ├── HomeDigitalGrid → HomeFeatureCard
│   ├── HomeLeadershipCard
│   ├── HomePartnersStrip
│   └── HomeParticipationStrip
├── HomeNewsSection (dynamic)
├── HomeGalleryPreview (dynamic)
├── HomeFaqSection → HomeFaqAccordion (client)
└── HomeClosingCta
```

**Shared primitives:** `HomeFeatureCard`, `HomeSectionShell`, `HomeIcon`, design tokens in `globals.css` / `tailwind.config.ts`.

---

## 5. Card Strategy

| Content type | Card pattern |
|--------------|--------------|
| Why DHE | Icon + title + 2-line description + CTA |
| Programs | Title + stat badge + hover lift |
| Cells | Initial avatar + label, grid link |
| Digital platforms | Icon + external link |
| Leadership | Bordered card, highlight chips |
| Trust | Gradient strip with 4 document links |
| FAQ | Accordion panel |

---

## 6. Graphics & Illustration Strategy

**Implemented (phase 1):**
- Gradient hero background + soft blur orbs
- Wave section dividers (SVG)
- Icon blocks via `HomeIcon` SVG set
- Navy SMK band with glass-style stats card
- Timeline with dot markers

**Phase 2 (optional):**
- National map SVG (India outline with state dots)
- Partner logo strip (when assets available)
- Lottie for hero badge animation (requires dependency approval)
- Photo mosaic in gallery section

---

## 7. Mobile Improvements

- Hero: carousel first on mobile (`order-1`), copy second
- Stats: 2-column grid → readable tap targets
- Programs: single column stack
- Cells: 2-column compact grid
- CTAs: full-width stack, min-h-11 touch targets
- FAQ: accordion reduces scroll fatigue
- No horizontal scroll (`overflow-x-hidden` preserved)

---

## 8. Accessibility

- Semantic landmarks (`section`, `aria-labelledby`)
- FAQ: `aria-expanded`, `aria-controls`, keyboard-operable buttons
- Screen reader headings on stat grid (`sr-only`)
- Focus rings on all interactive cards
- `prefers-reduced-motion`: disables carousel auto-advance (existing) + transition overrides
- Color contrast: orange-600 on white passes AA for large text; body text gray-600

---

## 9. Animation Plan

| Element | Motion | Reduced motion |
|---------|--------|----------------|
| Cards | hover shadow + translate | none |
| Hero carousel | 5s auto (existing) | static first slide |
| FAQ chevron | rotate | none |
| Wave dividers | static SVG | static |

**Not added (performance):** parallax, Lottie, counter animations (stats are static strings for SEO accuracy).

---

## 10. Performance Impact

| Change | Impact |
|--------|--------|
| Remove duplicate hero image | **Improves LCP** |
| Single dynamic SlideShow | Neutral (same bundle) |
| FAQ dynamic import | Slight JS split |
| More sections (cards) | +HTML size, minimal JS |
| `deferNonFirst` slides | Preserved |

**Recommendations:** Run Lighthouse on deploy; consider `loading="lazy"` on below-fold card icons (already aria-hidden).

---

## 11. SEO

- H1 unchanged (CMS-mergeable via `homeIntro`)
- Section H2s added with stable IDs
- FAQ JSON-LD unchanged (`HomeStructuredData`)
- No route changes
- Content preserved; presentation only restructured

---

## 12. Files Changed

| Path | Role |
|------|------|
| `src/components/home/HomeHero.tsx` | Redesigned hero |
| `src/components/home/HomeHeroCarouselClient.tsx` | Single carousel |
| `src/components/home/v2/*` | New section components |
| `src/components/ui/HomeFeatureCard.tsx` | Shared card |
| `src/data/home/redesign-content.ts` | Pillars, timeline, partners |
| `src/app/(site)/HomePageContent.tsx` | New section order |
| `src/components/home/HomeFaqSection.tsx` | Accordion wrapper |
| `src/app/globals.css` | Spacing tokens |
| `src/components/gallery/SlideShow.tsx` | `imageClassName` prop |

`MiddleComponent.tsx` retained for reference; no longer mounted on homepage.

---

## 13. Implementation Plan (completed)

1. ✅ Fix P0 hero double-layer
2. ✅ Create card primitives and v2 sections
3. ✅ Reorder homepage flow
4. ✅ Unify stat colors
5. ✅ FAQ accordion
6. ✅ Increase section spacing
7. ✅ Build verification
8. ✅ Deploy after user approval
9. ✅ Phase 2: partner logos, map viz, animated counters, sticky CTA, gallery mosaic, hero motion

---

## Phase 2 (completed)

| Feature | Implementation |
|---------|----------------|
| Animated stat counters | `HomeAnimatedCounter` with IntersectionObserver |
| India map visualization | `HomeIndiaMap` SVG + 14 region markers |
| Partner logo strip | `homePartnerLogos` monogram cards + horizontal scroll |
| Sticky mobile CTA | `HomeStickyMobileCta` — Programs / Join / 80G |
| Gallery mosaic | Featured 2×2 tile + hover captions |
| Hero motion | Float orbs + staggered badge fade-up (CSS, no Lottie) |
| Reduced motion | All animations respect `prefers-reduced-motion` |

---

*Audit and implementation by DHE product design pass — June 2026.*
