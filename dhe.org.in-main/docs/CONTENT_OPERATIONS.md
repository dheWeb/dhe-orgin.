# DHE Content Operations Program — Editorial Governance

**Status:** Post–SEO implementation (Waves 1–6 complete)  
**Purpose:** Keep the public site accurate, current, and trustworthy through institutional publishing—not additional structural SEO work.  
**Last reviewed:** 2026-06-02

---

## Scope

This document defines **who updates what**, **how often**, and **which file or system is the source of truth**. It does not change routes, metadata registry, sitemap, cell architecture, or Firebase APIs.

---

## 1. Content Ownership Matrix

| Page / area | URL | Source of truth (codebase) | Suggested owner | Update frequency |
|-------------|-----|---------------------------|-----------------|------------------|
| Homepage | `/` | `src/data/home/content.ts`, `src/data/home/slides.ts`, `HomePageContent.tsx` components | DHE communications / secretariat | Quarterly; hero/events as needed |
| Director's Message | `/messages` | `src/components/sections/DirectorMessage.tsx` | Director office / DHE leadership | Annual or on leadership change |
| Structure (org chart) | `/structure` | `src/components/sections/TreeComponent.tsx`, `StructurePage.tsx` | DHE administration + IT | When org structure changes |
| Cell pages (×25) | `/cells/[slug]` | `src/data/cells/registry.json` (mandate); enrichment auto from `src/data/cells/enrichment.ts` | Per cell coordinator + registry editor | Annual mandate review; enrichment follows registry |
| Upcoming events | `/upcomingevent` | `src/components/sections/UpcomingEvent.tsx` (`upcomingRows`) | Event Management Cell / secretariat | Monthly or per program |
| Past events | `/pastevent` | `src/components/sections/PastEvent.tsx` (`events` array) | Event Management Cell | After each completed program |
| Workshop archive | `/workshop` | `src/components/sections/Workshop.tsx` | Event / R&D cells (May 2024 archive) | When new workshop archive warranted |
| Notice board (public) | `/noticeboard` | Firebase `events` collection (read via `NoticeBoard.tsx`) | DHE secretariat / authorized admin | As published |
| Notice admin | `/noticeboarddata` | Same Firebase collection (admin UI) | Authorized notice administrators only | Ongoing |
| Cell co-ordinators | `/people` | `src/app/(site)/people/page.tsx` (`advisoryMembers`) | DHE administration | Quarterly |
| Advisory council | `/advisory` | `src/components/sections/AdvisoryCouncil.tsx` (if used on route) | DHE administration | Annual |
| Contact | `/contact` | `src/components/forms/ContactForm.tsx` (`contactData`) | DHE secretariat | Quarterly |
| Membership | `/contribute` | `MembershipForm.tsx`, `MembershipBenefits.tsx`, `Accounts.tsx` | Membership / TMS cell | Quarterly |
| SEO titles/descriptions | All public routes | `src/lib/seo/pages-registry.ts` + `getCellSeoEntry()` | Technical editor + communications | Only when page purpose changes (avoid casual edits) |
| Homepage FAQ (visible + schema) | `/` | `src/data/home/content.ts` (`homeFaq`) — must match JSON-LD | Communications + technical reviewer | When facts change |

**Note:** Assign named individuals or roles in your internal roster; this matrix uses functional owners only.

---

## 2. Event Governance Framework

### Status vocabulary (public site)

Align copy with labels already used on `/upcomingevent`:

| Status label (UI) | Internal meaning | When to use |
|-------------------|------------------|-------------|
| **Planned** | Dates or registration not yet confirmed | Program announced; external or internal link may be TBA |
| **Registration Open** | *(Add to `UpcomingEvent.tsx` when applicable)* | Official registration URL active; dates confirmed |
| **Registration Closed** | Registration no longer accepted | After deadline; before event date |
| **Archived Event** | Program date passed | Keep on upcoming only as historical row OR remove and add to past events |
| **Completed** | Event finished | Move listing to `/pastevent`; update upcoming row or remove |

Workshop-specific: `/workshop` uses an on-page **Registration Closed** badge for the May 2024 archive—retain for closed historical programs.

### Lifecycle workflow (manual — no automation)

