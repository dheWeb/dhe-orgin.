import { createMetadata } from "@/config/seo";
import { PageHero } from "@/components/shared/PageHero";
import { FAQSection } from "@/components/shared/FAQSection";
import { faqItems } from "@/data/faq";

export const metadata = createMetadata({
  title: "FAQ",
  description: "Frequently asked questions about TEJAS olympiads, registration, exams, and results.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about TEJAS."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
      <FAQSection items={faqItems} showHeader={false} />
    </>
  );
}
