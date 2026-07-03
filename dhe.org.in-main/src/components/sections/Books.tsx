import Link from "next/link";
import Image from "next/image";

const bookSummary = `Recent Advances in School Education is a compendium of events from the inauguration to the passing of the world's first Shiksha Mahakumbh, inspired by the spirit of Kumbh culture in ancient Bharat. The inaugural National Conference on Recent Advances in School Education (RASE 2023) was organised by Sarvhitkari Educational Society in collaboration with Dr. B. R. Ambedkar National Institute of Technology Jalandhar (9–11 June 2023).`;

export default function Books() {
  return (
    <div className="bg-white p-4 sm:p-6 dhe-container max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold py-4 text-primary text-center">
        Books &amp; Proceedings
      </h1>

      <p className="text-justify text-gray-800 leading-relaxed mb-6">
        {bookSummary}
      </p>

      <p className="mb-8">
        <Link
          href="/contact"
          className="text-orange-700 underline hover:text-orange-900 font-medium"
        >
          Contact DHE
        </Link>{" "}
        to acquire a printed copy or for bulk institutional orders.
      </p>

      <div className="relative w-full max-w-md mx-auto my-8">
        <div className="book-card relative bg-white w-64 h-80 mx-auto shadow-xl rounded-lg">
          <a
            href="/Proceeding.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative w-full h-full rounded-lg overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <Image
              alt="Recent Advances in School Education book cover"
              src="/book.png"
              width={256}
              height={320}
              className="w-full h-full object-cover rounded-lg"
            />
            <span className="sr-only">Open proceedings PDF preview</span>
          </a>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          <a
            href="/Proceeding.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-700 underline hover:text-orange-900"
          >
            View proceedings (PDF)
          </a>
          {" · "}
          <Link
            href="/publications"
            className="text-orange-700 underline hover:text-orange-900"
          >
            All publications
          </Link>
        </p>
      </div>
    </div>
  );
}
