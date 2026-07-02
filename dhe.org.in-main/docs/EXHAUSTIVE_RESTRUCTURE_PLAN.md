# DHE Website — Exhaustive Audit Register & Complete Restructure Plan

**Site:** https://www.dhe.org.in  
**Entity:** Department of Holistic Education (DHE) — national platform, 25+ cells, Vidya Bharti / VBITR Trust  
**Document purpose:** Every audited issue (no “top N” lists) + every redesign action + CMS + Supabase + Razorpay + SMTP  
**Status:** Implementation ~94% complete (see `production-checklist.md` for live gates)  
**Last updated:** 2026-06-30 (post owner-free batch c53b3d3+)

---

## Implementation status (synced 30 Jun 2026)

| Area | Done | Remaining (owner / future) |
|------|------|----------------------------|
| Firebase, Jodo, eval | Yes | Firebase console disable |
| Razorpay + webhooks | Yes | Live ₹1 test on prod |
| Donation + membership receipts | Yes | Hindi copy approval |
| CMS 25 keys | Yes | Full relational §B.3 schema |
| Admin Supabase login | Yes | RBAC roles, retire Basic Auth |
| Admin canonical URLs + settings | Yes | — |
| Form ack emails + GA4 events | Yes | — |
| Legal, privacy, refund, transparency, a11y page | Yes | Lighthouse 95/100 sign-off |
| `/programs`, `/events`, `/search`, `/leadership` + LMC timeline | Yes | Full Hindi site |
| Cells (25) | JSON overrides | Full cell CMS editor |
| OpenAPI stub | Yes (`/api/openapi`) | Full spec |

**Live tracker:** `docs/production-checklist.md`

---

| Section | Contents |
|---------|----------|
| **§A** | Target architecture (final state) |
| **§B** | CMS — full specification |
| **§C** | Complete audit register **AUD-001 … AUD-280** (every small item) |
| **§D** | Page-by-page redesign matrix (all routes) |
| **§E** | Component & file retirement/replace matrix |
| **§F** | Firebase → Supabase migration (field-level) |
| **§G** | Payments (Razorpay only — **Jodo removed**) |
| **§H** | Receipts, SMTP, Hindi thanks |
| **§I** | Implementation phases — **full task checklists** |
| **§J** | Env variables (complete map) |
| **§K** | Success criteria (every gate) |

Cross-reference IDs: **AUD-xxx** = problem; **FIX-xxx** = matching solution in §D–§I.

---

## §A — Target architecture (final state)

```
┌─────────────────────────────────────────────────────────────────┐
│  dhe.org.in  (Next.js 15 App Router, Vercel bom1)               │
├─────────────────────────────────────────────────────────────────┤
│  Public site (RSC/SSG)     │  /admin/* (auth required)          │
│  - programs, cells, LMC    │  - CMS editor                      │
│  - notices (ISR)           │  - notices CRUD                    │
│  - donate/join/register    │  - finance exports                 │
│  - contact/feedback        │  - media library                   │
├────────────────────────────┴────────────────────────────────────┤
│  API Routes (server-only)                                         │
│  - /api/payments/razorpay/*  (order, verify, webhook)             │
│  - /api/forms/*  (contact, feedback + reCAPTCHA + rate limit)     │
│  - /api/receipts/[id]/pdf    (download)                           │
│  - /api/visitors             (Upstash increment)                  │
│  - /api/health                                                     │
├─────────────────────────────────────────────────────────────────┤
│  Supabase: Postgres + Storage + Auth + RLS                        │
│  Upstash: rate limits + visitor counters                          │
│  Razorpay: donations, membership, paid registrations              │
│  SMTP: receipts, Hindi thanks, admin alerts                       │
│  Sentry: errors + performance                                     │
│  reCAPTCHA v3: all public POST                                    │
└─────────────────────────────────────────────────────────────────┘

REMOVED ENTIRELY: Firebase SDK, Firestore, Firebase Auth, Firebase Storage, Jodo
```

### Design principles

1. **DHE-first** — Shiksha Mahakumbh is one program among many, not the homepage spine.  
2. **No client database writes** — all mutations via server actions / API + service role.  
3. **CMS for editorial** — copy, notices, events, leadership, programs; code for layout/components.  
4. **One institution record** — `site_settings` + `receipt-and-lmc.ts` seed, editable in CMS.  
5. **Trust on every donation** — VBITR Trust legal name, PAN, 80G, Razorpay receipt, email.  
6. **No public PII directories** — membership roster admin-only.  
7. **Hindi + English** where legally and culturally required (receipts, thanks, key notices).

---

## §B — CMS specification (full)

### B.1 CMS approach

| Option | Decision |
|--------|----------|
| Firebase | **Retired** |
| Jodo | **Retired** |
| Headless CMS + Supabase | **Yes** — custom admin at `/admin/cms` backed by Supabase tables |
| Optional later | Payload 3 or Directus on same Postgres if editors need richer WYSIWYG |

**Phase 1 CMS:** Supabase tables + Next.js admin UI (Ant Design scoped to `/admin` only).  
**Phase 2 CMS:** Rich text (Tiptap), media picker, preview, revision history.

### B.2 CMS roles

| Role | Permissions |
|------|-------------|
| `super_admin` | All + users + site settings |
| `content_editor` | Pages, programs, cells copy, events |
| `notice_editor` | Notices only |
| `finance` | View donations/memberships, export, no CMS |
| `readonly` | Preview drafts |

Auth: **Supabase Auth** (email + magic link or Google for `@dhe.org.in` / allowlist).

### B.3 CMS content types (every entity)

#### `site_settings` (singleton)

| Field | Source today | Notes |
|-------|--------------|-------|
| `official_phone` | `7903431900` | Replace all legacy numbers |
| `official_email` | `director@dhe.org.in` | |
| `office_address_en` | Sunny Enclave address | |
| `office_address_hi` | Hindi address | |
| `trust_registered_office` | Kurukshetra | 80G footnote only |
| `whatsapp_number` | `7903431900` | |
| `social_links` | JSON | FB, LinkedIn, Instagram, YouTube, Twitter |
| `receipt_header_json` | `receipt-and-lmc.ts` | Logo, PAN, reg no |
| `razorpay_key_id` | env | public part only in CMS display |
| `maintenance_mode` | bool | |
| `cookie_consent_enabled` | bool | |
| `adsense_enabled` | bool | default off until consent |
| `botpress_enabled` | bool | |

#### `pages` (flexible blocks)

For: home sections, about snippets, legal pages, static marketing.

