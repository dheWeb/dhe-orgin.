import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("journals");


import Journals from "@/components/sections/Journals";


export default function page() {
  return (
    <>
    <Journals/>
  </>
  )
}
