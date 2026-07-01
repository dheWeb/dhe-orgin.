import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site-metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/noticeboarddata",
          "/donationdatadekh",
          "/WD",
          "/Members",
          "/registrationForm",
          "/comingsoon",
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
