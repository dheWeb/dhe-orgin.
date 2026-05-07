"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faChevronDown,
  faGlobe,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

type Menu = {
  path: string;
  title: string;
  subMenu?: Menu[];
};

const Header: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const menus: Menu[] = [
    { path: "/", title: "Home" },

    {
      path: "/",
      title: "About DHE",
      subMenu: [
        { path: "/messages", title: "Director Message" },
        { path: "/structure", title: "Cells & Structure" },
        { path: "/advisory", title: "Advisory Council" },
        { path: "/committee", title: "LMC Members" },
        { path: "/people", title: "Cell Co-ordinators" },
      ],
    },

    {
      path: "https://pub.dhe.org.in",
      title: "Publications",
    },

    {
      path: "/",
      title: "Events",
      subMenu: [
        { path: "/pastevent", title: "Past Events" },
        { path: "/upcomingevent", title: "Upcoming Events" },
      ],
    },

    {
      path: "/",
      title: "Careers",
      subMenu: [
        {
          path: "https://ep.sarvatr.co.in/public/careers/8d8a9c3384a936495a752596fe2a0b4d",
          title: "Open Positions",
        },
        {
          path: "/Recruitment-Policy.pdf",
          title: "Recruitment Policy",
        },
      ],
    },

    {
      path: "/",
      title: "DHE Chapters",
      subMenu: [
        { path: "https://nitsri.dhe.org.in", title: "NIT Srinagar" },
        { path: "https://iitrpr.dhe.org.in", title: "IIT Ropar" },
        { path: "https://nitj.dhe.org.in", title: "NIT Jalandhar" },
        { path: "https://nitkkr.dhe.org.in", title: "NIT Kurukshetra" },
      ],
    },

    {
      path: "/",
      title: "Membership",
      subMenu: [{ path: "/contribute", title: "Join DHE" }],
    },

    { path: "/donation", title: "Donation" },
    { path: "/logos", title: "Media & Logos" },
    { path: "/accountdetails", title: "Accounts" },
    { path: "/residentialcamps", title: "Residential Camps" },
    { path: "/feedback", title: "Feedback" },
    { path: "/contact", title: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-lg border-b border-orange-100 shadow-sm">
      
      {/* Top Information Bar */}
      <div className="hidden lg:block bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-sm">
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faGraduationCap} className="w-4 h-4" />
              <span>Holistic Educational Transformation</span>
            </div>

            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" />
              <span>Global Educational Outreach</span>
            </div>
          </div>

          <div>
            <span>
              Building a Knowledge-Driven Bharat through Innovation &
              Leadership
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-1 w-full justify-center">
            {menus.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {!item.subMenu ? (
                  <Link
                    href={item.path}
                    className="px-4 py-3 text-[15px] font-semibold text-gray-700 hover:text-orange-600 transition-all duration-300 rounded-xl hover:bg-orange-50"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <button className="flex items-center gap-1 px-4 py-3 text-[15px] font-semibold text-gray-700 hover:text-orange-600 transition-all duration-300 rounded-xl hover:bg-orange-50">
                      {item.title}

                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`w-3 h-3 transition-transform duration-300 ${
                          activeDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    <div
                      className={`absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-orange-100 overflow-hidden transition-all duration-300 ${
                        activeDropdown === index
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <div className="py-3">
                        {item.subMenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.path}
                            className="block px-5 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <FontAwesomeIcon
              icon={mobileMenu ? faTimes : faBars}
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileMenu ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="bg-white border-t border-orange-100 px-4 py-4 space-y-2 shadow-xl">
          
          {menus.map((item, index) => (
            <div key={index} className="border-b border-gray-100 pb-2">
              
              {!item.subMenu ? (
                <Link
                  href={item.path}
                  className="block py-3 text-gray-700 font-semibold hover:text-orange-600"
                  onClick={() => setMobileMenu(false)}
                >
                  {item.title}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === index ? null : index
                      )
                    }
                    className="w-full flex items-center justify-between py-3 text-gray-700 font-semibold hover:text-orange-600"
                  >
                    {item.title}

                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`w-3 h-3 transition-transform duration-300 ${
                        activeDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeDropdown === index
                        ? "max-h-96 mt-2"
                        : "max-h-0"
                    }`}
                  >
                    <div className="pl-4 border-l-2 border-orange-200 space-y-1">
                      {item.subMenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.path}
                          className="block py-2 text-sm text-gray-600 hover:text-orange-600"
                          onClick={() => setMobileMenu(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* CTA Button */}
          <Link
            href="/contribute"
            className="block w-full text-center mt-5 bg-gradient-to-r from-orange-600 to-orange-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition duration-300"
            onClick={() => setMobileMenu(false)}
          >
            Join DHE Movement
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
