# AUD-001 … AUD-280 — Triage summary

**Last updated:** 2026-07-03  
**Site:** https://www.dhe.org.in  
**Register:** `docs/AUD_REGISTER_STATUS.md` — **272 FIXED**, **8 WONTFIX**, **0 OPEN**, **0 PARTIAL**

---

## WONTFIX — intentional (8)

| AUD | Reason |
|-----|--------|
| AUD-047 / AUD-134 | `spritual` slug kept; `/cells/spiritual` → redirect |
| AUD-145 | `tentative_schdule.xlsx` filename kept; redirect alias exists |
| AUD-050 | `comingsoon` → redirect `/structure` |
| AUD-224–226 | GTM, newsletter, share buttons — out of beta scope |
| AUD-214 | Firebase App Check — Firebase retired |

---

## Owner follow-up (not blocking code closure)

| Item | Notes |
|------|--------|
| K-16 / AUD-198 | Re-verify Lighthouse Performance on production URL after deploy |
| K-18 | Disable Firestore in Firebase console |
| I5-04 | Confirm Supabase backup/PITR on plan |
| I5-10 | 30-day ops sign-off |
| §L | Legal Hindi+English policy sign-off |
| Brevo DNS | SPF/DKIM at registrar |

---

## Jul 2026 closure highlights

- **AUD-141** Trust deed PDF → `/documents/trust-deed-vbitr.pdf` + `/transparency`
- **AUD-030 / AUD-165** PAN required on donation form
- **AUD-043** OG images 1200×630 metadata
- **AUD-044** JSON-LD breadcrumbs on program detail pages
- **AUD-086** Visible breadcrumbs site-wide
- **AUD-028** Visitor counter privacy notice in footer
- **AUD-033** Botpress retention disclosed in privacy policy
- **AUD-205** Health cron + `/api/health`
- **AUD-220** Staging documented in `docs/STAGING.md`
- Program PDFs: English Olympiad, Idea to Enterprise, Entrepreneurship workshop
- Programs registry: exhibition, cultural, best-practices (+ prior E-cycle, MTC, etc.)

---

## Re-verify after deploy

1. `GET /api/health` → ok  
2. `GET /documents/trust-deed-vbitr.pdf` → 200  
3. Donation ₹1 → receipt email + PDF  
4. `/transparency` → trust deed + program PDF links  
5. Lighthouse on https://www.dhe.org.in
