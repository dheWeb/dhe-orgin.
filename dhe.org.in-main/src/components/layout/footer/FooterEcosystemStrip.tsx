import Image from "next/image";
import { footerEcosystemPartners } from "@/data/ecosystem";

export default function FooterEcosystemStrip() {
  return (
    <section aria-labelledby="footer-ecosystem-heading" className="border-t border-gray-700/80 pt-8">
      <h3
        id="footer-ecosystem-heading"
        className="text-lg font-bold text-orange-200"
      >
        DHE ecosystem
      </h3>
      <p className="mt-1 text-sm text-gray-400">
        Integrated educational &amp; innovation network
      </p>
      <ul
        className="mt-4 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory"
        role="list"
      >
        {footerEcosystemPartners.map((partner) => (
          <li key={partner.id} className="snap-start shrink-0">
            <a
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-28 flex-col items-center rounded-xl border border-gray-700 bg-dhe-navy-light p-3 hover:border-orange-500/50 hover:bg-dhe-navy-mid motion-safe:transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/95 overflow-hidden">
                {partner.image ? (
                  <Image
                    src={partner.image}
                    alt=""
                    width={48}
                    height={48}
                    className="h-10 w-10 object-contain"
                    aria-hidden
                  />
                ) : (
                  <span
                    className="flex h-full w-full items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: partner.color ?? "#ea580c" }}
                    aria-hidden
                  >
                    {partner.abbr ?? partner.name.slice(0, 3)}
                  </span>
                )}
              </div>
              <span className="mt-2 text-center text-[11px] sm:text-xs font-medium text-gray-300 leading-snug group-hover:text-orange-200 line-clamp-2">
                {partner.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
