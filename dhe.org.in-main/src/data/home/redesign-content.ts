/** Homepage v2 — card-first content for product redesign */

export const homeWhyPillars = [
  {
    title: "National Platform",
    description: "25 cells advancing holistic education, innovation, and Bharatiya values across India.",
    icon: "academic" as const,
    href: "/structure",
  },
  {
    title: "Year-Round Programs",
    description: "Olympiads, workshops, publications, camps, and CSR — not only annual summits.",
    icon: "events" as const,
    href: "/programs",
  },
  {
    title: "Research & Impact",
    description: "1,200+ papers, 500+ institutions, and measurable student outcomes nationwide.",
    icon: "journal" as const,
    href: "/publications",
  },
  {
    title: "Trusted Institution",
    description: "VBITR Trust with published deed, 80G donations, and transparent governance.",
    icon: "leadership" as const,
    href: "/transparency",
  },
] as const;

export const homeJourneyMilestones = [
  { year: "2021", label: "Founded under Vidya Bharti Punjab" },
  { year: "2023", label: "National expansion under VBITR Trust" },
  { year: "2024", label: "SMK editions & institutional MoUs" },
  { year: "2025", label: "DHE English Olympiad — 10,040 students" },
  { year: "2026", label: "SMK 6.0 at NIT Hamirpur · global outreach" },
] as const;

export const homeTrustBadges = [
  "VBITR Trust",
  "NEP 2020 Aligned",
  "Section 80G",
  "25 National Cells",
  "Vidya Bharati",
] as const;

export const homePartnerHighlights = [
  { name: "CSIR–CSIO", context: "Innovation workshops" },
  { name: "IIT / NIT / INI", context: "Academic conclaves" },
  { name: "Vidya Bharati", context: "National network" },
  { name: "pub.dhe.org.in", context: "Research journals" },
] as const;

/** Featured cells on homepage (full list on /structure) */
export const homeFeaturedCellSlugs = [
  "rd",
  "atl",
  "udyam",
  "publication",
  "event",
  "csr",
  "olympiad",
  "ipr",
  "it",
  "hei",
  "super100",
  "parenting",
] as const;

/** National presence map — relative positions on simplified India SVG (viewBox 0–100) */
export const homeNationalMapPoints = [
  { id: "punjab", label: "Punjab", x: 32, y: 22, size: "lg" as const },
  { id: "hp", label: "Himachal Pradesh", x: 36, y: 16, size: "md" as const },
  { id: "delhi", label: "Delhi NCR", x: 38, y: 26, size: "md" as const },
  { id: "rajasthan", label: "Rajasthan", x: 24, y: 34, size: "md" as const },
  { id: "gujarat", label: "Gujarat", x: 18, y: 48, size: "sm" as const },
  { id: "maharashtra", label: "Maharashtra", x: 28, y: 58, size: "lg" as const },
  { id: "karnataka", label: "Karnataka", x: 30, y: 72, size: "md" as const },
  { id: "kerala", label: "Kerala", x: 32, y: 88, size: "sm" as const },
  { id: "tn", label: "Tamil Nadu", x: 38, y: 84, size: "md" as const },
  { id: "wb", label: "West Bengal", x: 58, y: 48, size: "md" as const },
  { id: "odisha", label: "Odisha", x: 52, y: 58, size: "sm" as const },
  { id: "up", label: "Uttar Pradesh", x: 42, y: 34, size: "lg" as const },
  { id: "bihar", label: "Bihar", x: 52, y: 38, size: "md" as const },
  { id: "assam", label: "North-East", x: 68, y: 36, size: "md" as const },
] as const;

export const homePartnerLogos = [
  {
    id: "vidya-bharati",
    name: "Vidya Bharati",
    abbr: "VB",
    context: "National education network",
    color: "#ea580c",
  },
  {
    id: "vbitr",
    name: "VBITR Trust",
    abbr: "VBITR",
    context: "Governing trust · 80G",
    color: "#002d62",
  },
  {
    id: "csir",
    name: "CSIR–CSIO",
    abbr: "CSIR",
    context: "Innovation workshops",
    color: "#0f766e",
  },
  {
    id: "nit",
    name: "NIT Hamirpur",
    abbr: "NIT",
    context: "SMK 6.0 host · 2026",
    color: "#7c3aed",
  },
  {
    id: "iit-ini",
    name: "IIT / NIT / INI",
    abbr: "INI",
    context: "Academic conclaves",
    color: "#0369a1",
  },
  {
    id: "isro",
    name: "ISRO",
    abbr: "ISRO",
    context: "Research leadership",
    color: "#b45309",
  },
  {
    id: "pub",
    name: "pub.dhe.org.in",
    abbr: "PUB",
    context: "Research journals",
    color: "#be123c",
  },
] as const;

export const homeTestimonials = [
  {
    quote:
      "DHE Olympiads and workshops gave our students a national stage beyond classroom exams — structured, values-aligned, and measurable.",
    name: "School Principal",
    role: "Punjab · DHE English Olympiad partner",
  },
  {
    quote:
      "Shiksha Mahakumbh brings policymakers, scientists, and educators into one forum — rare for an institution rooted in Bharatiya values.",
    name: "Faculty delegate",
    role: "SMK 5.0 · academic conclave",
  },
  {
    quote:
      "Transparent trust documents and 80G donation pathways build confidence for institutions partnering with VBITR Trust.",
    name: "Institutional donor",
    role: "CSR & membership engagement",
  },
] as const;
