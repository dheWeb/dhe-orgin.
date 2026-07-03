import { getSiteContent } from "@/lib/cms/site-content";
import { getPrograms } from "@/lib/cms/programs-content";
import { siteConfig } from "@/lib/seo/site-metadata";
import ProgramCardGrid from "@/components/ui/ProgramCardGrid";
import Link from "next/link";

export default async function ProgramsPage() {
  const content = await getSiteContent(["programs_intro"]);
  const programs = await getPrograms();
  const intro =
    content.programs_intro?.text?.trim() ||
    "Flagship programs and cells advancing holistic education across Bharat.";

  const programsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "DHE Programs",
    itemListElement: programs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebPage",
        name: item.title,
        description: item.summary,
        url: `${siteConfig.url}/programs/${item.slug}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programsJsonLd) }}
      />
      <div className="bg-gradient-to-b from-orange-50/40 to-white border-b border-gray-100">
        <div className="dhe-container py-10 sm:py-14 max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">
            Year-round initiatives
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            DHE Programs
          </h1>
          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            {intro}
          </p>
        </div>
      </div>
      <div className="dhe-container py-10 sm:py-12 max-w-6xl mx-auto">
        <ProgramCardGrid programs={programs} />
        <p className="mt-8 flex flex-wrap gap-3">
          <Link href="/structure" className="dhe-btn-primary text-sm">
            Explore cells &amp; structure
          </Link>
          <Link
            href="/contribute"
            className="inline-flex min-h-11 items-center px-5 py-2 rounded-xl border border-gray-300 text-sm font-medium text-gray-800 hover:border-orange-300"
          >
            Join DHE
          </Link>
        </p>
      </div>
    </>
  );
}
