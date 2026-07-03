"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faGraduationCap,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const CompanyInfo: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-white via-orange-50 to-blue-50 border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Strip */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm border-b border-gray-200">
          <div className="flex items-center gap-6 text-gray-700">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="text-orange-600 w-4 h-4"
              />
              <span>National Educational Innovation Platform</span>
            </div>

            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faGlobe}
                className="text-blue-700 w-4 h-4"
              />
              <span>Global Educational Outreach</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <FontAwesomeIcon
              icon={faPhone}
              className="text-orange-600 w-4 h-4"
            />
            <span>Transforming Education for Viksit Bharat</span>
          </div>
        </div>

        {/* Main Header — compact on mobile */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-2 sm:py-3 lg:py-4 gap-2 sm:gap-3">
          
          {/* Left Section */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            
            {/* Logo */}
            <div className="relative shrink-0">
              <div className="bg-white rounded-full p-1.5 border border-orange-100 shadow-sm">
                <Image
                  src="/logo.webp"
                  alt="Department of Holistic Education Logo"
                  width={64}
                  height={64}
                  className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
                />
              </div>
            </div>

            {/* Title & Tagline */}
            <div className="flex flex-col">
              <Link
                href="/"
                className="group transition-all duration-300"
              >
                <p className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight group-hover:text-orange-700 transition duration-300">
                  Department of
                  <span className="block text-orange-600 sm:inline sm:ml-1">
                    Holistic Education
                  </span>
                </p>
              </Link>

              <p className="hidden sm:block text-xs sm:text-sm lg:text-base text-gray-600 mt-1 leading-relaxed max-w-2xl">
                Advancing Bharat’s educational transformation through
                innovation, leadership, research, and holistic learning aligned
                with NEP 2020.
              </p>

              {/* Mini Badges */}
              <div className="hidden sm:flex flex-wrap items-center gap-1.5 mt-2">
                <span className="px-2 py-0.5 rounded-md bg-orange-100 text-orange-700 text-[10px] font-semibold">
                  NEP 2020
                </span>
                <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-semibold">
                  National Platform
                </span>
              </div>
            </div>
          </div>

          {/* Right CTA Section — primary only on xs */}
          <div className="flex flex-row items-center gap-2 w-full lg:w-auto justify-end">
            <Link
              href="/programs"
              className="text-center px-4 py-2 rounded-md bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 motion-safe:transition-colors min-h-10 inline-flex items-center justify-center"
            >
              Programs
            </Link>

            <Link
              href="/structure"
              className="hidden sm:inline-flex text-center px-4 py-2 rounded-md border border-orange-500 text-orange-700 text-sm font-semibold hover:bg-orange-50 motion-safe:transition-colors min-h-10 items-center justify-center"
            >
              Explore DHE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
