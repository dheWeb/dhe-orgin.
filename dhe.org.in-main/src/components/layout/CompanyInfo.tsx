"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faGraduationCap,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

const CompanyInfo: React.FC = () => {
  return (
    <div className="w-full dhe-gradient-bar border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:flex flex-wrap items-center gap-x-5 gap-y-1 py-1.5 text-xs text-gray-600 border-b border-gray-200/80">
          <span className="inline-flex items-center gap-1.5">
            <FontAwesomeIcon icon={faGraduationCap} className="text-orange-600 w-3.5 h-3.5" />
            National Educational Innovation Platform
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FontAwesomeIcon icon={faGlobe} className="text-dhe-blue-accent w-3.5 h-3.5" />
            Global Educational Outreach
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FontAwesomeIcon icon={faFlag} className="text-orange-600 w-3.5 h-3.5" />
            Viksit Bharat 2047
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between py-2 lg:py-2.5 gap-2 sm:gap-3">
          <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto min-w-0">
            <div className="relative shrink-0">
              <div className="bg-white rounded-full p-1.5 border border-orange-100 shadow-sm">
                <Image
                  src="/logo.webp"
                  alt="Department of Holistic Education Logo"
                  width={64}
                  height={64}
                  className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <Link href="/" className="group">
                <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 leading-tight group-hover:text-orange-700 motion-safe:transition-colors">
                  Department of{" "}
                  <span className="text-orange-600">Holistic Education</span>
                </p>
              </Link>

              <p className="hidden sm:block text-xs sm:text-sm text-gray-600 mt-0.5 leading-snug line-clamp-2 max-w-xl">
                Advancing Bharat&apos;s educational transformation — innovation,
                leadership, and holistic learning aligned with NEP 2020.
              </p>

              <div className="hidden sm:flex flex-wrap items-center gap-1.5 mt-1.5">
                <span className="px-2 py-0.5 rounded-md bg-orange-100 text-orange-700 text-xs font-semibold">
                  NEP 2020
                </span>
                <span className="px-2 py-0.5 rounded-md bg-dhe-blue-wash text-dhe-blue-accent text-xs font-semibold">
                  National Platform
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center gap-2 w-full lg:w-auto justify-end shrink-0">
            <Link
              href="/donation"
              className="text-center px-4 py-2 rounded-md border border-orange-500 text-orange-700 text-sm font-semibold hover:bg-orange-50 motion-safe:transition-colors min-h-10 inline-flex items-center justify-center"
            >
              Donate (80G)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
