"use client";

import React, { useCallback, useEffect, useId, useState } from "react";
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
  const mobilePanelId = useId();

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

  const closeMobileMenu = useCallback(() => {
    setMobileMenu(false);
    setActiveDropdown(null);
  }, []);

  useEffect(() => {
    if (!mobileMenu) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenu, closeMobileMenu]);

  const getSubmenuId = (index: number) => `${mobilePanelId}-submenu-${index}`;

  return (
    <div className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-lg border-b border-orange-100 shadow-sm">
      {/* Top Information Bar */}
      <div className="hidden lg:block bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faGraduationCap} className="w-4 h-4" aria-hidden />
              <span>Holistic Educational Transformation</span>
            </div>

            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" aria-hidden />
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
          <nav
            className="hidden lg:flex items-center gap-1 w-full justify-center"
            aria-label="Primary"
          >
            {menus.map((item, index) => {
              const submenuId = getSubmenuId(index);
              const isOpen = activeDropdown === index;

              return (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => item.subMenu && setActiveDropdown(index)}
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
                      <button
                        type="button"
                        className="flex items-center gap-1 px-4 py-3 text-[15px] font-semibold text-gray-700 hover:text-orange-600 transition-all duration-300 rounded-xl hover:bg-orange-50"
                        aria-haspopup="menu"
                        aria-expanded={isOpen}
                        aria-controls={submenuId}
                        onClick={() =>
                          setActiveDropdown(isOpen ? null : index)
                        }
                      >
                        {item.title}
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={`w-3 h-3 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden
                        />
                      </button>

                      <div
                        id={submenuId}
                        role="menu"
                        className={`absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-orange-100 overflow-hidden transition-all duration-300 ${
                          isOpen
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-2"
                        }`}
                      >
                        <div className="py-3">
                          {item.subMenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.path}
                              role="menuitem"
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
              );
            })}
          </nav>

          <button
            type="button"
            className="lg:hidden text-gray-700 min-h-11 min-w-11 inline-flex items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            onClick={() => setMobileMenu((open) => !open)}
            aria-label={mobileMenu ? "Close main menu" : "Open main menu"}
            aria-expanded={mobileMenu}
            aria-controls={mobilePanelId}
          >
            <FontAwesomeIcon
              icon={mobileMenu ? faTimes : faBars}
              className="w-6 h-6"
              aria-hidden
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id={mobilePanelId}
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileMenu ? "max-h-screen" : "max-h-0"
        }`}
        aria-hidden={!mobileMenu}
      >
        <nav
          className="bg-white border-t border-orange-100 px-4 py-4 space-y-2 shadow-xl"
          aria-label="Mobile primary"
        >
          {menus.map((item, index) => {
            const submenuId = getSubmenuId(index);
            const isOpen = activeDropdown === index;

            return (
              <div key={index} className="border-b border-gray-100 pb-2">
                {!item.subMenu ? (
                  <Link
                    href={item.path}
                    className="block py-3 text-gray-700 font-semibold hover:text-orange-600"
                    onClick={closeMobileMenu}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown(isOpen ? null : index)
                      }
                      className="w-full flex items-center justify-between py-3 text-gray-700 font-semibold hover:text-orange-600"
                      aria-haspopup="menu"
                      aria-expanded={isOpen}
                      aria-controls={submenuId}
                    >
                      {item.title}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`w-3 h-3 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      />
                    </button>

                    <div
                      id={submenuId}
                      role="menu"
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-96 mt-2" : "max-h-0"
                      }`}
                    >
                      <div className="pl-4 border-l-2 border-orange-200 space-y-1">
                        {item.subMenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.path}
                            role="menuitem"
                            className="block py-2 text-sm text-gray-600 hover:text-orange-600"
                            onClick={closeMobileMenu}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}

          <Link
            href="/contribute"
            className="block w-full text-center mt-5 bg-gradient-to-r from-orange-600 to-orange-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition duration-300"
            onClick={closeMobileMenu}
          >
            Join DHE Movement
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
