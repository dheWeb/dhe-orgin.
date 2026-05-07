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
    <header className="w-full bg-gradient-to-r from-white via-orange-50 to-blue-50 border-b border-orange-100 shadow-sm">
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

        {/* Main Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-4 lg:py-5 gap-4">
          
          {/* Left Section */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            
            {/* Logo */}
            <div className="relative group">
              <div className="absolute inset-0 bg-orange-200 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition duration-500"></div>

              <div className="relative bg-white rounded-full shadow-lg p-2 border border-orange-100">
                <Image
                  src="/logo.png"
                  alt="Department of Holistic Education Logo"
                  width={90}
                  height={90}
                  priority
                  className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain"
                />
              </div>
            </div>

            {/* Title & Tagline */}
            <div className="flex flex-col">
              <Link
                href="/"
                className="group transition-all duration-300"
              >
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight group-hover:text-orange-700 transition duration-300">
                  Department of
                  <span className="block text-orange-600">
                    Holistic Education
                  </span>
                </h1>
              </Link>

              <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1 leading-relaxed max-w-2xl">
                Advancing Bharat’s educational transformation through
                innovation, leadership, research, and holistic learning aligned
                with NEP 2020.
              </p>

              {/* Mini Badges */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                  NEP 2020 Aligned
                </span>

                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                  National Platform
                </span>

                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  Global Educational Vision
                </span>
              </div>
            </div>
          </div>

          {/* Right CTA Section */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            
            <Link
              href="/about"
              className="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl border border-orange-500 text-orange-700 font-semibold hover:bg-orange-50 transition duration-300"
            >
              Explore DHE
            </Link>

            <Link
              href="/shiksha-mahakumbh"
              className="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-orange-200 transition duration-300"
            >
              Shiksha Mahakumbh
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CompanyInfo;
