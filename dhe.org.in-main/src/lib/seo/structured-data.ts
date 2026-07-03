import type { FaqItem } from "@/lib/cms/home-faq-content";
import {
  dheOfficialContact,
  dheOfficeAddress,
  vbitrTrust,
} from "@/data/institution/receipt-and-lmc";
import { homeFaq } from "@/data/home/content";
import { siteConfig } from "./site-metadata";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: [siteConfig.shortName, "DHE", "Vidya Bharti DHE"],
    url: siteConfig.url,
    logo: siteConfig.ogImage,
    description: defaultMetadataDescription(),
    foundingDate: "2021",
    parentOrganization: {
      "@type": "Organization",
      name: vbitrTrust.legalName,
      alternateName: vbitrTrust.shortName,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: dheOfficeAddress.line1,
      addressLocality: dheOfficeAddress.city,
      addressRegion: dheOfficeAddress.state,
      postalCode: dheOfficeAddress.pincode,
      addressCountry: "IN",
    },
    telephone: dheOfficialContact.phone,
    email: dheOfficialContact.email,
    sameAs: [
      "https://www.facebook.com/profile.php?id=100090170940886",
      "https://www.linkedin.com/company/department-of-holistic-education/",
      "https://www.instagram.com/dhebharat",
      "https://twitter.com/DHEBharat1",
      "https://www.youtube.com/@DepartmentofHolisticEducation",
      "https://www.rase.co.in",
      "https://pub.dhe.org.in",
    ],
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "AdministrativeArea", name: "South Asia" },
      { "@type": "Place", name: "Worldwide" },
    ],
    availableLanguage: ["en", "hi"],
    knowsAbout: [
      "Holistic Education",
      "NEP 2020",
      "Viksit Bharat",
      "Vishwa Guru Bharat",
      "DHE Olympiads",
      "Punjab Super 100",
      "Shiksha Mahakumbh",
      "Educational Innovation",
      "Educational Research",
      "Academic Publications",
      "Vidya Bharati",
      "International Education Collaboration",
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
    inLanguage: ["en-IN", "hi-IN"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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

export function getHomeFaqSchema(items: FaqItem[] = [...homeFaq]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function getHomePageGraph(faqItems?: FaqItem[]) {
  const faq = faqItems?.length ? faqItems : [...homeFaq];
  return {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationSchema(),
      getWebSiteSchema(),
      getBreadcrumbSchema(),
      getHomeFaqSchema(faq),
    ],
  };
}

function defaultMetadataDescription() {
  return "Department of Holistic Education (DHE) advances holistic learning, innovation, leadership, research, and Bharatiya values through 25 national cells, year-round programs, NEP 2020 alignment, and Shiksha Mahakumbh Abhiyan for Viksit Bharat and global academic collaboration.";
}