```
1. PLANNING
   - Confirm title, venue, dates, official URL (Shiksha / partner site).
   - Add or update row in UpcomingEvent.tsx with status "Planned" and statusNote.

2. REGISTRATION OPEN (optional)
   - Update statusLabel to "Registration Open" when officially open.
   - Verify href is absolute HTTPS and works.

3. REGISTRATION CLOSED
   - Update statusLabel before event day.
   - Keep link for reference if policy allows.

4. COMPLETED
   - Add entry to PastEvent.tsx (title, date, venue, link).
   - Remove or relabel upcoming row as "Archived Event" with statusNote pointing to past events.
   - If workshop-style multi-day training: consider dedicated archive section on /workshop only when content exists.

5. QUARTERLY REVIEW
   - No past-dated rows should remain labeled "Planned" without explanation.
   - Cross-check Shiksha Mahakumbh external sites (rase.co.in, sk25.rase.co.in, shikshamahakumbh.com).
```

### Cross-page consistency rules

- **One canonical title** per program across upcoming, past, workshop, notices, and homepage references.
- **Do not invent** dates, venues, or speakers not confirmed by official channels.
- **External links** open official program sites; use `external: true` pattern in `UpcomingEvent.tsx` when linking off-site.
- **Homepage** Shiksha references (`homeFaq`, hero CTAs) must be updated in the same release as event pages when edition dates change.

---

## 3. Notice Governance Framework

### Publishing standards

| Field | Standard |
|-------|----------|
| Title | Official program or notice title; concise |
| Date | Accurate publication or event date |
| Image | Optional; use notice-appropriate imagery; alt text describes notice content |
| Language | Formal, factual; no unverified claims |

### Roles

- **Publish:** Authorized users on `/noticeboarddata` (see `src/lib/auth/notice-admin.ts` allowlist).
- **Review:** Second reviewer for policy-sensitive notices (recommended).
- **Public display:** `/noticeboard` — current tab shows latest five; past tab archives remainder.

### Expiry and archival

- Notices sort by date; older items move to **Past Notices** automatically in UI.
- **Policy:** Remove or avoid duplicating the same notice as a new post; edit in admin if correction only.
- **No automatic expiry deletion** in codebase—periodically review Firebase collection for obsolete entries.

### Duplicate avoidance

- Before publishing, search existing notices for same program title/date.
- Link to `/upcomingevent` or `/pastevent` in notice copy when appropriate instead of repeating full event details.

---

## 4. Cell Governance Framework

### Content layers (do not confuse)

| Layer | Source | Who updates | Review |
|-------|--------|-------------|--------|
| **Mandate (visible top)** | `registry.json` → `objective`, `footnote`, optional `slides` | Cell coordinator + registry editor | Annual or on mandate change |
| **Enrichment (below mandate)** | Generated by `enrichment.ts` from registry + shared DHE copy | Automatic when registry changes; edit `enrichment.ts` only for logic, not facts | Technical + communications on logic changes |
| **SEO entry** | `getCellSeoEntry()` in pages-registry pattern | Technical editor | When cell name/path description changes |

### Update procedure

1. Coordinator proposes text change (objective/footnote only—no invented outcomes).
2. Communications reviews for tone and accuracy.
3. Edit `src/data/cells/registry.json` for that slug only.
4. Rebuild and deploy; enrichment and FAQ schema update from registry on build.
5. Spot-check live `/cells/{slug}` for mandate, enrichment, FAQ alignment.

### Review schedule

- **Annual:** All 25 cells—mandate still accurate.
- **On reorganization:** Update `TreeComponent.tsx` links and `people/page.tsx` if coordinator or cell name changes.
- **Do not** add statistics, rankings, or partnerships in registry unless institutionally verified.

---

## 5. Publication & Research Workflow

Applies to cells: **publication**, **rd**, **ipr**, **publication** (promotions), and research-oriented mandates.

### Editorial process (documentation only)

1. **Source:** Only document activities that occurred and are approved for public mention (reports, proceedings, event outcomes already on past events).
2. **Registry update:** If mandate scope changes, update objective/footnote in `registry.json`.
3. **Cross-link:** Add or update past event rows; optional notice on notice board.
4. **Do not invent** journals, ISSNs, or download counts not maintained on site (`/journals`, `/books` are separate static sections—update those files only when assets exist).

### Quality bar

- Attribute publications to DHE/Vidya Bharati programs only when officially released.
- Prefer linking to existing `/pastevent` or external official URLs over new unverifiable PDF claims.

---

## 6. Coordinator Information Management

### Sources

| Data | Location |
|------|----------|
| Cell co-ordinators | `src/app/(site)/people/page.tsx` |
| Org chart labels | `src/components/sections/TreeComponent.tsx` |
| Contact block | `src/components/forms/ContactForm.tsx` |

### Update procedure

