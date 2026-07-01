import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("residentialcamps");



import ResidentialCamps from "@/components/sections/ResidentialCamps";


export default function Committee() {
  return (
    <>
    <ResidentialCamps />
  </>
  )
}
