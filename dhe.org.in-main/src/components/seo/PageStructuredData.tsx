import { getOrganizationSchema } from "@/lib/seo/structured-data";

type Props = {
  /** Additional JSON-LD nodes merged into @graph */
  graph?: Record<string, unknown>[];
};

/** Site-wide Organization schema for inner pages */
export default function PageStructuredData({ graph = [] }: Props) {
  const payload = {
    "@context": "https://schema.org",
    "@graph": [getOrganizationSchema(), ...graph],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