| Field | Type |
|-------|------|
| `slug` | unique (`privacy-policy`, `terms`, `about`) |
| `title_en`, `title_hi` | text |
| `blocks` | JSONB array: `hero`, `richtext`, `cta`, `faq`, `stats`, `card_grid` |
| `seo_title`, `seo_description` | text |
| `status` | draft / published |
| `published_at` | timestamptz |

#### `programs`

| Field | Type |
|-------|------|
| `slug` | olympiad, shiksha-mahakumbh, super-100, … |
| `title_en`, `title_hi` | |
| `summary`, `body` | |
| `cell_slugs` | text[] — link to cells |
| `external_url` | optional (e.g. rase.co.in) |
| `registration_type` | none / internal / external / razorpay |
| `razorpay_amount_paise` | nullable |
| `featured` | bool — homepage |
| `sort_order` | int |
| `og_image` | storage path |

#### `cells` (migrate from `registry.json`)

| Field | Type |
|-------|------|
| `slug` | fix `spritual` → redirect kept |
| `display_title`, `seo_title` | |
| `objective`, `footnote` | mandate |
| `layout_variant` | slideshow / simple |
| `slides` | JSONB |
| `enrichment_override` | nullable JSONB — else auto-generate |

#### `notices`

| Field | Type |
|-------|------|
| `title`, `body` | |
| `image_path` | Storage |
| `published_at`, `expires_at` | |
| `is_pinned` | bool |
| `status` | draft / published / archived |

#### `events`

| Field | Type |
|-------|------|
| `title`, `venue`, `description` | |
| `start_date`, `end_date` | ISO date |
| `status` | planned / registration_open / closed / completed / archived |
| `external_url` | |
| `program_slug` | FK |

#### `leadership_terms` (LMC)

| Field | Type |
|-------|------|
| `ref_no` | VBITRT/12 |
| `valid_from`, `valid_to` | date |
| `office_address` | |
| `pdf_path` | `/lmc/letter-12-...` |
| `is_current` | bool |
| `bank_signatory_rule` | text |

#### `leadership_members`

| Field | Type |
|-------|------|
| `term_id` | FK |
| `role` | patron / president / … |
| `name`, `designation`, `contact`, `address`, `details` | |
| `sort_order` | |

#### `people` (coordinators + advisory)

Unified table replacing scattered arrays in `page.tsx` files.

#### `publications`

Books, journals, proceedings — replace `Books.tsx` / `Journals.tsx` hardcoding.

#### `media_assets`

| Field | Type |
|-------|------|
| `path`, `alt_en`, `alt_hi`, `category` | logos / hero / cells / … |

#### `legal_documents`

80G PDF, 12A PDF, recruitment policy, account PDFs.

#### `workshops`

Archive + future registrations.

#### `donations` / `memberships` / `registrations`

Transactional — created by Razorpay webhooks, not hand-edited in CMS.

### B.4 CMS UI screens (`/admin`)

| Screen | Functions |
|--------|-----------|
| Dashboard | drafts, recent donations, notice expiry warnings |
| Pages | block editor, preview, publish |
| Programs | CRUD, link cells, set registration |
| Cells | mandate editor, slides upload |
| Notices | CRUD, schedule, pin |
| Events | timeline, status workflow |
| Leadership | term picker, member table, PDF upload |
| People | coordinators, advisory |
| Publications | PDF upload, cover image |
| Media | library, alt text |
| Finance | donations, memberships, export CSV, receipt resend |
| Registrations | workshop/event attendees |
| Site settings | contact, receipt header, feature flags |
| Users | role assignment |

### B.5 CMS workflows

| Workflow | Steps |
|----------|-------|
| Notice publish | draft → preview → publish → auto-appears on home ISR + `/notices` |
| Event lifecycle | planned → registration_open → closed → completed → move to past |
| LMC update | upload PDF → enter members → set `is_current` → old term archived |
| Program launch | create program → link cell → optional Razorpay amount → homepage featured toggle |
| Donation | user pays → webhook → receipt PDF → SMTP → record in finance admin |

### B.6 What CMS replaces (no more code edits for)

- `UpcomingEvent.tsx` rows  
- `PastEvent.tsx` rows  
- `committee/page.tsx` array  
- `people/page.tsx` array  
- `advisory/page.tsx` array  
- `home/content.ts` FAQ (optional — can sync)  
- `Marquees.tsx` items  
- Notice Firebase admin  
- Manual SEO registry for static pages (CMS generates metadata)

### B.7 What stays in code (not CMS)

- Layout components, design system, Tailwind tokens  
- Razorpay integration, webhook verification  
- Receipt PDF template layout  
- RLS policies, API routes  
- `generateStaticParams` for cells (can rebuild on CMS webhook)  
- i18n framework

---

## §C — Complete audit register (every item)

**Legend:** P0 = blocker | P1 = restructure | P2 = polish | P3 = nice-to-have  
**Fix:** See §D (page), §E (file), §F–§H (data/payments), §I (phase task ID)

### C.1 Security (AUD-001 – AUD-022)

| ID | P | File / area | Problem |
|----|---|-------------|---------|
| AUD-001 | P0 | `FeedbackForm.tsx` | `eval()` for field binding — injection risk |
| AUD-002 | P0 | `/Members`, `MembershipEntry.tsx` | Public Firestore dump of name/email/phone |
| AUD-003 | P0 | `pages-registry.ts` | `/Members` not `noIndex` |
| AUD-004 | P0 | All forms + `BottomView` | Client Firestore writes, no server validation |
| AUD-005 | P0 | Firebase rules | Not in repo; client-only security |
| AUD-006 | P1 | `notice-admin.ts` | Public env allowlist bypassable |
| AUD-007 | P1 | `noticeboarddata` | Admin UI-only auth for CRUD |
| AUD-008 | P1 | `admin-gate.ts` | Dev auth bypass when env unset |
| AUD-009 | P1 | `admin-gate.ts` | Bearer accepts password alone |
| AUD-010 | P1 | `middleware.ts` | `/Members` not protected |
| AUD-011 | P1 | `donationdatadekh`, `WD` | `sendMail` without Authorization header |
| AUD-012 | P1 | `sendMail/route.ts` | May 2024 workshop template for all emails |
| AUD-013 | P2 | `sendMail/route.ts` | Pinterest hotlink in email HTML |
| AUD-014 | P1 | Donation/Membership upload | Predictable Storage paths, no server validation |
| AUD-015 | P1 | `noticeboarddata` | `files/${filename}` collision risk |
| AUD-016 | P1 | `firebase/config.ts` | Hardcoded API keys in repo |
| AUD-017 | P1 | Secrets | SMTP rotation docs only |
| AUD-018 | P0 | `layout.tsx` | AdSense + Botpress without consent |
| AUD-019 | P1 | `vercel.json` | No CSP, HSTS in project config |
| AUD-020 | P1 | `sendMail` | No CSRF token |
| AUD-021 | P2 | Admin exports | Full PII PDF client-side |
| AUD-022 | P1 | Footer form | Spam vector to `contactMessages` |

