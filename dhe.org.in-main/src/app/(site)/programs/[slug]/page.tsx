import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllProgramSlugs,
  getProgramBySlug,
} from "@/lib/cms/programs-content";
import { siteConfig } from "@/lib/seo/site-metadata";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllProgramSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return { title: "Program not found" };

  return {
    title: `${program.title} | DHE`,
    description: program.summary,
    alternates: { canonical: `${siteConfig.url}/programs/${slug}` },
  };
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  const ctaHref = program.href ?? (program.cellSlug ? `/cells/${program.cellSlug}` : "/programs");
  const isExternal = ctaHref.startsWith("http");

  return (
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
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={ctaHref}
          className="inline-flex items-center min-h-11 px-5 py-2 rounded-md bg-orange-600 text-white font-medium hover:bg-orange-500"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {isExternal ? "Open official page" : "View program"}
        </a>
        {program.cellSlug ? (
          <Link
            href={`/cells/${program.cellSlug}`}
            className="inline-flex items-center min-h-11 px-5 py-2 rounded-md border border-gray-300 text-gray-800 hover:border-orange-400"
          >
            Cell page
          </Link>
        ) : null}
      </div>
    </div>
  );
}
