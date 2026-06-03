import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CellPageView from "@/components/cells/CellPageView";
import PageStructuredData from "@/components/seo/PageStructuredData";
import { getBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import {
  getCellBreadcrumbItems,
  getCellStructuredDataGraph,
} from "@/lib/seo/cell-schema";
import { createCellMetadata } from "@/lib/seo/build-metadata";
import { getAllCellSlugs, getCellBySlug } from "@/data/cells";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCellSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cell = getCellBySlug(slug);

  if (!cell) {
    return {
      title: "Cell Not Found",
      robots: { index: false, follow: false },
    };
  }

  return createCellMetadata(slug);
}

export default async function CellPage({ params }: PageProps) {
  const { slug } = await params;
  const cell = getCellBySlug(slug);

  if (!cell) {
    notFound();
  }

  return (
    <>
      <PageStructuredData
        graph={[
          getBreadcrumbSchema(getCellBreadcrumbItems(cell, slug)),
          ...getCellStructuredDataGraph(cell, slug),
        ]}
      />
      <CellPageView cell={cell} />
    </>
  );
}