### C.2 Privacy & compliance (AUD-023 – AUD-035)

| ID | P | Problem |
|----|---|---------|
| AUD-023 | P0 | `/privacy-policy`, `/terms` → 404 |
| AUD-024 | P0 | No cookie banner before AdSense/Botpress |
| AUD-025 | P1 | Personal mobiles on committee/people/advisory |
| AUD-026 | P1 | `dhe2021vb@gmail.com` on contact page |
| AUD-027 | P0 | Public membership directory |
| AUD-028 | P2 | Visitor counter without privacy notice |
| AUD-029 | P0 | No 80G disclosure on donation page |
| AUD-030 | P1 | No donor PAN/address collection for receipts |
| AUD-031 | P1 | No data retention policy published |
| AUD-032 | P1 | No DPDP/GDPR rights contact |
| AUD-033 | P2 | Botpress chat logs undisclosed |
| AUD-034 | P2 | Google Maps embed without privacy note |
| AUD-035 | P1 | Donation account name “DHE” vs VBITR Trust 80G entity mismatch |

### C.3 SEO & AI (AUD-036 – AUD-055)

| ID | P | Problem |
|----|---|---------|
| AUD-036 | P0 | Home title template duplicates brand |
| AUD-037 | P1 | 25 identical cell meta descriptions |
| AUD-038 | P1 | Invalid `SearchAction` schema |
| AUD-039 | P0 | Legacy `public/sitemap.xml` malformed HTTP URLs |
| AUD-040 | P1 | `public/sitemap.xml` vs `app/sitemap.ts` conflict |
| AUD-041 | P1 | `public/robots.txt` vs `app/robots.ts` conflict |
| AUD-042 | P1 | No `llms.txt` |
| AUD-043 | P2 | Single OG image all pages |
| AUD-044 | P2 | ~15 pages missing JSON-LD |
| AUD-045 | P2 | No Event schema |
| AUD-046 | P3 | No cell H2 anchor IDs |
| AUD-047 | P1 | `/cells/spritual` typo slug permanent redirect |
| AUD-048 | P1 | `/Members` in sitemap |
| AUD-049 | P2 | `registrationForm` noIndex but linked |
| AUD-050 | P2 | `comingsoon` orphan |
| AUD-051 | P2 | `pub.rase.co.in` HTTP link in Journals |
| AUD-052 | P1 | Notices client-only — not in crawl HTML |
| AUD-053 | P1 | `/structure` tree absent from SSR |
| AUD-054 | P2 | `sitemap.ts` lastModified always `new Date()` |
| AUD-055 | P2 | No RSS feed for notices/programs |

### C.4 UX & design (AUD-056 – AUD-090)

| ID | P | Problem |
|----|---|---------|
| AUD-056 | P0 | SMK dominates hero, modal, marquee, FAQ |
| AUD-057 | P1 | Double sticky header |
| AUD-058 | P1 | Promo modal 3s CLS |
| AUD-059 | P1 | No skip-to-main |
| AUD-060 | P1 | Three visual tiers (home vs books vs membership) |
| AUD-061 | P1 | Header missing logo desktop |
| AUD-062 | P1 | Dropdown parents link to `/` |
| AUD-063 | P1 | Nav missing noticeboard, books, journals, workshop |
| AUD-064 | P2 | `comingsoon` unused vs chapter links |
| AUD-065 | P1 | Donation toast typo “feilds” |
| AUD-066 | P1 | Membership submit without receipt possible |
| AUD-067 | P2 | Feedback validation inconsistent |
| AUD-068 | P1 | Admin donation table column mismatch |
| AUD-069 | P2 | Bulk email no confirmation |
| AUD-070 | P1 | Workshop “closed” but links registration |
| AUD-071 | P2 | Residential camp PDF URL with spaces/unicode |
| AUD-072 | P1 | Contact shows Project Manager vs Director messaging |
| AUD-073 | P2 | Home promo annoyance returning users |
| AUD-074 | P1 | Orange/navy/brown competing primary colors |
| AUD-075 | P2 | `AdSlot` placeholder but AdSense loads globally |
| AUD-076 | P1 | Footer form placeholder-only inputs |
| AUD-077 | P1 | Maps iframe no title |
| AUD-078 | P1 | Social icons no aria-label |
| AUD-079 | P1 | Marquee no reduced-motion |
| AUD-080 | P2 | Structure Suspense “Loading...” only |
| AUD-081 | P1 | Journals “inforamtion” typo |
| AUD-082 | P2 | Books/Journals duplicate prose |
| AUD-083 | P2 | Digital ecosystem cards not clickable |
| AUD-084 | P1 | No `/programs` hub |
| AUD-085 | P1 | Publications split across routes + external |
| AUD-086 | P2 | No breadcrumbs visible (JSON-LD only) |
| AUD-087 | P2 | No Hindi UI toggle |
| AUD-088 | P1 | No thank-you pages after forms |
| AUD-089 | P1 | Jodo link labeled “Donate Now” inside form — **REMOVE** |
| AUD-090 | P0 | Manual receipt upload UX after payment — replace with Razorpay auto |

### C.5 Accessibility (AUD-091 – AUD-105)

| ID | P | Problem |
|----|---|---------|
| AUD-091 | P1 | `/advisory`, `/committee` no H1 |
| AUD-092 | P1 | `DesAdvisory` phones not `tel:` links |
| AUD-093 | P1 | Accounts/Logos `alt="book"` |
| AUD-094 | P1 | Membership form missing label `htmlFor` |
| AUD-095 | P2 | Workshop carousel a11y |
| AUD-096 | P1 | Mobile menu focus trap when closed |
| AUD-097 | P1 | `lang="en"` only — Hindi marquee unmarked |
| AUD-098 | P2 | Marquee speed 50 hard to read |
| AUD-099 | P2 | Donate `<a>` inside form confuses SR |
| AUD-100 | P1 | Footer form no labels |
| AUD-101 | P2 | Modal good but Botpress focus conflict |
| AUD-102 | P2 | Members table no caption/scope |
| AUD-103 | P2 | Color contrast on legacy pages |
| AUD-104 | P2 | No accessibility statement page |
| AUD-105 | P2 | Promo modal keyboard trap timing |

