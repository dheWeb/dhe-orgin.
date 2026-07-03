"use client";

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import {
  DEFAULT_MARQUEE_ITEMS,
  type MarqueeItem,
} from "@/lib/cms/cms-parsers";

type MarqueesProps = {
  items?: MarqueeItem[];
};

const Marquees: React.FC<MarqueesProps> = ({ items = DEFAULT_MARQUEE_ITEMS }) => {
  const marquees = items.length ? items : DEFAULT_MARQUEE_ITEMS;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const links = marquees.map((item, index) => (
    <Link
      key={index}
      href={item.link}
      {...(item.link.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="mx-4 sm:mx-6 text-white hover:text-orange-200 inline-flex items-center text-xs sm:text-sm leading-normal whitespace-nowrap"
    >
      {item.text}
    </Link>
  ));

  return (
    <section
      aria-label="Announcements"
      className="flex min-h-11 items-stretch bg-dhe-navy text-white text-sm border-b-2 border-orange-500/25"
    >
      <span className="shrink-0 px-3 sm:px-4 bg-orange-600 text-xs font-semibold uppercase tracking-wide flex items-center self-stretch">
        News
      </span>
      <div className="flex-1 min-w-0 flex items-center overflow-hidden py-2">
        {reduceMotion ? (
          <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-1 px-2" role="list">
            {marquees.map((item, index) => (
              <li key={index} className="flex items-center min-h-9">
                {links[index]}
              </li>
            ))}
          </ul>
        ) : (
          <Marquee speed={50} gradient={false} pauseOnHover pauseOnClick>
            {links}
          </Marquee>
        )}
      </div>
    </section>
  );
};

export default Marquees;
