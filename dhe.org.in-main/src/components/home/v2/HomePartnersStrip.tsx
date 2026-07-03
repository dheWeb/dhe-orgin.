import Image from "next/image";
import { homePartnerHighlights, homePartnerLogos, homeTrustBadges } from "@/data/home/redesign-content";

export default function HomePartnersStrip() {
  return (
    <section
      aria-labelledby="partners-heading"
      className="border-y border-gray-100 bg-white py-10 sm:py-12"
    >
      <div className="dhe-container">
        <header className="text-center max-w-2xl mx-auto mb-8">
          <h2
            id="partners-heading"
            className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight"
          >
            Partners & Recognition
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Collaborations with national research bodies, academic institutions, and the Vidya Bharati network.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-2 mb-8" role="list">
          {homeTrustBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-800"
            >
              {badge}
            </span>
          ))}
        </div>

        <ul
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
          role="list"
          aria-label="Institutional partners"
        >
          {homePartnerLogos.map((partner) => (
            <li
              key={partner.id}
              className="snap-start shrink-0 w-36 sm:w-40 rounded-2xl border border-gray-200 bg-gray-50/80 p-4 text-center shadow-dhe-sm hover:shadow-dhe-md hover:border-orange-200 motion-safe:transition-all"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm overflow-hidden">
                <Image
                  src={partner.logoPath}
                  alt=""
                  width={48}
                  height={48}
                  className="h-10 w-10 object-contain"
                  aria-hidden
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-gray-900 leading-tight">
                {partner.name}
              </p>
              <p className="mt-1 text-[11px] text-gray-600 leading-snug">{partner.context}</p>
            </li>
          ))}
        </ul>

        <ul className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" role="list">
          {homePartnerHighlights.map((partner) => (
            <li
              key={partner.name}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-center shadow-dhe-sm"
            >
              <p className="text-sm font-semibold text-gray-900">{partner.name}</p>
              <p className="mt-0.5 text-xs text-gray-600">{partner.context}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
