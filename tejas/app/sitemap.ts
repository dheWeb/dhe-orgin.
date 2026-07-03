import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/seo";
import { getAllOlympiadSlugs } from "@/data/olympiad-details";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/about",
    "/olympiads",
    "/editions",
    "/editions/previous",
    "/prepare",
    "/prepare/mock-tests",
    "/resources",
    "/schools",
    "/rankings",
    "/hall-of-fame",
    "/scholarships",
    "/faq",
    "/contact",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...getAllOlympiadSlugs().map((slug) => ({
      url: `${base}/olympiads/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
