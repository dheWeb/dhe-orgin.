import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("comingsoon");


import ContactUs from "@/components/forms/ContactForm";
import CommingSoon from "@/components/sections/ComingSoon"


export default function Committee() {
  return (
    <>
    <CommingSoon/>
  </>
  )
}