1. Obtain signed-off coordinator list from DHE administration.
2. Update `people/page.tsx` array (name, designation, contact).
3. Verify `tel:` links dial correctly (10-digit India numbers).
4. Align designations with `registry.json` cell names where applicable.
5. Update TreeComponent only if node labels or hrefs must change.
6. Deploy; no metadata registry change required unless page titles change.

### Triggers for update

- New coordinator appointment
- Phone or role change
- Cell renamed or merged (rare—requires registry + chart + people sync)

---

## 7. Quarterly Review Checklist

**Target:** First week of each quarter. **Owner:** DHE secretariat + Event cell lead.

### Freshness

- [ ] Review all rows in `UpcomingEvent.tsx`—status labels match reality
- [ ] Add completed programs to `PastEvent.tsx`
- [ ] Scan `/noticeboard` for outdated current notices
- [ ] Verify coordinator list on `/people` with administration
- [ ] Confirm homepage `homeFaq` Shiksha edition dates match official program comms
- [ ] Check external Shiksha links (HTTP 200)

### Quality

- [ ] Run internal link spot-check: structure → cells → events → contribute/contact
- [ ] Remove or relabel TBA events that are cancelled (add statusNote)
- [ ] Workshop page still marked registration closed for archive
- [ ] No duplicate notices for same event

### Trust

- [ ] Contact emails/phones on `/contact` still valid
- [ ] Director message and photo current
- [ ] No contradictory dates between upcoming and past listings

### Technical (light)

- [ ] `npm run build` passes after any content edits
- [ ] If registry edited: spot-check one slideshow cell + one simple cell

---

## 8. Annual Content Audit Checklist

**Target:** Once per year (recommend Q4). **Owner:** DHE leadership + communications + technical support.

### Cell pages (all slugs in `registry.json`)

- [ ] Each objective/footnote still approved by cell coordinator
- [ ] Slides/images still appropriate (slideshow cells)
- [ ] Enrichment FAQs do not contradict registry
- [ ] Related cell links still organizationally correct

### Institutional pages

- [ ] Homepage vision/stats (2021, 2023, NEP) still accurate
- [ ] Director's message reflects current priorities
- [ ] Structure chart matches reporting lines
- [ ] Membership benefits and account details on `/contribute` and `/accountdetails`

### Event archives

- [ ] Past events table complete for prior year
- [ ] Upcoming page has no orphan “Planned” rows older than 12 months without note
- [ ] Workshop archive policy still correct (add new archive only if real workshop)

### Publications & notices

- [ ] Firebase notice backlog reviewed for removal candidates
- [ ] Journals/books pages (`/journals`, `/books`) reviewed if used

### Findings log

| Date | Page | Issue | Action | Owner | Done |
|------|------|-------|--------|-------|------|
| | | | | | |

### Obsolete / duplicate content criteria

- **Obsolete:** Dates passed, program discontinued, coordinator left, contact invalid.
- **Duplicate:** Same event on upcoming and past with conflicting dates; two notices for one workshop.
- **Missing:** Completed national program not in past events; new cell in org chart without registry entry.

---

## 9. Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| Stale upcoming events | High | Quarterly review; archived label policy |
| Past events not updated | Medium | Event cell adds row after each program |
| Notice duplication | Medium | Pre-publish search; single source in Firebase |
| Registry vs people mismatch | Medium | Annual audit; update both in one change request |
| FAQ/schema drift (homepage) | Medium | Edit only `homeFaq` in `content.ts`; one reviewer |
| Invented claims in registry | High | Coordinator + communications sign-off |
| Contact info outdated | High | Quarterly trust checklist |
| Firebase unauthorized publish | High | Maintain `notice-admin.ts` allowlist; see `FIREBASE_SECURITY.md` |
| Enrichment over-generic | Low | Acceptable; change registry for specificity |
| Technical edit breaks SEO registry | Medium | Do not edit `pages-registry` without communications approval |

---

## 10. Validation (this program)

| Constraint | Status |
|------------|--------|
| Routes unchanged | Yes — documentation only |
| Metadata / sitemap / SEO registry architecture | Unchanged |
| Dynamic cell architecture | Unchanged |
| Firebase / APIs | Unchanged |
| No new SEO waves | Yes — editorial operations only |

---

## Related internal docs

- `docs/FIREBASE_SECURITY.md` — notice admin access
- `docs/ANTD_SCOPE_AUDIT.md` — notice board UI scope
- `docs/IMAGE_OPTIMIZATION_AUDIT.md` — media performance

---

## Summary

Growth after SEO implementation comes from **accurate institutional publishing**: events, notices, coordinator data, and cell mandates kept current in their documented sources. Structural SEO work is complete; this operating model is the long-term maintenance path.
