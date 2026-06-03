import Link from "next/link";
import type { CellDefinition } from "@/data/cells/types";
import { getCellEnrichment } from "@/data/cells/enrichment";

type Props = {
  cell: CellDefinition;
};

export default function CellEnrichmentSections({ cell }: Props) {
  const content = getCellEnrichment(cell);

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 pb-10 space-y-8 sm:space-y-10 border-t border-gray-200 mt-8 pt-8">
      <section aria-labelledby={`about-${cell.slug}`}>
        <h2
          id={`about-${cell.slug}`}
          className="text-xl font-semibold text-primary-color"
        >
          About This Cell
        </h2>
        <div className="mt-3 space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
          {content.aboutParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section aria-labelledby={`activities-${cell.slug}`}>
        <h2
          id={`activities-${cell.slug}`}
          className="text-xl font-semibold text-primary-color"
        >
          Key Activities
        </h2>
        <div className="mt-4 space-y-5">
          {content.activityGroups.map((group) => (
            <div key={group.heading}>
              <h3 className="text-base font-semibold text-gray-900">
                {group.heading}
              </h3>
              <ul
                className="mt-2 list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700"
                role="list"
              >
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby={`students-${cell.slug}`}>
        <h2
          id={`students-${cell.slug}`}
          className="text-xl font-semibold text-primary-color"
        >
          Student Opportunities
        </h2>
        <ul
          className="mt-3 list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700"
          role="list"
        >
          {content.studentOpportunities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-gray-600">
          For current calls and notices, see the{" "}
          <Link
            href="/noticeboard"
            className="text-orange-700 font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
          >
            DHE notice board
          </Link>
          ,{" "}
          <Link
            href="/pastevent"
            className="text-orange-700 font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
          >
            past events
          </Link>
          , and{" "}
          <Link
            href="/upcomingevent"
            className="text-orange-700 font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
          >
            upcoming events
          </Link>
          .
        </p>
      </section>

      <section aria-labelledby={`institutional-${cell.slug}`}>
        <h2
          id={`institutional-${cell.slug}`}
          className="text-xl font-semibold text-primary-color"
        >
          Contribution to Institutional Development
        </h2>
        <div className="mt-3 space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
          {content.institutionalDevelopment.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section aria-labelledby={`related-${cell.slug}`}>
        <h2
          id={`related-${cell.slug}`}
          className="text-xl font-semibold text-primary-color"
        >
          Related DHE Initiatives
        </h2>
        <h3 className="mt-4 text-base font-semibold text-gray-900">
          Institutional pages
        </h3>
        <ul className="mt-2 flex flex-wrap gap-2" role="list">
          {content.relatedInitiatives.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-md border border-orange-200 bg-orange-50/50 px-3 py-2 text-sm font-medium text-orange-800 hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <h3 className="mt-5 text-base font-semibold text-gray-900">
          Related cells
        </h3>
        <ul className="mt-2 flex flex-wrap gap-2" role="list">
          {content.relatedCells.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-800 hover:border-orange-400 hover:text-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/people"
              className="inline-flex min-h-11 items-center rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-800 hover:border-orange-400 hover:text-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              Cell Co-ordinators directory
            </Link>
          </li>
        </ul>
      </section>

      <section aria-labelledby={`faq-${cell.slug}`}>
        <h2
          id={`faq-${cell.slug}`}
          className="text-xl font-semibold text-primary-color"
        >
          Frequently Asked Questions
        </h2>
        <dl className="mt-4 space-y-4">
          {content.faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-lg border border-gray-100 bg-gray-50/80 p-4"
            >
              <dt className="text-sm font-semibold text-gray-900">
                {faq.question}
              </dt>
              <dd className="mt-2 text-sm text-gray-700 leading-relaxed">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
