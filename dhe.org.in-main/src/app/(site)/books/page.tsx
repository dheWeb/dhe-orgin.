import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("books");


import Accounts from "@/components/sections/Accounts";
import Books from "@/components/sections/Books";


export default function page() {
  return (
    <>
    <Books />
  </>
  )
}
