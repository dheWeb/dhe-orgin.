import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("donation");

import React from "react";
import Donation from "@/components/forms/DonationForm";

const page = () => {
  return (
    <div>
      <Donation />
    </div>
  );
};

export default page;
