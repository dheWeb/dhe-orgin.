import type { CellDefinition } from "@/data/cells/types";
import { getCellEnrichment } from "@/data/cells/enrichment";
import { getCellSeoEntry } from "@/lib/seo/pages-registry";
import { siteConfig } from "@/lib/seo/site-metadata";

export function getWebPageSchema(path: string, name: string, description: string) {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;

  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
  };
}

/** Breadcrumb trail aligned with visible hierarchy (Home → Structure → Cell) */
export function getCellBreadcrumbItems(cell: CellDefinition, slug: string) {
  return [
    { name: "Home", path: "/" },
    { name: "Cells & Organizational Structure", path: "/structure" },
    { name: cell.seoTitle.trim(), path: `/cells/${slug}` },
  ];
}

/**
 * WebPage + AboutPage for a cell — properties derived from registry and PAGE_SEO only.
 */
export function getCellWebPageSchema(cell: CellDefinition, slug: string) {
  const entry = getCellSeoEntry(slug);
  const url = `${siteConfig.url}/cells/${slug}`;
  const primary = cell.blocks[0];
  const mandate = primary?.objective?.trim() ?? "";

  return {
    "@type": ["WebPage", "AboutPage"],
    "@id": `${url}#webpage`,
    url,
    name: entry.title,
    description: entry.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    mainEntity: {
      "@type": "Thing",
      name: cell.displayTitle.trim(),
      description: mandate || entry.description,
    },
  };
}

/**
 * FAQPage — questions and answers must match visible FAQ markup exactly (sourced from getCellEnrichment).
 */
export function getCellFaqPageSchema(cell: CellDefinition) {
  const { faqs } = getCellEnrichment(cell);
  if (faqs.length === 0) return null;

  const url = `${siteConfig.url}/cells/${cell.slug}`;

  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url: `${url}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getCellStructuredDataGraph(
  cell: CellDefinition,
  slug: string
): Record<string, unknown>[] {
  const graph: Record<string, unknown>[] = [
    getCellWebPageSchema(cell, slug),
  ];

  const faq = getCellFaqPageSchema(cell);
  if (faq) graph.push(faq);

  return graph;
}
