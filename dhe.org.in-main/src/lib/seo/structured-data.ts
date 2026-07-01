import { homeFaq } from "@/data/home/content";
import { siteConfig } from "./site-metadata";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: siteConfig.ogImage,
    description: defaultMetadataDescription(),
    sameAs: [
      "https://www.facebook.com/profile.php?id=100090170940886",
      "https://www.linkedin.com/company/department-of-holistic-education/",
      "https://www.instagram.com/dhebharat",
      "https://twitter.com/DHEBharat1",
      "https://www.youtube.com/@DepartmentofHolisticEducation",
    ],
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    knowsAbout: [
      "Holistic Education",
      "NEP 2020",
      "Shiksha Mahakumbh",
      "Educational Innovation",
      "Educational Research",
      "School Entrepreneurship",
      "Academic Publications",
      "Educational Events",
      "Community Outreach in Education",
      "Academic Quality in Schools",
      "Viksit Bharat",
    ],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: ["en", "hi"],
  };
}

export function getBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
    ],
  };
}

export function getHomeFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getHomePageGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationSchema(),
      getWebSiteSchema(),
      getBreadcrumbSchema(),
      getHomeFaqSchema(),
    ],
  };
}

function defaultMetadataDescription() {
  return "Department of Holistic Education (DHE) advances holistic learning, innovation, leadership, research, Bharatiya values, NEP 2020, and Shiksha Mahakumbh Abhiyan for Viksit Bharat.";
}