### C.6 Content accuracy & stale data (AUD-106 – AUD-145)

| ID | P | Problem |
|----|---|---------|
| AUD-106 | P0 | Committee page ≠ Letter 12 LMC (Dec 2025) |
| AUD-107 | P1 | “Aurag” vs “Anurag” Biala |
| AUD-108 | P1 | Extra spaces in phone numbers committee |
| AUD-109 | P1 | People page typos: Spritual, Managment, Promation |
| AUD-110 | P1 | Duplicate Krishan Kumar on people page |
| AUD-111 | P1 | Advisory invalid phone `1881231006` |
| AUD-112 | P1 | Advisory tab character in phone |
| AUD-113 | P0 | Address Sector 71 vs Sunny Enclave Orchid Towers |
| AUD-114 | P0 | Phone `7627888222` legacy (partially fixed) — audit all pages |
| AUD-115 | P1 | Upcoming “Global Developement” typo |
| AUD-116 | P0 | Upcoming 2025 events still “Planned” in 2026 |
| AUD-117 | P1 | Dec 2024 on upcoming page |
| AUD-118 | P1 | Feedback events stop at 2024 |
| AUD-119 | P1 | Past events end June 2024 |
| AUD-120 | P1 | Marquee “Registration Open” vs TBA elsewhere |
| AUD-121 | P1 | UPI `shikshamahakumbhkhumb@sbi` typo |
| AUD-122 | P1 | VBITR account commented out in Accounts |
| AUD-123 | P1 | 80G/12A PDF paths in code but files missing |
| AUD-124 | P1 | `Proceeding.pdf` missing |
| AUD-125 | P1 | `Recruitment-Policy.pdf` missing from public |
| AUD-126 | P1 | Residential camp assets missing |
| AUD-127 | P1 | Hero `/2024K/*` images missing from repo |
| AUD-128 | P1 | Workshop images `/14.jpg`–`/17.jpg` missing |
| AUD-129 | P1 | `/new.gif` marquee missing |
| AUD-130 | P1 | Cell slide images missing from repo checkout |
| AUD-131 | P1 | Footer ecosystem images may 404 locally |
| AUD-132 | P1 | Logos viksit preview/download mismatch |
| AUD-133 | P1 | registry.json leading spaces in titles |
| AUD-134 | P1 | slug `spritual` misspelling |
| AUD-135 | P2 | Director external link unverified |
| AUD-136 | P1 | SMK 5.0 concluded vs marquee “upcoming” conflict |
| AUD-137 | P1 | FAQ SMK dates need CMS freshness |
| AUD-138 | P1 | `institution/receipt-and-lmc.ts` not on any page |
| AUD-139 | P1 | LMC PDFs not linked on committee page |
| AUD-140 | P1 | Letter 01 coordinator PDF not linked |
| AUD-141 | P2 | Trust deed not public (optional download) |
| AUD-142 | P1 | Event rows hardcoded in TS not CMS |
| AUD-143 | P1 | Coordinator data duplicated 3× (people/advisory/committee) |
| AUD-144 | P2 | `logo 2.png` filename with space |
| AUD-145 | P2 | `tentative_schdule.xlsx` typo in public |

### C.7 Forms, payments, data (AUD-146 – AUD-175)

| ID | P | Problem |
|----|---|---------|
| AUD-146 | P0 | **Jodo** `pay.jodo.in/...` on donation — **REMOVE** |
| AUD-147 | P0 | **Same Jodo link** on membership — **REMOVE** |
| AUD-148 | P1 | `handleAddDocument` dead code donation |
| AUD-149 | P1 | Amount stored as string |
| AUD-150 | P1 | Membership fee not persisted correctly |
| AUD-151 | P1 | `Services` field never collected |
| AUD-152 | P1 | Collection typo `RegestrationVol` |
| AUD-153 | P1 | Feedback `Attachments` always null |
| AUD-154 | P1 | Footer contact no name field |
| AUD-155 | P2 | Workshop collection orphan |
| AUD-156 | P1 | Registration form no backend |
| AUD-157 | P2 | Donation serial by fetch order |
| AUD-158 | P1 | No phone format validation |
| AUD-159 | P1 | No reCAPTCHA on forms |
| AUD-160 | P1 | No Razorpay integration |
| AUD-161 | P1 | No webhook idempotency |
| AUD-162 | P1 | No receipt number sequence |
| AUD-163 | P1 | No Hindi email body |
| AUD-164 | P1 | No receipt download endpoint |
| AUD-165 | P1 | No donor PAN field |
| AUD-166 | P1 | No payment mode field |
| AUD-167 | P2 | Membership categories hardcoded fees only in form |
| AUD-168 | P1 | Duplicate donation write paths in submit |
| AUD-169 | P2 | `axios` only for broken admin email |
| AUD-170 | P1 | No Form 10BE process documented |
| AUD-171 | P2 | No refund/cancellation policy |
| AUD-172 | P1 | No payment failure UI |
| AUD-173 | P1 | No admin finance resend receipt |
| AUD-174 | P2 | No CSV export via server |
| AUD-175 | P1 | Contact messages never email admin |

### C.8 Firebase & rendering (AUD-176 – AUD-200)

| ID | P | Problem |
|----|---|---------|
| AUD-176 | P0 | Entire Firebase client SDK must be removed |
| AUD-177 | P1 | `app/firebase.ts` shim duplicate imports |
| AUD-178 | P1 | Visitor counter no session dedup |
| AUD-179 | P1 | Daily visitor doc never resets date |
| AUD-180 | P1 | Notice `getDocs` full scan every visit |
| AUD-181 | P2 | Notice admin signs out on every load |
| AUD-182 | P1 | `RootLayoutClient` wraps all children — heavy hydration |
| AUD-183 | P1 | No `error.tsx` anywhere |
| AUD-184 | P1 | No `loading.tsx` anywhere |
| AUD-185 | P1 | No root `not-found.tsx` |
| AUD-186 | P2 | `/structure` client + lazy + ssr:false |
| AUD-187 | P2 | `StructurePage` imports tailwindcss full CSS |
| AUD-188 | P2 | `reactStrictMode: false` |
| AUD-189 | P1 | No ISR for notices |
| AUD-190 | P2 | Cells client `CellPageView` whole page hydrates |
| AUD-191 | P2 | Workshop/pastevent/upcoming client pages |
| AUD-192 | P1 | Footer `onSnapshot` lives for session |
| AUD-193 | P2 | No streaming RSC for home below-fold |
| AUD-194 | P2 | Hero carousel CSR bailout |
| AUD-195 | P1 | Ant Design in root layout |
| AUD-196 | P1 | Noticeboard 416kB bundle |
| AUD-197 | P2 | `images.unoptimized` on Vercel |
| AUD-198 | P0 | Hero 1.9MB LCP image |
| AUD-199 | P1 | Logo 570KB preloaded |
| AUD-200 | P2 | 46 script tags homepage |

