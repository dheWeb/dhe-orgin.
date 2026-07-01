import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("feedback");

import Feedback from "@/components/forms/FeedbackForm";


export default function Committee() {
  return (
    <>
    <Feedback /> 
  </>
  )
}
