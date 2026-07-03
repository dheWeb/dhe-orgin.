import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site-metadata";
import { getAllPublicPaths } from "@/lib/seo/pages-registry";

const HOME_UPDATED = new Date("2026-06-30");
const PROGRAMS_UPDATED = new Date("2026-06-30");
const CELLS_UPDATED = new Date("2026-06-01");
const LEGAL_UPDATED = new Date("2026-06-30");

function pathLastModified(path: string): Date {
  if (process.env.SITEMAP_LAST_MODIFIED) {
    return new Date(process.env.SITEMAP_LAST_MODIFIED);
  }
  if (path === "/") return HOME_UPDATED;
  if (path.startsWith("/programs/")) return PROGRAMS_UPDATED;
  if (path.startsWith("/cells/")) return CELLS_UPDATED;
  if (
    path === "/privacy-policy" ||
    path === "/terms" ||
    path === "/accessibility" ||
    path === "/refund-policy"
  ) {
    return LEGAL_UPDATED;
  }
  return HOME_UPDATED;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllPublicPaths().map((path) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified: pathLastModified(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/cells/") ? 0.6 : 0.7,
  }));
}