### C.9 Operations & CI/CD (AUD-201 – AUD-220)

| ID | P | Problem |
|----|---|---------|
| AUD-201 | P0 | No GitHub Actions CI |
| AUD-202 | P0 | No Firestore backup |
| AUD-203 | P1 | No Sentry |
| AUD-204 | P1 | No Upstash rate limits |
| AUD-205 | P1 | No uptime monitoring |
| AUD-206 | P1 | No `.env.example` complete in repo |
| AUD-207 | P1 | No `typecheck` script |
| AUD-208 | P1 | No tests |
| AUD-209 | P2 | Duplicate Vercel project risk |
| AUD-210 | P1 | Admin routes opaque names `/WD` |
| AUD-211 | P1 | Admin 503 plain text if env missing |
| AUD-212 | P2 | No health endpoint |
| AUD-213 | P1 | No DR runbook |
| AUD-214 | P2 | No Firebase App Check |
| AUD-215 | P1 | `console.error` only logging |
| AUD-216 | P2 | No structured JSON logs |
| AUD-217 | P1 | No OpenAPI for API |
| AUD-218 | P2 | No dependabot |
| AUD-219 | P2 | npm audit moderate issues |
| AUD-220 | P1 | No staging Supabase project |

### C.10 Marketing & conversion (AUD-221 – AUD-235)

| ID | P | Problem |
|----|---|---------|
| AUD-221 | P1 | SMK conversion off-site untracked |
| AUD-222 | P1 | No GA4 events |
| AUD-223 | P1 | GA4 never initialized |
| AUD-224 | P2 | No GTM |
| AUD-225 | P2 | No newsletter |
| AUD-226 | P2 | No share buttons |
| AUD-227 | P1 | No UTM on external SMK links |
| AUD-228 | P2 | No funnel thank-you tracking |
| AUD-229 | P2 | Botpress unmeasured |
| AUD-230 | P1 | No confirmation email joins/donations |
| AUD-231 | P2 | No program landing pages |
| AUD-232 | P2 | WhatsApp float not tracked |
| AUD-233 | P2 | No conversion pixels post-consent |
| AUD-234 | P1 | Competitor CTAs (SMK primary vs Join DHE) |
| AUD-235 | P2 | No certificate verify URL on receipts |

### C.11 Code quality & tech debt (AUD-236 – AUD-255)

| ID | P | Problem |
|----|---|---------|
| AUD-236 | P2 | Page exports misnamed `Committee` / `Structure` |
| AUD-237 | P2 | Unused imports comingsoon, MembershipBenefits |
| AUD-238 | P2 | Deprecated Next Image API Accounts/Logos |
| AUD-239 | P2 | `text-l` invalid Tailwind Books.tsx |
| AUD-240 | P2 | `tsconfig` target es5 |
| AUD-241 | P2 | Duplicated WD + donationdatadekh ~280 lines |
| AUD-242 | P2 | DesAdvisory vs AdvisoryCouncil duplicate |
| AUD-243 | P2 | Hindi i18n modal unused in UI |
| AUD-244 | P2 | Dead code Journals.tsx |
| AUD-245 | P2 | Commented paper fields MembershipEntry |
| AUD-246 | P2 | `isFirebaseEnvConfigured` unused |
| AUD-247 | P2 | Admin pages inside public chrome header/footer |
| AUD-248 | P2 | `next.config` Pinterest remote pattern |
| AUD-249 | P2 | `/VibhagRoute` external redirect |
| AUD-250 | P2 | No `global-error.tsx` |

### C.12 Missing features (AUD-251 – AUD-270)

| ID | P | Problem |
|----|---|---------|
| AUD-251 | P0 | No CMS |
| AUD-252 | P1 | No admin feedback inbox |
| AUD-253 | P1 | No sitewide search (remove false schema) |
| AUD-254 | P1 | No leadership timeline UI |
| AUD-255 | P1 | No program registry |
| AUD-256 | P1 | No event registration concise flow |
| AUD-257 | P1 | No WhatsApp deep link tracking |
| AUD-258 | P2 | No `/hi` routes |
| AUD-259 | P2 | No Pagefind search |
| AUD-260 | P1 | No notice expiry auto-hide |
| AUD-261 | P1 | No draft/preview publish |
| AUD-262 | P2 | No revision history |
| AUD-263 | P1 | No finance dashboard |
| AUD-264 | P2 | No workshop gallery CMS |
| AUD-265 | P2 | No publications hub |
| AUD-266 | P1 | No receipt verify `/receipt/verify/[id]` |
| AUD-267 | P2 | No annual transparency report |
| AUD-268 | P1 | No spam protection footer form |
| AUD-269 | P2 | No email templates admin UI |
| AUD-270 | P1 | No concise registration component spec |

### C.13 External dependencies (AUD-271 – AUD-280)

| ID | P | Problem |
|----|---|---------|
| AUD-271 | P0 | Jodo payment dependency — **remove** |
| AUD-272 | P1 | Firebase dependency — **remove** |
| AUD-273 | P1 | Botpress tenant hardcoded |
| AUD-274 | P1 | AdSense client hardcoded |
| AUD-275 | P2 | Chapter subdomains no health check |
| AUD-276 | P2 | `ep.sarvatr.co.in` careers opaque ID |
| AUD-277 | P2 | Google Drive marquee link off-site |
| AUD-278 | P2 | `pub.dhe.org.in` not integrated |
| AUD-279 | P1 | `rase.co.in` SMK should be program external_url in CMS |
| AUD-280 | P2 | Pinterest image in email |

**Total audit items: 280** — each mapped to fixes in §D–§I.

---

## §D — Page-by-page redesign matrix

For **every route**: current problems → target state → CMS? → phase

### `/` Home

| Aspect | Today | Target |
|--------|-------|--------|
| Narrative | SMK-first | DHE national platform; programs grid |
| Hero CTA | rase.co.in primary | “Explore programs” + secondary SMK card |
| Modal | SMK 3s interstitial | Optional dismissible banner OR remove |
| Marquee | SMK Hindi scroll | CMS-driven notices ticker |
| FAQ | 3 SMK-heavy | CMS FAQ blocks DHE + programs |
| Notices | Client Firebase | Server ISR from Supabase |
| Gallery | Heavy images | Compressed WebP from CMS media |
| Stats | Hardcoded | CMS or keep `content.ts` |
| JSON-LD | FAQ + Org | + ItemList programs |
| Phase | | I-3, I-4 |

