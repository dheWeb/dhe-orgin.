import { getHomePageGraph } from "@/lib/seo/structured-data";

export default function HomeStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getHomePageGraph()),
      }}
    />
  );
}
