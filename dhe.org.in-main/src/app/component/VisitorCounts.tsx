"use client";
import { useEffect, useState } from "react";
import { incrementCountOnPageLoad } from "../Utils/visitorCount";

const VisitorCounts = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    const newCount = incrementCountOnPageLoad();
    setVisitorCount(newCount);
  }, []);

  return (
    <div>
      <br></br>
      <h2>
        <b>Visitor Count &#58; {visitorCount}</b>
      </h2>
    </div>
  );
};
export default VisitorCounts;
