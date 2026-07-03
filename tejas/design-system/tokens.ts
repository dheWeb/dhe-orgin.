/**
 * TEJAS Design System — Design Tokens
 * Talent Evaluation & Joint Assessment Series
 */

export const colors = {
  primary: "#E85D04",
  primarySoft: "#FFF4ED",
  primaryDark: "#C2410C",
  secondary: "#1E3A5F",
  secondaryDark: "#0F172A",
  background: "#FAF9F6",
  success: "#059669",
  gold: "#D4A017",
  text: "#1C1917",
  textMuted: "#57534E",
  border: "#E7E5E4",
} as const;

export const typography = {
  fontSans: "var(--font-jakarta)",
  fontHindi: "var(--font-noto-devanagari)",
  hero: "clamp(2.5rem, 5vw, 4.5rem)",
  h1: "clamp(2rem, 4vw, 3rem)",
  h2: "clamp(1.75rem, 3vw, 2.25rem)",
  h3: "1.5rem",
  body: "1rem",
  small: "0.875rem",
} as const;

export const spacing = {
  section: "5rem",
  sectionLg: "7rem",
  container: "1280px",
} as const;

export const radii = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.25rem",
  full: "9999px",
} as const;

export const motion = {
  durationFast: 0.2,
  durationNormal: 0.4,
  durationSlow: 0.6,
  ease: [0.22, 1, 0.36, 1] as const,
} as const;

export const brand = {
  name: "TEJAS",
  fullName: "Talent Evaluation & Joint Assessment Series",
  tagline: "Discover. Prepare. Shine.",
  parentOrg: "Department of Holistic Education",
  parentOrgShort: "DHE",
  country: "India",
  domain: "tejas.dhe.org.in",
  url: "https://tejas.dhe.org.in",
} as const;
