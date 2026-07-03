import { createPageMetadata } from "@/lib/seo/build-metadata";
import Books from "@/components/sections/Books";

export const metadata = createPageMetadata("books");

export default function BooksPage() {
  return <Books />;
}
