import type { Metadata } from "next";

const siteUrl = "https://www.dhe.org.in";

export const siteConfig = {
  name: "Department of Holistic Education (DHE)",
  shortName: "DHE Bharat",
  url: siteUrl,
  ogImage: `${siteUrl}/logo.webp`,
  locale: "en_IN",
  twitterHandle: "@DHEBharat1",
} as const;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Department of Holistic Education (DHE) | Holistic Educational Transformation of Bharat",
    template: "%s | Department of Holistic Education (DHE)",
  },
  description:
    "Department of Holistic Education (DHE) is a national educational platform advancing holistic learning, innovation, leadership, research, Bharatiya values, NEP 2020, and Shiksha Mahakumbh Abhiyan for Viksit Bharat.",
  keywords: [
    "Department of Holistic Education",
    "DHE Bharat",
    "Shiksha Mahakumbh",
    "Vidya Bharti",
    "NEP 2020",
    "Educational Innovation",
    "Holistic Education",
    "Bharatiya Education",
    "Viksit Bharat",
    "Educational Leadership",
    "Research and Innovation",
    "Indian Education",
    "Holistic Learning",
    "Skill Development",
    "National Education",
  ],
  authors: [{ name: "Department of Holistic Education" }],
  creator: "Department of Holistic Education",
  publisher: "Department of Holistic Education",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },
  // Per-page canonical URLs are set via createPageMetadata()
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Department of Holistic Education (DHE)",
    description:
      "Empowering Bharat through holistic education, innovation, leadership, research, and Shiksha Mahakumbh Abhiyan.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 512,
        height: 512,
        alt: "Department of Holistic Education logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Department of Holistic Education (DHE)",
    description:
      "National Educational Transformation Platform for Viksit Bharat.",
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/dhe.webp",
  },
  category: "education",
};
