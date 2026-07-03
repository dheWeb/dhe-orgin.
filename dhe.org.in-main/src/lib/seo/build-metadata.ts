import type { Metadata } from "next";
import { siteConfig } from "./site-metadata";
import { getCellSeoEntry, PAGE_SEO, type PageSeoEntry } from "./pages-registry";

type PageKey = keyof typeof PAGE_SEO;

function buildFromEntry(entry: PageSeoEntry): Metadata {
  const canonicalPath = entry.path === "/" ? "/" : entry.path;
  const url = `${siteConfig.url}${canonicalPath === "/" ? "" : canonicalPath}`;
  const ogImagePath = entry.ogImage ?? siteConfig.ogImage;
  const ogImageUrl = ogImagePath.startsWith("http")
    ? ogImagePath
    : `${siteConfig.url}${ogImagePath.startsWith("/") ? ogImagePath : `/${ogImagePath}`}`;

  const title: Metadata["title"] =
    entry.path === "/"
      ? {
          absolute: `${entry.title} | ${siteConfig.name}`,
        }
      : entry.title;

  const alternates: Metadata["alternates"] = {
    canonical: canonicalPath,
    ...(entry.path === "/"
      ? {
          languages: {
            "en-IN": siteConfig.url,
            "hi-IN": `${siteConfig.url}/hi`,
            "x-default": siteConfig.url,
          },
        }
      : {}),
  };

  return {
    title,
    description: entry.description,
    alternates,
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
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: entry.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
      images: [ogImageUrl],
      site: siteConfig.twitterHandle,
    },
  };
}

/** Build Metadata from any SEO entry (programs, cells, etc.) */
export function buildMetadataFromEntry(entry: PageSeoEntry): Metadata {
  return buildFromEntry(entry);
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
