import { createPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = createPageMetadata("registrationForm");

import React from "react";
import Registration from "@/components/forms/RegistrationForm";

const page = () => {
  return (
    <div>
      <Registration />
    </div>
  );
};

export default page;