### `/programs` (NEW)

| Aspect | Target |
|--------|--------|
| Hub | All flagship programs with cell links |
| CMS | `programs` table |
| Cards | Olympiad, SMK, Super 100, Hawan, publications, … |
| Phase | I-3 |

### `/programs/[slug]` (NEW)

Per-program landing, registration CTA, Razorpay or external link, Event schema.  
**Fixes:** AUD-084, AUD-231, AUD-255

### `/cells/[slug]` (keep, refine)

| Aspect | Target |
|--------|--------|
| Data | CMS `cells` table (seed from registry.json) |
| SEO | Unique descriptions per cell |
| Schema | FAQ + AboutPage + anchor IDs |
| Client | Reduce `CellPageView` hydration — server mandate |
| Slug | Keep redirect `spiritual` → `spritual` |
| Phase | I-3 |

### `/structure`

| Aspect | Target |
|--------|--------|
| Org chart | Server-rendered tree OR static SVG from CMS |
| Remove | `ssr:false`, `isClient`, tailwind import |
| Phase | I-4 |

### `/leadership` (NEW — merges committee)

| Aspect | Target |
|--------|--------|
| LMC current | Letter 12 from CMS/`receipt-and-lmc.ts` |
| History | 3 terms + PDF downloads (letters 12, 04, 455) |
| Patrons | Mahavir Kaushik, Pratibha Gupta |
| Director | Link `/messages` |
| Advisory | Section or link |
| Bank rule | President + Manager + Treasurer signatories |
| Redirect | `/committee` → `/leadership#lmc` |
| **Fixes** | AUD-106, AUD-139, AUD-254 |

### `/committee` → redirect

**Fixes:** AUD-106

### `/people`

| Aspect | Target |
|--------|--------|
| Data | CMS `people` type=coordinator |
| Fix typos | Spritual, Managment, duplicates |
| Phase | I-3 |

### `/advisory`

| Aspect | Target |
|--------|--------|
| Component | Unify with AdvisoryCouncil |
| Phones | `tel:` links, validate numbers |
| H1 | Add |
| CMS | `people` type=advisory |
| Phase | I-3 |

### `/messages`

Director message — CMS page blocks; photo from media library.

### `/notices` (alias `/noticeboard`)

| Aspect | Target |
|--------|--------|
| Data | Supabase ISR |
| UI | Lightweight list, no Ant Design public |
| RSS | `/feed.xml` |
| Admin | `/admin/notices` |
| **Fixes** | AUD-052, AUD-180, AUD-260 |

### `/upcomingevent` + `/pastevent`

Merge into `/events` with filters OR keep URLs with CMS `events` table.  
**Fixes:** AUD-116–119, AUD-142

### `/workshop`

Archive CMS + future Razorpay registration; fix images; remove stale tel.  
**Fixes:** AUD-070, AUD-127–128

### `/donation` → `/donate`

| Aspect | Target |
|--------|--------|
| Payment | **Razorpay only** |
| Jodo | **Removed** |
| Upload receipt | **Removed** — auto PDF |
| 80G block | VBITR Trust full disclosure |
| Form | PAN, address, reCAPTCHA |
| Thank-you | `/donate/thank-you` + download |
| **Fixes** | AUD-146, AUD-089–090, AUD-029, AUD-035 |

### `/contribute` → `/join`

Razorpay membership fees; no Jodo; receipt + email.  
**Fixes:** AUD-147, AUD-066, AUD-152

### `/Members` → **RETIRE**

Redirect to `/join` or 404; admin roster only.  
**Fixes:** AUD-002, AUD-003, AUD-027, AUD-048

### `/contact`

| Aspect | Target |
|--------|--------|
| Address | Sunny Enclave from site_settings |
| Phone | 7903431900 only |
| Email | director@dhe.org.in primary |
| Form | Server + Supabase + SMTP + reCAPTCHA |
| Remove | dhe2021vb@gmail.com or demote |
| **Fixes** | AUD-113, AUD-114, AUD-026, AUD-175 |

### `/feedback`

Remove eval; server API; admin inbox. **Fixes:** AUD-001, AUD-153

### `/accountdetails`

| Aspect | Target |
|--------|--------|
| Accounts | DHE + VBITR Trust + SMK separated |
| 80G/12A | Download links |
| UPI typo | Fix |
| Razorpay | Primary CTA per account type |
| CMS | `legal_documents` |
| **Fixes** | AUD-121–123, AUD-035

### `/books`, `/journals` → `/publications` (optional hub)

CMS publications; fix Proceeding.pdf; remove HTTP pub link.

### `/logos`

CMS media; fix alt text; fix viksit mismatch.

### `/residentialcamps`

CMS camp entries; fix PDF paths; encode URLs.

### `/registrationForm`

Dynamic per program slug; Razorpay or closed state from CMS.

### `/comingsoon`

Remove or use for unreleased chapters only.

### `/feedback`, `/residentialcamps`, legal

`/privacy-policy`, `/terms` — CMS pages. **Fixes:** AUD-023

### Admin routes

| Old | New |
|-----|-----|
| `/noticeboarddata` | `/admin/notices` |
| `/donationdatadekh` | `/admin/finance/donations` |
| `/WD` | `/admin/finance/workshops` |
| — | `/admin/cms` |
| — | `/admin/feedback` |
| — | `/admin/settings` |

Middleware: Supabase session + role check; retire Basic auth when ready.

### Cells ×25

Each gets CMS entry, unique SEO, enrichment review.

---

## §E — File retirement & replacement matrix

| File / dependency | Action |
|-------------------|--------|
| `src/app/firebase.ts` | **DELETE** |
| `src/services/firebase/*` | **DELETE** |
| `firebase` package | **REMOVE** from package.json |
| `DonationForm.tsx` Jodo link | **REMOVE** → Razorpay component |
| `MembershipForm.tsx` Jodo link | **REMOVE** |
| `MembershipEntry.tsx` | **DELETE** (public PII) |
| `(site)/Members/page.tsx` | **DELETE** or redirect |
| `FeedbackForm.tsx` eval | **REWRITE** |
| `sendMail/route.ts` workshop template | **REPLACE** with templated SMTP service |
| `noticeboarddata/page.tsx` | **REPLACE** → admin notices |
| `donationdatadekh`, `WD` | **MERGE** → admin finance |
| `BottomView.tsx` Firebase | **REFACTOR** — form API, Upstash visitors |
| `RootLayoutClient.tsx` | **SLIM** — no Firebase, Ant Design out |
| `public/sitemap.xml` | **DELETE** |
| `public/robots.txt` | **DELETE** if conflicts |
| `StructurePage.tsx` tailwind import | **REMOVE** |
| `committee/page.tsx` hardcoded array | **REPLACE** CMS leadership |
| `UpcomingEvent.tsx` rows | **REPLACE** CMS events |
| `PastEvent.tsx` rows | **REPLACE** CMS events |
| `Marquees.tsx` hardcoded | **REPLACE** CMS ticker |
| `axios` | **REMOVE** after admin rewrite |
| Jodo URLs | **REMOVE** everywhere |
| `react-fast-marquee` | **KEEP** with reduced-motion |

