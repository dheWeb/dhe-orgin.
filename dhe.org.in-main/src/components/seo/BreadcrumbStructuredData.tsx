import PageStructuredData from "@/components/seo/PageStructuredData";
import { getBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { getWebPageSchema } from "@/lib/seo/cell-schema";
import {
  PAGE_BREADCRUMB_TRAILS,
  type PageBreadcrumbKey,
} from "@/lib/seo/page-breadcrumbs";
import { PAGE_SEO } from "@/lib/seo/pages-registry";

const TRAIL_SEO_KEY: Record<
  PageBreadcrumbKey,
  keyof typeof PAGE_SEO
> = {
  messages: "messages",
  structure: "structure",
  pastevent: "pastevent",
  upcomingevent: "upcomingevent",
  workshop: "workshop",
  contribute: "contribute",
  contact: "contact",
  people: "people",
};

type Props = {
  trail: PageBreadcrumbKey;
};

/** Injects Organization + BreadcrumbList + WebPage JSON-LD for static pages */
export default function BreadcrumbStructuredData({ trail }: Props) {
  const items = PAGE_BREADCRUMB_TRAILS[trail];
  const entry = PAGE_SEO[TRAIL_SEO_KEY[trail]];

  return (
    <PageStructuredData
      graph={[
        getBreadcrumbSchema([...items]),
        getWebPageSchema(entry.path, entry.title, entry.description),
      ]}
    />
  );
}
