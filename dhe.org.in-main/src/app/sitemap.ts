import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site-metadata";
import { getAllPublicPaths } from "@/lib/seo/pages-registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = process.env.SITEMAP_LAST_MODIFIED
    ? new Date(process.env.SITEMAP_LAST_MODIFIED)
    : new Date("2026-06-30");

  return getAllPublicPaths().map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/cells/") ? 0.6 : 0.7,
  }));
}
