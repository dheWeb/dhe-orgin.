"use client";

import Link from "next/link";
import { AssetCard } from "@/components/ui/AssetCard";

import { vbitrTrust } from "@/data/institution/receipt-and-lmc";

const cardData = [
  {
    title: "Department of Holistic Education",
    accountname: "Department of Holistic Education",
    accountnumber: "42529022841",
    bank: "State Bank of India",
    branch: "Chandigarh Main Branch",
    ifsc: "SBIN0000628",
    upiid: "holisticeducation@sbi",
    image: "/logos/dhe.webp",
    previewLink: "/accounts/dhe.pdf",
    downloadLink: "/accounts/dhe.pdf",
  },
  {
    title: "Shiksha Mahakumbh",
    accountname: "Shiksha Mahakumbh",
    accountnumber: "42563560855",
    bank: "State Bank of India",
    branch: "Chandigarh Main Branch",
    ifsc: "SBIN0000628",
    upiid: "shikshamahakumbh@sbi",
    image: "/accounts/sm.png",
    previewLink: "/accounts/sm.pdf",
    downloadLink: "/accounts/sm.pdf",
  },
  {
    title: `${vbitrTrust.shortName} (80G donations)`,
    accountname: vbitrTrust.legalName,
    accountnumber: "Use Razorpay on donation page",
    bank: "Settled via Razorpay",
    branch: "—",
    ifsc: "—",
    upiid: "—",
    image: "/logos/dhe.webp",
    previewLink: vbitrTrust.approval80G.documentPath,
    downloadLink: vbitrTrust.approval80G.documentPath,
  },
];

const assistanceCtas = [
  { href: "/contact", label: "Contact DHE" },
  { href: "/donation", label: "Donation Page" },
  { href: "/contribute", label: "Membership Page" },
] as const;

const beforeContributionChecklist = [
  "Verify account name, number, IFSC, and UPI details against the official cards below before transferring funds.",
  "Include reference or purpose information in your transaction where applicable, as directed by DHE.",
  "Keep your bank or UPI payment confirmation for your records.",
  "Contact DHE through the official contact page if you need clarification before paying.",
] as const;

export default function Accounts() {
  return (
    <div className="min-w-0 bg-white">
      <div className="dhe-container py-6 sm:py-10 space-y-8 sm:space-y-10">
        <header className="text-center max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-color">
            Official Account Details
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Verified banking and UPI information for contributions to the
            Department of Holistic Education and related official accounts.
          </p>
        </header>

        <section aria-labelledby="official-contribution-heading" className="max-w-3xl mx-auto">
          <h2 id="official-contribution-heading" className="text-xl font-semibold text-primary-color">
            Official Contribution Information
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
            The account cards below display official DHE contribution channels.
            Please verify all details on this page before making a payment.
          </p>
          <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
            After completing a transfer, preserve your transaction record. For
            donation reporting, use the{" "}
            <Link href="/donation" className="text-orange-700 font-medium hover:underline">
              donation page
            </Link>
            .
          </p>
        </section>

        <section
          aria-labelledby="before-contribution-heading"
          className="max-w-3xl mx-auto rounded-lg border border-orange-100 bg-orange-50/40 p-4 sm:p-6"
        >
          <h2 id="before-contribution-heading" className="text-xl font-semibold text-primary-color">
            Before Making a Contribution
          </h2>
          <ul className="mt-4 list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700" role="list">
            {beforeContributionChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="account-cards-heading">
          <h2 id="account-cards-heading" className="text-xl font-semibold text-primary-color text-center mb-4">
            Accounts Details with QR Code
          </h2>
          <div className="flex flex-wrap justify-center gap-4 p-2 sm:p-4">
            {cardData.map((data) => (
              <AssetCard
                key={data.title}
                title={data.title}
                imageSrc={data.image}
                previewLink={data.previewLink}
                downloadLink={data.downloadLink}
              >
                <dl className="mt-3 space-y-1 text-sm text-gray-800">
                  <div><dt className="inline font-semibold">Account Name: </dt><dd className="inline">{data.accountname}</dd></div>
                  <div><dt className="inline font-semibold">Account Number: </dt><dd className="inline">{data.accountnumber}</dd></div>
                  <div><dt className="inline font-semibold">Bank: </dt><dd className="inline">{data.bank}</dd></div>
                  <div><dt className="inline font-semibold">Branch: </dt><dd className="inline">{data.branch}</dd></div>
                  <div><dt className="inline font-semibold">IFSC: </dt><dd className="inline">{data.ifsc}</dd></div>
                  <div><dt className="inline font-semibold">UPI ID: </dt><dd className="inline">{data.upiid}</dd></div>
                </dl>
              </AssetCard>
            ))}
          </div>
        </section>

        <section aria-labelledby="assistance-accounts-heading" className="max-w-3xl mx-auto text-center">
          <h2 id="assistance-accounts-heading" className="text-xl font-semibold text-primary-color">
            Need Assistance?
          </h2>
          <div className="mt-5 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            {assistanceCtas.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className="dhe-btn-primary text-sm px-5 py-2.5 min-h-11 inline-flex items-center justify-center"
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
