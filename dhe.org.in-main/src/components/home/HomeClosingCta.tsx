import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { closingCta, relatedLinks } from "@/data/home/content";
import { DEFAULT_SMK_SITE_URL } from "@/lib/programs/external-urls";

export default function HomeClosingCta({
  titleLine1,
  titleLine2,
  body,
  smkSiteUrl = DEFAULT_SMK_SITE_URL,
}: {
  titleLine1?: string;
  titleLine2?: string;
  body?: string;
  smkSiteUrl?: string;
}) {
  const cta = {
    titleLine1: titleLine1 || closingCta.titleLine1,
    titleLine2: titleLine2 || closingCta.titleLine2,
    body: body || closingCta.body,
  };

  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="bg-dhe-navy text-white"
    >
      <div className="dhe-container dhe-section-py">
        <SectionHeading
          id="closing-cta-heading"
          title={
            <>
              {cta.titleLine1}
              <span className="block text-orange-200 font-semibold mt-0.5">
                {cta.titleLine2}
              </span>
            </>
          }
          align="center"
          light
          className="mx-auto"
        />
        <p className="max-w-2xl mx-auto text-center text-sm text-on-navy leading-relaxed -mt-1">
          {cta.body}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
          <Link href="/programs" className="dhe-btn-primary text-sm min-h-10">
            Explore DHE programs
          </Link>
          <Link href="/donation" className="dhe-btn-ghost-light text-sm min-h-10">
            Donate (80G)
          </Link>
          <Link href="/transparency" className="dhe-btn-ghost-light text-sm min-h-10">
            Transparency
          </Link>
          <Link href="/contribute" className="dhe-btn-ghost-light text-sm min-h-10">
            Join DHE — Membership
          </Link>
          <a
            href={smkSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="dhe-btn-ghost-light text-sm min-h-10"
          >
            Shiksha Mahakumbh (RASE)
          </a>
          <Link href="/contact" className="dhe-btn-ghost-light text-sm min-h-10">
            Contact DHE
          </Link>
        </div>
        <nav
          className="mt-5 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs sm:text-sm text-on-navy"
          aria-label="Related institutional pages"
        >
          {relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-orange-200 min-h-10 inline-flex items-center underline-offset-2 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
