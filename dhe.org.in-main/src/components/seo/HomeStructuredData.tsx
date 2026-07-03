import { getHomePageGraph } from "@/lib/seo/structured-data";
import type { FaqItem } from "@/lib/cms/home-faq-content";

type Props = {
  faqItems?: FaqItem[];
};

export default function HomeStructuredData({ faqItems }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getHomePageGraph(faqItems)),
      }}
    />
  );
}
