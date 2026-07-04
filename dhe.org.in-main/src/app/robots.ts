import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site-metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api",
          "/noticeboarddata",
          "/donationdatadekh",
          "/WD",
          "/Members",
          "/registrationForm",
          "/comingsoon",
          "/beta",
          "/search",
          "/contact/thank-you",
          "/donation/thank-you",
          "/contribute/thank-you",
          "/feedback/thank-you",
          "/registrationForm/thank-you",
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
