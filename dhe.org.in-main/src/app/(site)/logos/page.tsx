import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("logos");


import Logos from "@/components/sections/Logos";


export default function Committee() {
  return (
    <>
    <Logos />
  </>
  )
}
