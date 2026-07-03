import Link from "next/link";
import { vbitrTrust } from "@/data/institution";

const trustLinks: {
  href: string;
  label: string;
  detail: string;
  external?: boolean;
}[] = [
  {
    href: "/transparency",
    label: "Transparency & accountability",
    detail: "Trust deed, 80G & 12A certificates",
  },
  {
    href: vbitrTrust.trustDeed.documentPath,
    label: "VBITR Trust Deed",
    detail: `Registered ${vbitrTrust.registrationDate}`,
    external: true,
  },
  {
    href: "/donation",
    label: "Donate with 80G benefit",
    detail: `PAN ${vbitrTrust.pan}`,
  },
  {
    href: "/documents/dhe-english-olympiad.pdf",
    label: "DHE English Olympiad",
    detail: "10,040+ students — brochure (PDF)",
    external: true,
  },
] ;

export default function HomeTrustStrip() {
  return (
    <section
      aria-labelledby="home-trust-strip-heading"
      className="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 via-white to-blue-50 p-4 sm:p-5"
    >
      <h2
        id="home-trust-strip-heading"
        className="text-sm sm:text-base font-semibold text-gray-900"
      >
        Institutional trust &amp; global programs
      </h2>
      <p className="mt-1 text-xs sm:text-sm text-gray-600 max-w-3xl">
        DHE operates under {vbitrTrust.shortName} with published trust documents,
        tax-exempt donations, and year-round national programs open to institutions
        across India and partner collaborations worldwide.
      </p>
      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3" role="list">
        {trustLinks.map((item) => (
          <li key={item.href}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full rounded-lg border border-white bg-white/90 px-3 py-2.5 hover:border-orange-300 hover:shadow-sm min-h-11"
              >
                <span className="text-sm font-semibold text-orange-700">
                  {item.label} ↗
                </span>
                <span className="mt-0.5 block text-xs text-gray-600">{item.detail}</span>
              </a>
            ) : (
              <Link
                href={item.href}
                className="block h-full rounded-lg border border-white bg-white/90 px-3 py-2.5 hover:border-orange-300 hover:shadow-sm min-h-11"
              >
                <span className="text-sm font-semibold text-orange-700">{item.label}</span>
                <span className="mt-0.5 block text-xs text-gray-600">{item.detail}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
