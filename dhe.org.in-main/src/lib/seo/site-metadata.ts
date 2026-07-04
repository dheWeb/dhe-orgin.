import type { Metadata } from "next";

const siteUrl = "https://www.dhe.org.in";
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const siteConfig = {
  name: "Department of Holistic Education (DHE)",
  shortName: "DHE Bharat",
  url: siteUrl,
  ogImage: `${siteUrl}/opengraph-image`,
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
    "Department of Holistic Education (DHE) is India's national holistic education platform — 25 cells, DHE Olympiads, publications, CSR, NEP 2020, Viksit Bharat, and global academic collaboration. Shiksha Mahakumbh is the flagship summit.",
  keywords: [
    "Department of Holistic Education",
    "DHE Bharat",
    "DHE Olympiads",
    "holistic education India",
    "NEP 2020",
    "Viksit Bharat",
    "Vidya Bharti",
    "Shiksha Mahakumbh",
    "Indian education innovation",
    "educational research India",
    "Bharatiya education",
    "international education collaboration",
    "South Asia education",
    "VBITR Trust",
    "80G donation education",
    "Punjab Super 100",
    "academic publications India",
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
    canonical: siteConfig.url,
    languages: {
      "en-IN": siteConfig.url,
      "hi-IN": `${siteConfig.url}/hi`,
      "x-default": siteConfig.url,
    },
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
      "Empowering Bharat through holistic education, 25 national cells, Olympiads, publications, innovation, and global academic collaboration.",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Department of Holistic Education — national platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Department of Holistic Education (DHE)",
    description:
      "National Educational Transformation Platform for Viksit Bharat.",
    images: [`${siteConfig.url}/opengraph-image`],
  },
  icons: {
    icon: "/dhe.webp",
  },
  category: "education",
  ...(gscVerification && { verification: { google: gscVerification } }),
};
