import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllProgramSlugs,
  getProgramBySlug,
} from "@/lib/cms/programs-content";
import { getProgramCellSlugs } from "@/data/programs/registry";
import { getCellSeoTitle } from "@/data/cells";
import { buildMetadataFromEntry } from "@/lib/seo/build-metadata";
import PageStructuredData from "@/components/seo/PageStructuredData";
import { getBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { getWebPageSchema } from "@/lib/seo/cell-schema";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  return buildMetadataFromEntry({
    path: `/programs/${slug}`,
    title: program.title,
    description: program.summary,
    ogImage: "/vi.webp",
  });
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  const ctaHref = program.href ?? (program.cellSlug ? `/cells/${program.cellSlug}` : "/programs");
  const isExternal = ctaHref.startsWith("http");
  const registerUrl = program.externalRegistrationUrl?.trim();
  const owningCells = getProgramCellSlugs(program);
  const programPath = `/programs/${slug}`;

  return (
    <>
      <PageStructuredData
        graph={[
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "DHE Programs", path: "/programs" },
            { name: program.title, path: programPath },
          ]),
          getWebPageSchema(programPath, program.title, program.summary),
        ]}
      />
    <div className="dhe-container py-10 max-w-3xl mx-auto">
      <p className="text-sm text-gray-500 mb-2">
        <Link href="/programs" className="text-orange-700 hover:underline">
          ← All programs
        </Link>
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary-color">
        {program.title}
      </h1>
      <p className="mt-3 text-gray-600 leading-relaxed">{program.summary}</p>
      <div className="mt-6 prose prose-slate max-w-none">
        <p>{program.body}</p>
      </div>
      {program.documents?.length ? (
        <section className="mt-8" aria-labelledby="program-documents-heading">
          <h2 id="program-documents-heading" className="text-lg font-semibold text-gray-900">
            Downloads
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {program.documents.map((doc) => (
              <li key={doc.href}>
                <a
                  href={doc.href}
                  className="text-orange-700 font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {doc.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        {program.externalSiteUrl ? (
          <a
            href={program.externalSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-11 px-5 py-2 rounded-md bg-orange-600 text-white font-medium hover:bg-orange-500"
          >
            {program.externalSiteLabel ?? "Open official site"}
            <span className="ml-1.5" aria-hidden>
              ↗
            </span>
          </a>
        ) : null}
        {registerUrl ? (
          <a
            href={registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center min-h-11 px-5 py-2 rounded-md bg-orange-600 text-white font-medium hover:bg-orange-500"
          >
            Register (official portal)
          </a>
        ) : null}
        <a
          href={ctaHref}
          className="inline-flex items-center min-h-11 px-5 py-2 rounded-md border border-gray-300 text-gray-800 hover:border-orange-400 font-medium"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {isExternal ? "Open official site" : "View program page"}
        </a>
        {program.cellSlug ? (
          <Link
            href={`/cells/${program.cellSlug}`}
            className="inline-flex items-center min-h-11 px-5 py-2 rounded-md border border-gray-300 text-gray-800 hover:border-orange-400"
          >
            Cell page
          </Link>
        ) : null}
        {owningCells
          .filter((slug) => slug !== program.cellSlug)
          .map((slug) => (
            <Link
              key={slug}
              href={`/cells/${slug}`}
              className="inline-flex items-center min-h-11 px-5 py-2 rounded-md border border-gray-300 text-gray-800 hover:border-orange-400"
            >
              {getCellSeoTitle(slug)}
            </Link>
          ))}
      </div>
    </div>
    </>
  );
}
