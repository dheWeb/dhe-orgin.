import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { closingCta, relatedLinks } from "@/data/home/content";
import { DEFAULT_SMK_SITE_URL } from "@/lib/programs/external-urls";

/** In-button routes — omitted from the text link row below */
const CTA_BUTTON_HREFS = new Set(["/programs", "/donation", "/contact"]);

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

  const textLinks = relatedLinks.filter((link) => !CTA_BUTTON_HREFS.has(link.href));

  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="border-t border-orange-200 dhe-gradient-trust"
    >
      <div className="dhe-container dhe-section-py">
        <SectionHeading
          id="closing-cta-heading"
          title={
            <>
              {cta.titleLine1}
              <span className="block text-orange-600 font-semibold mt-0.5">
                {cta.titleLine2}
              </span>
            </>
          }
          align="center"
          className="mx-auto"
        />
        <p className="max-w-2xl mx-auto text-center text-sm text-gray-600 leading-relaxed -mt-1">
          {cta.body}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
          <Link href="/programs" className="dhe-btn-primary text-sm min-h-10">
            Explore DHE programs
          </Link>
          <Link href="/donation" className="dhe-btn-secondary text-sm min-h-10">
            Donate (80G)
          </Link>
          <Link href="/contact" className="dhe-btn-secondary text-sm min-h-10">
            Contact DHE
          </Link>
        </div>
        <nav
          className="mt-5 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-600"
          aria-label="Related institutional pages"
        >
          {textLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-orange-700 min-h-10 inline-flex items-center underline-offset-2 hover:underline"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={smkSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-700 min-h-10 inline-flex items-center underline-offset-2 hover:underline"
          >
            Shiksha Mahakumbh (RASE) ↗
          </a>
        </nav>
      </div>
    </section>
  );
}