---

## §F — Firebase → Supabase (field-level)

| Firestore collection | Supabase table | Notes |
|---------------------|----------------|-------|
| `events` | `notices` | Map title, date, imageUrl → image_path |
| `visitors` | Upstash + `visitor_daily` | Fix daily reset logic |
| `contactMessages` | `contact_messages` | Add ip_hash, recaptcha_score |
| `Donation` | `donations` | Add razorpay_* fields, receipt_number |
| `Feedback` | `feedback` | |
| `RegestrationVol` | `memberships` | Fix typo name |
| `Workshop` | `workshop_registrations` | Historical import |
| Storage `images/*` | `storage.objects` bucket `receipts` | |
| Storage `files/*` | bucket `notices` | |
| Firebase Auth | Supabase Auth | `admin_users` roles |

**Migration script tasks:** export JSON → transform → import → verify counts → parallel run → cutover → disable Firebase.

---

## §G — Payments (Razorpay only — no Jodo)

### G.1 Removal checklist (Jodo)

- [ ] Remove link from `DonationForm.tsx`
- [ ] Remove link from `MembershipForm.tsx`
- [ ] Remove “upload receipt” field — payment proof = Razorpay ID
- [ ] Remove Jodo from docs, CMS, account cards
- [ ] Audit no `jodo.in` in repo (grep)

### G.2 Razorpay flows

| Flow | Amount | Webhook |
|------|--------|---------|
| Donation | User enters (min ₹1) | `payment.captured` → donation row |
| Membership student lifetime | ₹2500 | same |
| Membership student annual | ₹1000 | same |
| Membership other lifetime | ₹5000 | same |
| Membership other annual | ₹2000 | same |
| Paid workshop | CMS price | same |
| Paid event registration | CMS price | same |

### G.3 Server routes

- `POST /api/payments/razorpay/create-order`
- `POST /api/payments/razorpay/verify` (client callback)
- `POST /api/webhooks/razorpay` (signature verify, idempotent)
- `GET /api/receipts/[receiptNumber]/pdf`

### G.4 Concise registration (your requirement)

Single shared component `RegistrationForm`:

| Field | Required |
|-------|----------|
| Full name | yes |
| Email | yes |
| Mobile | yes |
| Organization / school | optional |
| Program/event | hidden from URL slug |
| PAN | if paid or donation > threshold |
| Address | if receipt requested |
| reCAPTCHA | yes |

Paid → Razorpay → receipt; free → SMTP confirmation only.

---

## §H — Receipts & SMTP

### H.1 Receipt header (canonical)

```
[DHE LOGO]
Regd. No. 6401 Date: 10-11-2023
PAN: AAETV1652K

DEPARTMENT OF HOLISTIC EDUCATION
A UNIT OF
VIDYA BHARTI INSTITUTE OF TRAINING AND RESEARCH TRUST

E-7, Orchid Towers, Sector 125, Sunny Enclave, SAS Nagar, Punjab-140301
Web. dhe.org.in, E-mail: director@dhe.org.in
Tel: 7903431900
```

### H.2 Receipt types

- Registration Receipt  
- Donation Receipt  

Number format: `DHE-{FY}-{seq}` e.g. `DHE-2026-00001`

### H.3 SMTP emails

| Template | EN | HI thanks |
|----------|----|-----------|
| donation_receipt | yes | yes — you will supply final Hindi text |
| membership_receipt | yes | yes |
| registration_confirm | yes | yes |
| contact_admin_notify | yes | — |
| contact_user_thanks | yes | optional HI |

### H.4 Attachments

- PDF receipt attached  
- Link to download from thank-you page  
- Optional QR verify URL on PDF  

---

## §I — Implementation phases (every task)

### Phase 0 — Foundation (Week 1–2)

- [ ] I0-01 Create Supabase project (prod + staging)
- [ ] I0-02 Run SQL migration all tables §B.3
- [ ] I0-03 Enable RLS policies draft
- [ ] I0-04 Add complete `.env.example`
- [ ] I0-05 GitHub Actions: lint, tsc, build
- [ ] I0-06 Sentry DSN integration
- [ ] I0-07 Upstash Redis provision
- [ ] I0-08 Create `privacy-policy` + `terms` CMS pages (draft)
- [ ] I0-09 Delete `public/sitemap.xml`, fix robots conflict
- [ ] I0-10 Fix home metadata title template (AUD-036)
- [ ] I0-11 Add `llms.txt` + `api/health`
- [ ] I0-12 Document DR runbook stub
- [ ] I0-13 Upload 80G/12A PDFs to `public/accounts/`
- [ ] I0-14 Verify `public/lmc/*.pdf` present (done)
- [ ] I0-15 Grep remove all `7627888222` (AUD-114)
- [ ] I0-16 Grep remove all `jodo.in` when Phase 2 starts

### Phase 1 — Supabase migration (Week 2–4)

- [ ] I1-01 Export Firestore collections to JSON
- [ ] I1-02 Import script → Supabase
- [ ] I1-03 Migrate Storage files → Supabase buckets
- [ ] I1-04 Build `src/lib/supabase/server.ts` + client anon
- [ ] I1-05 Notices read server component ISR revalidate 300
- [ ] I1-06 Remove Firebase from `package.json`
- [ ] I1-07 Delete firebase modules
- [ ] I1-08 reCAPTCHA on contact API
- [ ] I1-09 Upstash rate limit contact/feedback
- [ ] I1-10 Visitor count Upstash — remove Firebase footer
- [ ] I1-11 Retire `/Members` route
- [ ] I1-12 Remove eval from FeedbackForm
- [ ] I1-13 Add `error.tsx`, `not-found.tsx` root + key routes
- [ ] I1-14 Seed `site_settings` from institution record
- [ ] I1-15 Seed CMS leadership from Letter 12

