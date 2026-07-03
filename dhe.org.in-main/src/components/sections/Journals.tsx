import Link from "next/link";

const PUB_URL = "https://pub.dhe.org.in";

export default function Journals() {
  return (
    <div className="bg-white p-4 sm:p-6 dhe-container max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold py-4 text-primary text-center">
        Journals
      </h1>

      <div className="space-y-6 text-justify text-gray-800 leading-relaxed">
        <p>
          DHE publishes and curates educational journals that preserve research,
          proceedings, and dialogue from national programs — including Shiksha
          Mahakumbh — and year-round cell initiatives.{" "}
          <strong>Viksit India</strong> is the flagship quarterly journal
          advancing holistic education aligned with NEP 2020 and Viksit Bharat.
        </p>

        <p>
          From pioneering research to practitioner perspectives, DHE publications
          document innovation across school education, teacher development, and
          institutional transformation.
        </p>

        <section aria-labelledby="journals-actions">
          <h2 id="journals-actions" className="text-lg font-semibold mb-3">
            Read &amp; submit
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <a
                href={PUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-700 font-medium underline hover:text-orange-900"
              >
                Visit the DHE Publications portal (pub.dhe.org.in)
              </a>{" "}
              for current issues, author guidelines, and submissions.
            </li>
            <li>
              <Link
                href="/publications"
                className="text-orange-700 font-medium underline hover:text-orange-900"
              >
                DHE Publications hub
              </Link>{" "}
              — books, proceedings, and related resources on this site.
            </li>
            <li>
              <Link
                href="/contact"
                className="text-orange-700 font-medium underline hover:text-orange-900"
              >
                Contact DHE
              </Link>{" "}
              for editorial board enquiries and institutional partnerships.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
