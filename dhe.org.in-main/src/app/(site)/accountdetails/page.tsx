import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("accountdetails");


import Accounts from "@/components/sections/Accounts";


export default function Committee() {
  return (
    <>
    <Accounts />
  </>
  )
}