### Phase 2 — Razorpay + receipts (Week 4–6)

- [ ] I2-01 Razorpay test keys in env
- [ ] I2-02 create-order API
- [ ] I2-03 Checkout JS integration component
- [ ] I2-04 Webhook handler idempotent
- [ ] I2-05 **Remove Jodo links** donation + membership
- [ ] I2-06 **Remove manual receipt upload** UI
- [ ] I2-07 PDF receipt generator (your format)
- [ ] I2-08 Receipt number sequence in DB
- [ ] I2-09 SMTP service module + templates
- [ ] I2-10 Hindi thanks block in templates (text from you)
- [ ] I2-11 Thank-you pages donate/join/register
- [ ] I2-12 80G disclosure block on `/donate`
- [ ] I2-13 Donor PAN + address fields
- [ ] I2-14 Admin finance dashboard
- [ ] I2-15 Resend receipt action
- [ ] I2-16 Retire `sendMail` workshop template
- [ ] I2-17 Payment failure / retry UI

### Phase 3 — CMS + content restructure (Week 6–9)

- [ ] I3-01 Admin layout `/admin` Supabase auth
- [ ] I3-02 CMS pages editor
- [ ] I3-03 CMS programs CRUD
- [ ] I3-04 CMS cells editor (import registry.json)
- [ ] I3-05 CMS events (upcoming/past)
- [ ] I3-06 CMS notices admin
- [ ] I3-07 CMS leadership + PDF upload
- [ ] I3-08 CMS people coordinators/advisory
- [ ] I3-09 `/leadership` public page
- [ ] I3-10 `/committee` redirect
- [ ] I3-11 `/programs` hub + slugs
- [ ] I3-12 Homepage redesign DHE-first
- [ ] I3-13 Marquee from CMS
- [ ] I3-14 Fix all AUD-106–145 content items
- [ ] I3-15 Publications hub or refactor books/journals
- [ ] I3-16 Nav restructure (all sections linked)
- [ ] I3-17 Concise `RegistrationForm` component
- [ ] I3-18 Workshop archive CMS
- [ ] I3-19 Notice RSS feed
- [ ] I3-20 Sync contact address site-wide from site_settings

### Phase 4 — UX, perf, legal (Week 9–11)

- [ ] I4-01 Compress hero/logo assets WebP AVIF
- [ ] I4-02 Image optimization strategy (re-enable on Pro or self-host)
- [ ] I4-03 Slim RootLayoutClient — Ant Design admin-only
- [ ] I4-04 Skip link + form labels + reduced motion
- [ ] I4-05 Cookie consent CMP — gate AdSense/Botpress
- [ ] I4-06 Publish privacy + terms
- [ ] I4-07 GA4 + events post-consent
- [ ] I4-08 Fix SearchAction or add Pagefind search
- [ ] I4-09 Unique cell SEO descriptions
- [ ] I4-10 Event JSON-LD
- [ ] I4-11 `/structure` server org chart
- [ ] I4-12 Remove false/schema fixes
- [ ] I4-13 Accessibility statement page
- [ ] I4-14 H1 fixes advisory/committee → leadership
- [ ] I4-15 Double header fix
- [ ] I4-16 Promo modal → banner or remove

### Phase 5 — Hardening & decommission (Week 11–12)

- [ ] I5-01 Firebase project read-only then disable client keys
- [ ] I5-02 Full regression test all 280 audit items
- [ ] I5-03 Load test webhooks + visitor endpoints
- [ ] I5-04 Backup Supabase daily
- [ ] I5-05 Retire Basic auth middleware
- [ ] I5-06 CSP enforce
- [ ] I5-07 OpenAPI publish
- [ ] I5-08 CI add npm audit gate
- [ ] I5-09 Staging → prod cutover checklist
- [ ] I5-10 Post-launch monitoring 30 days

---

## §J — Environment variables (complete)

### Remove

`NEXT_PUBLIC_FIREBASE_*`, `NEXT_PUBLIC_NOTICE_ADMIN_EMAILS`

### Add

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Razorpay (replaces Jodo entirely)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

# SMTP
SMTP_SERVICE=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=

# Security
RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# Observability
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=

# Upstash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Optional Neon — NOT required if Supabase is sole DB
# DATABASE_URL=  (only if splitting read replica later)

# Admin transition
ADMIN_USERNAME=
ADMIN_PASSWORD=
```

---

## §K — Success criteria (every gate before go-live)

- [ ] K-01 Zero `firebase` imports in build
- [ ] K-02 Zero `jodo.in` in repo
- [ ] K-03 Razorpay test donation → PDF email + download works
- [ ] K-04 Razorpay test membership → same
- [ ] K-05 Hindi thanks appears in email (your approved text)
- [ ] K-06 reCAPTCHA blocks bots on contact
- [ ] K-07 `/Members` returns 404 or redirect — no PII
- [ ] K-08 Leadership matches Letter 12 + 4 PDFs downloadable
- [ ] K-09 Address Sunny Enclave + phone 7903431900 everywhere
- [ ] K-10 Privacy + terms live
- [ ] K-11 Cookie consent before third-party scripts
- [ ] K-12 Notices visible without JavaScript
- [ ] K-13 CMS publish notice → home within 5 min
- [ ] K-14 CI green on main
- [ ] K-15 Sentry receiving errors
- [ ] K-16 Lighthouse mobile LCP < 2.5s home
- [ ] K-17 All 280 AUD items triaged fixed or wontfix documented
- [ ] K-18 Firestore disabled
- [ ] K-19 80G block accurate on donate
- [ ] K-20 Admin finance export CSV works

---

## §L — What you still provide

1. Razorpay live/test keys  
2. Final receipt PDF design + **Hindi thanks** exact text  
3. Firestore export credentials  
4. Legal Hindi+English privacy/terms approval  
5. Confirm which bank account is Razorpay settlement + 80G  
6. Membership fee confirmation  
7. Asset pack (logo, hero, cell images) for CMS upload  

---

## §M — Document cross-reference

| Prior doc | Status |
|-----------|--------|
| `MASTER_RESTRUCTURE_PLAN.md` | Superseded by this exhaustive doc for planning |
| `CONTENT_OPERATIONS.md` | Update after CMS live |
| `FIREBASE_SECURITY.md` | Archive after Firebase removed |
| `receipt-and-lmc.ts` | Seed data → CMS `site_settings` + `leadership_*` |

---

**This is the complete inventory — 280 audit items, every route, CMS spec, no Jodo, Supabase, Razorpay, SMTP, leadership, receipts. Implementation starts at Phase 0 task I0-01 when you approve.**
