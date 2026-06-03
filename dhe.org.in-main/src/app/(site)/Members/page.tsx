import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("Members");

import React from 'react'
import MemberShipEntry from '@/components/forms/MembershipEntry'

const page = () => {
  return (
    <div><MemberShipEntry/></div>
  )
}

export default page