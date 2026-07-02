import { homeFaq } from "@/data/home/content";

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
      className="dhe-section-py border-b border-gray-200 bg-white"
    >
      <div className="dhe-container max-w-3xl">
        <h2
          id="home-faq-heading"
          className="text-lg font-semibold text-gray-900"
        >
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          Answers about DHE&apos;s national role and Shiksha Mahakumbh Abhiyan—aligned
          with the institutional overview above.
        </p>
        <dl className="mt-5 space-y-4">
          {faq.map((item) => (
            <div
              key={item.question}
              className="rounded-lg border border-gray-100 bg-gray-50/80 p-4"
            >
              <dt className="text-sm font-semibold text-gray-900">
                {item.question}
              </dt>
              <dd className="mt-2 text-sm text-gray-700 leading-relaxed">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
