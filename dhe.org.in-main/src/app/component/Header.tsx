"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";

type Menu = {
  path: string;
  title: string;
  subMenu?: Menu[];
};

const Header: React.FC = () => {
const menus: Menu[] = [
  { path: "/", title: "Home" },
  {
    path: "/",
    title: "About Us",
    subMenu: [
      { path: "/messages", title: "Director Message" },
      { path: "/structure", title: "Cells" },
      { path: "/advisory", title: "Advisory Council" },
      { path: "/committee", title: "LMC Members" },
      { path: "/people", title: "Cell Co-ordinators" },
    ],
  },
  { path: "https://pub.dhe.org.in", title: "Publication",
   
     
   },
  {
    path: "/",
    title: "Careers",
    subMenu: [
      {
        path: "https://ep.sarvatr.co.in/public/careers/8d8a9c3384a936495a752596fe2a0b4d",
        title: "Careers",
      },
      { path: "/Recruitment-Policy.pdf", title: "Recruitment-Policy" },
    ],
  },
  { path: "/contact", title: "Contact Us" },
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
    title: "Membership",
    subMenu: [{ path: "/contribute", title: "Join DHE" }],
  },
  { path: "/donation", title: "Donation" },
  {
    path: "/",
    title: "DHE’s Chapters",
    subMenu: [
      { path: "https://nitsri.dhe.org.in", title: "NIT Srinagar" },
      { path: "https://iitrpr.dhe.org.in", title: "IIT Ropar" },
      { path: "https://nitj.dhe.org.in", title: "NIT Jalandhar" },
      { path: "https://nitkkr.dhe.org.in", title: "NIT Kurukshetra" },

    ],
  },
  { path: "/logos", title: "Logos" },
  { path: "/accountdetails", title: "Accounts" },
  { path: "/residentialcamps", title: "Residential Camps" },
  { path: "/feedback", title: "Feedback" },
];

const [state, setState] = useState(false);
  const [subMenuIndex, setSubMenuIndex] = useState(-1);
  const menuRef = useRef<HTMLElement>(null);

  const handleSubMenuHover = (index: number) => {
    setSubMenuIndex(index);
  };

  const handleSubMenuLeave = () => {
    setSubMenuIndex(-1);
  };

  return (
    <header className="pt-1 w-full" ref={menuRef}>
      <div className="w-full mx-auto flex flex-col lg:flex lg:flex-row items-center justify-between">
        <nav className="w-full text-white text-center text-base font-semibold">
          <div className="items-center px-4 md:flex md:px-0">
            <div className="flex items-center justify-between py-0 md:block">
              <div className={`md:hidden order-1`}>
                <button
                  className="text-black outline-none p-2 rounded-md"
                  onClick={() => setState(!state)}
                >
                  {state ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <Link href="/"></Link>
            </div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-1 md:block md:pb-0 md:mt-0 ${
                state ? "block" : "hidden"
              }`}
            >
              <ul className={`flex flex-col md:flex-row md:space-x-0.5`}>
                {menus.map((item, idx) => (
                  <li
                    key={idx}
                    className={`py-2 px-2 md:text-white cursor-pointer md:w-1/6 text-black md:bg-primary hover:text-primary md:hover:bg-white flex-1 flex items-center justify-center relative`}
                    onMouseEnter={() => handleSubMenuHover(idx)}
                  >
                    {item.subMenu ? (
                      <div className="relative">
                        <Link href={item.path}>
                          <span className="text-l">{item.title}</span>
                        </Link>
                        <ul
                          className={`absolute top-full left-1/2 transform -translate-x-1/2 px-10 md:px-5 mt-2 h-30 space-y-2 text-base font-bold text-black bg-[#f8e6e1] z-10 w-auto md:w-80 md:max-w-xs ${
                            subMenuIndex === idx ? "block" : "hidden"
                          }`}
                          style={{ minHeight: "3rem", padding: "0.5rem 0" }}
                          onMouseLeave={handleSubMenuLeave}
                        >
                          {item.subMenu.map((subItem, subIdx) => (
                            <li
                              key={subIdx}
                              className="py-1 flex justify-center"
                            >
                              <Link href={subItem.path}>
                                <span
                                  className="block px-4 py-2 text-m transition-all hover:text-primary hover:underline md:text-center"
                                  style={{
                                    display: "block",
                                    whiteSpace: "nowrap",
                                  }}
                                  onClick={handleSubMenuLeave}
                                >
                                  {subItem.title}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Link href={item.path}>
                        <span className="text-l block w-full h-full">
                          {item.title}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
