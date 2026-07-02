import { createPageMetadata } from "@/lib/seo/build-metadata";
import SearchPageClient from "./SearchPageClient";

export const metadata = createPageMetadata("search");

export default function SearchPage() {
  return <SearchPageClient />;
}
