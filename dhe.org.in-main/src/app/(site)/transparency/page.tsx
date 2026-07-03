import Link from "next/link";
import { vbitrTrust } from "@/data/institution";

export default function TransparencyPage() {
  return (
    <div className="dhe-container py-10 max-w-3xl mx-auto prose prose-gray">
      <h1 className="text-2xl font-bold text-primary-color not-prose">
        Transparency &amp; accountability
      </h1>
      <p className="text-gray-700 leading-relaxed not-prose">
        The Department of Holistic Education operates under {vbitrTrust.shortName} (
        {vbitrTrust.legalName}). Donations are processed via Razorpay with official receipts
        emailed to donors.
      </p>

      <h2 className="text-lg font-semibold text-gray-900 not-prose mt-8">Tax &amp; trust documents</h2>
      <ul className="not-prose space-y-2 text-sm">
        <li>
          <a
            href={vbitrTrust.approval80G.documentPath}
            className="text-orange-700 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            80G approval certificate
          </a>
        </li>
        <li>
          <a
            href={vbitrTrust.registration12A.documentPath}
            className="text-orange-700 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            12A registration certificate
          </a>
        </li>
        <li>
          <a
            href={vbitrTrust.trustDeed.documentPath}
            className="text-orange-700 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            VBITR Trust Deed (registered {vbitrTrust.registrationDate})
          </a>
        </li>
        <li>
          <Link href="/accountdetails" className="text-orange-700 hover:underline">
            Bank &amp; UPI account details
          </Link>
        </li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-900 not-prose mt-8">Program documents</h2>
      <ul className="not-prose space-y-2 text-sm">
        <li>
          <a
            href="/documents/dhe-english-olympiad.pdf"
            className="text-orange-700 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            DHE English Olympiad — inaugural edition brochure
          </a>
        </li>
        <li>
          <a
            href="/documents/idea-of-enterprises-workshop.pdf"
            className="text-orange-700 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            From Idea to Enterprise — IPR workshop brochure
          </a>
        </li>
        <li>
          <a
            href="/documents/entrepreneurship-workshop-may-2024.pdf"
            className="text-orange-700 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Innovation &amp; Entrepreneurship Workshop (May 2024)
          </a>
        </li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-900 not-prose mt-8">Form 10BE (Section 80G)</h2>
      <p className="text-sm text-gray-700 leading-relaxed not-prose">
        For donations eligible under Section 80G, {vbitrTrust.shortName} issues official receipts with
        unique receipt numbers (emailed after successful Razorpay payment). The trust files Form 10BE
        annually as required under Income Tax rules. Donors should retain receipt numbers and PDFs for
        ITR filing. For certificate or 10BE queries contact{" "}
        <a href="mailto:director@dhe.org.in" className="text-orange-700 hover:underline">
          director@dhe.org.in
        </a>
        .
      </p>

      <h2 className="text-lg font-semibold text-gray-900 not-prose mt-8">Policies</h2>
      <ul className="not-prose space-y-2 text-sm">
        <li>
          <Link href="/refund-policy" className="text-orange-700 hover:underline">
            Refund &amp; cancellation policy
          </Link>
        </li>
        <li>
          <Link href="/privacy-policy" className="text-orange-700 hover:underline">
            Privacy policy
          </Link>
        </li>
        <li>
          <Link href="/receipt/verify" className="text-orange-700 hover:underline">
            Verify a donation receipt
          </Link>
        </li>
      </ul>

      <p className="text-sm text-gray-600 not-prose mt-8">
        Annual transparency reports will be published here when available. For institutional
        inquiries contact{" "}
        <a href="mailto:director@dhe.org.in" className="text-orange-700 hover:underline">
          director@dhe.org.in
        </a>
        .
      </p>
    </div>
  );
}
