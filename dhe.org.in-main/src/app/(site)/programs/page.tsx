import Link from "next/link";
import { createPageMetadata } from "@/lib/seo/build-metadata";
import { getSiteContent } from "@/lib/cms/site-content";
import { PROGRAMS } from "@/data/programs/registry";

export const metadata = createPageMetadata("programs");

export default async function ProgramsPage() {
  const content = await getSiteContent(["programs_intro"]);
  const intro =
    content.programs_intro?.text?.trim() ||
    "Flagship programs and cells advancing holistic education across Bharat.";

  return (
    <div className="dhe-container py-10 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary-color">
        DHE Programs
      </h1>
      <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
        {intro}
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2" role="list">
        {PROGRAMS.map((item) => {
          const detailHref = `/programs/${item.slug}`;
          const external = item.href?.startsWith("http");
          return (
            <li key={item.slug}>
              <Link
                href={detailHref}
                className="block h-full rounded-lg border border-gray-200 p-5 hover:border-orange-400 transition"
              >
                <span className="font-semibold text-gray-900">{item.title}</span>
                <span className="mt-2 block text-sm text-gray-600">
                  {item.summary}
                </span>
                {item.href ? (
                  <span className="mt-3 inline-block text-xs font-medium text-orange-700">
                    {external ? "Includes external portal →" : "View program page →"}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
