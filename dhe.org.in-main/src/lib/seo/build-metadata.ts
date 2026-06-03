import type { Metadata } from "next";
import { siteConfig } from "./site-metadata";
import { getCellSeoEntry, PAGE_SEO, type PageSeoEntry } from "./pages-registry";

type PageKey = keyof typeof PAGE_SEO;

function buildFromEntry(entry: PageSeoEntry): Metadata {
  const canonicalPath = entry.path === "/" ? "/" : entry.path;
  const url = `${siteConfig.url}${canonicalPath === "/" ? "" : canonicalPath}`;

  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical: canonicalPath,
    },
    robots: entry.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: entry.title,
      description: entry.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 512,
          height: 512,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
      images: [siteConfig.ogImage],
      site: siteConfig.twitterHandle,
    },
  };
}

/** Metadata for static pages registered in PAGE_SEO */
export function createPageMetadata(key: PageKey): Metadata {
  const entry = PAGE_SEO[key];
  if (!entry) {
    throw new Error(`Unknown SEO page key: ${key}`);
  }
  return buildFromEntry(entry);
}

/** Metadata for /cells/[slug] pages */
export function createCellMetadata(slug: string): Metadata {
  return buildFromEntry(getCellSeoEntry(slug));
}

export function getPageEntry(key: PageKey): PageSeoEntry {
  return PAGE_SEO[key];
}
