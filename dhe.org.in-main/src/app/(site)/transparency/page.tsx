import PageHero from "@/components/ui/PageHero";
import HomeFeatureCard from "@/components/ui/HomeFeatureCard";
import { vbitrTrust } from "@/data/institution";
import {
  transparencyPolicyCards,
  transparencyProgramCards,
  transparencyTrustCards,
} from "@/data/transparency-content";

export default function TransparencyPage() {
  return (
    <>
      <PageHero
        eyebrow="Accountability"
        title="Transparency & Accountability"
        description={`DHE operates under ${vbitrTrust.shortName} (${vbitrTrust.legalName}). Donations are processed via Razorpay with official receipts emailed to donors.`}
      />

      <div className="dhe-container py-10 sm:py-12 max-w-6xl mx-auto space-y-12">
        <section aria-labelledby="tax-docs-heading">
          <h2 id="tax-docs-heading" className="text-xl font-bold text-gray-900 mb-5">
            Tax &amp; trust documents
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="list">
            {transparencyTrustCards.map((item) => (
              <li key={item.href}>
                <HomeFeatureCard
                  href={item.href}
                  external={"external" in item && item.external}
                  title={item.title}
                  description={item.description}
                  stat={item.stat}
                />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="program-docs-heading">
          <h2 id="program-docs-heading" className="text-xl font-bold text-gray-900 mb-5">
            Program documents
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
            {transparencyProgramCards.map((item) => (
              <li key={item.href}>
                <HomeFeatureCard
                  href={item.href}
                  external
                  title={item.title}
                  description={item.description}
                  stat={item.stat}
                />
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="form-10be-heading"
          className="rounded-2xl border border-green-200 bg-green-50/60 p-6 max-w-3xl"
        >
          <h2 id="form-10be-heading" className="text-lg font-bold text-green-900">
            Form 10BE (Section 80G)
          </h2>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            For donations eligible under Section 80G, {vbitrTrust.shortName} issues official receipts
            with unique receipt numbers after successful Razorpay payment. The trust files Form 10BE
            annually. Retain receipt PDFs for ITR filing — queries to{" "}
            <a href="mailto:director@dhe.org.in" className="text-orange-700 font-medium hover:underline">
              director@dhe.org.in
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="policies-heading">
          <h2 id="policies-heading" className="text-xl font-bold text-gray-900 mb-5">
            Policies &amp; tools
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="list">
            {transparencyPolicyCards.map((item) => (
              <li key={item.href}>
                <HomeFeatureCard
                  href={item.href}
                  title={item.title}
                  description={item.description}
                />
              </li>
            ))}
          </ul>
        </section>

        <p className="text-sm text-gray-600 max-w-2xl">
          Annual transparency reports will be published here when available. Institutional inquiries:{" "}
          <a href="mailto:director@dhe.org.in" className="text-orange-700 hover:underline">
            director@dhe.org.in
          </a>
        </p>
      </div>
    </>
  );
}
