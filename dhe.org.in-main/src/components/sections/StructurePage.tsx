"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import ParticipationPathways from "@/components/sections/ParticipationPathways";
import { topicClusterLinks } from "@/data/home/content";

const TreeComponent = dynamic(() => import("./TreeComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-48 w-full max-w-3xl animate-pulse bg-gray-100 rounded-lg" aria-busy="true" />
  ),
});

const StructurePage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-white min-w-0">
      <div className="dhe-container py-6 sm:py-10 space-y-8">
        <header className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-color">
            Cells &amp; Organizational Structure
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Organizational chart of DHE national cells advancing research,
            innovation, entrepreneurship, publications, events, and community
            programs. Open a cell from the topic links or the chart below.
          </p>
          <p className="mt-3 text-sm text-gray-600">
            <Link
              href="/messages"
              className="text-orange-700 font-medium hover:underline"
            >
              Director&apos;s Message
            </Link>
            {" · "}
            <Link
              href="/people"
              className="text-orange-700 font-medium hover:underline"
            >
              Cell co-ordinators directory
            </Link>
          </p>
        </header>

        <nav
          className="max-w-3xl mx-auto flex flex-wrap justify-center gap-2"
          aria-label="Topic cluster cells"
        >
          {topicClusterLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs sm:text-sm font-medium px-3 py-2 rounded-md border border-gray-200 text-gray-800 hover:border-orange-400 hover:text-orange-700 min-h-11 inline-flex items-center"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {isClient ? (
          <div className="flex justify-center p-4 overflow-x-auto">
            <div className="text-white font-semibold text-sm">
              <TreeComponent />
            </div>
          </div>
        ) : null}

        <ParticipationPathways
          variant="compact"
          className="max-w-3xl mx-auto pt-4 border-t border-gray-200"
        />
      </div>
    </div>
  );
};

export default StructurePage;
