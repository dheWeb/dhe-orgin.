import { FAQAccordion } from "@/components/ui/accordion";
import { SectionHeader } from "./SectionHeader";
import { FadeIn } from "./FadeIn";

interface FAQSectionProps {
  items: { question: string; answer: string }[];
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
}

export function FAQSection({
  items,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about TEJAS.",
  showHeader = true,
}: FAQSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <FadeIn>
            <SectionHeader title={title} subtitle={subtitle} />
          </FadeIn>
        )}
        <FadeIn delay={0.1}>
          <FAQAccordion items={items} />
        </FadeIn>
      </div>
    </section>
  );
}
