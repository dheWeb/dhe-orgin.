import { homeFaq } from "@/data/home/content";
import HomeFaqAccordion from "@/components/home/v2/HomeFaqAccordion";

/** Visible FAQ — text matches homepage FAQPage JSON-LD when CMS not overridden. */
export default function HomeFaqSection({
  items,
}: {
  items?: { question: string; answer: string }[];
}) {
  const faq = items?.length ? items : homeFaq;

  return (
    <section
      aria-labelledby="home-faq-heading"
      className="py-10 sm:py-14 border-t border-gray-200 bg-white"
    >
      <div className="dhe-container max-w-3xl">
        <h2
          id="home-faq-heading"
          className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight"
        >
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
          Quick answers about DHE&apos;s national role, programs, and Shiksha Mahakumbh.
        </p>
        <div className="mt-8">
          <HomeFaqAccordion items={[...faq]} />
        </div>
      </div>
    </section>
  );
}
