"use client"
import React from "react";

const StructurePage = React.lazy(() => import("../component/StructurePage"));

const Structure = () => (
  <>
    <React.Suspense fallback={<div>Loading...</div>}>
      <StructurePage />
    </React.Suspense>
  </>
);

export default Structure;