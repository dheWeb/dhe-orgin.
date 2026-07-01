import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { closingCta, relatedLinks } from "@/data/home/content";

export default function HomeClosingCta({
  titleLine1,
  titleLine2,
  body,
}: {
  titleLine1?: string;
  titleLine2?: string;
  body?: string;
}) {
  const cta = {
    titleLine1: titleLine1 || closingCta.titleLine1,
    titleLine2: titleLine2 || closingCta.titleLine2,
    body: body || closingCta.body,
  };

  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="bg-[#07111f] text-white"
    >
      <div className="dhe-container dhe-section-py">
        <SectionHeading
          id="closing-cta-heading"
          title={
            <>
              {cta.titleLine1}
              <span className="block text-orange-400 font-semibold mt-0.5">
                {cta.titleLine2}
              </span>
            </>
          }
          align="center"
          light
          className="mx-auto"
        />
        <p className="max-w-2xl mx-auto text-center text-sm text-gray-300 leading-relaxed -mt-1">
          {cta.body}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
          <a
            href="https://www.rase.co.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="dhe-btn-primary text-sm min-h-10"
          >
            Explore Shiksha Mahakumbh
          </a>
          <Link href="/donation" className="dhe-btn-ghost-light text-sm min-h-10">
            Support DHE
          </Link>
          <Link href="/contribute" className="dhe-btn-ghost-light text-sm min-h-10">
            Join DHE — Membership
          </Link>
          <Link href="/contact" className="dhe-btn-ghost-light text-sm min-h-10">
            Contact DHE
          </Link>
        </div>
        <nav
          className="mt-5 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-300"
          aria-label="Related institutional pages"
        >
          {relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-orange-400 min-h-10 inline-flex items-center underline-offset-2 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
