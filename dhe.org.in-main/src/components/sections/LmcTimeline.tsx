import Link from "next/link";
import { lmcDocuments } from "@/data/institution";

function parseSortDate(date: string): number {
  const [d, m, y] = date.split("-").map(Number);
  if (!d || !m || !y) return 0;
  return new Date(y, m - 1, d).getTime();
}

export default function LmcTimeline() {
  const items = [...lmcDocuments].sort(
    (a, b) => parseSortDate(b.date) - parseSortDate(a.date)
  );

  return (
    <section
      className="dhe-container py-10 max-w-3xl mx-auto"
      aria-labelledby="lmc-timeline-heading"
    >
      <h2 id="lmc-timeline-heading" className="text-xl font-semibold text-gray-900 mb-2">
        LMC timeline
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Official nomination and coordinator letters on file, newest first.
      </p>
      <ol className="relative border-s border-gray-200 ms-3 space-y-8">
        {items.map((doc) => (
          <li key={doc.id} className="ms-6">
            <span
              className={`absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white ${
                doc.isCurrent ? "bg-orange-600" : "bg-gray-600"
              }`}
              aria-hidden
            />
            <time className="text-xs font-medium text-gray-600">{doc.date}</time>
            <h3 className="text-base font-semibold text-gray-900 mt-1">{doc.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              Ref. {doc.refNo}
              {"term" in doc && doc.term
                ? ` · Term ${doc.term.from} – ${doc.term.to}`
                : ""}
              {doc.isCurrent ? (
                <span className="ms-2 text-orange-700 font-medium">Current</span>
              ) : null}
            </p>
            <Link
              href={doc.path}
              className="inline-block mt-2 text-sm text-orange-700 hover:underline min-h-10"
              target="_blank"
              rel="noopener noreferrer"
            >
              View PDF
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
