import type { Metadata } from "next";
import { brand } from "@/design-system/tokens";

const defaultDescription =
  "TEJAS — India's National Talent Development Ecosystem by the Department of Holistic Education. Olympiads, assessments, scholarships, and learning pathways for students across India.";

export const siteConfig = {
  name: brand.name,
  fullName: brand.fullName,
  description: defaultDescription,
  url: brand.url,
  ogImage: "/og/tejas-default.png",
  locale: "en_IN",
  alternateLocale: "hi_IN",
} as const;

export function createMetadata({
  title,
  description = defaultDescription,
  path = "",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const pageTitle = title ? `${title} | ${brand.name}` : `${brand.name} — ${brand.fullName}`;
  const url = `${siteConfig.url}${path}`;

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        en: url,
        hi: `${url}?lang=hi`,
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      title: pageTitle,
      description,
      siteName: brand.name,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    keywords: [
      "TEJAS",
      "DHE Olympiads",
      "talent assessment India",
      "national olympiad",
      "Department of Holistic Education",
      "student olympiad",
      "mock tests",
      "scholarships",
    ],
  };
}
