"use client";

import React, { useCallback, useEffect, useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  headerNavItems,
  isNavItemActive,
  isNavPathExternal,
  type NavItem,
} from "@/data/header-nav";

function navLinkClass(active: boolean, extra = "") {
  return [
    "px-3 py-2 text-sm font-semibold rounded-lg whitespace-nowrap motion-safe:transition-colors",
    active
      ? "text-orange-700 bg-orange-50"
      : "text-gray-700 hover:text-orange-600 hover:bg-orange-50",
    extra,
  ].join(" ");
}

function SubNavLink({
  item,
  onNavigate,
  className,
}: {
  item: NavItem;
  onNavigate?: () => void;
  className: string;
}) {
  const external = item.external ?? isNavPathExternal(item.path);
  const label = external ? `${item.title} ↗` : item.title;

  if (external) {
    return (
      <a
        href={item.path}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={item.path} className={className} onClick={onNavigate}>
      {label}
    </Link>
  );
}

const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const mobilePanelId = useId();

  const closeMobileMenu = useCallback(() => {
    setMobileMenu(false);
    setActiveDropdown(null);
  }, []);

  useEffect(() => {
    if (!mobileMenu) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenu, closeMobileMenu]);

  const getSubmenuId = (index: number) => `${mobilePanelId}-submenu-${index}`;

  return (
    <div className="w-full bg-white/95 backdrop-blur-lg border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="lg:hidden flex items-center gap-2 min-h-11 shrink-0"
            aria-label="Department of Holistic Education — Home"
          >
            <Image
              src="/logo.webp"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              aria-hidden
            />
            <span className="text-sm font-bold text-orange-600">DHE</span>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-0.5 flex-1 justify-center"
            aria-label="Primary"
          >
            {headerNavItems.map((item, index) => {
              const submenuId = getSubmenuId(index);
              const isOpen = activeDropdown === index;
              const active = isNavItemActive(pathname, item);

              return (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => item.subMenu && setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {!item.subMenu ? (
                    <Link
                      href={item.path}
                      title={item.navTitle}
                      className={navLinkClass(active, "inline-flex min-h-11 items-center")}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <>
                      <button
                        type="button"
                        className={navLinkClass(
                          active,
                          "inline-flex min-h-11 items-center gap-1"
                        )}
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                        aria-controls={submenuId}
                        onClick={() => setActiveDropdown(isOpen ? null : index)}
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
                        hidden={!isOpen}
                        className={`absolute left-0 top-full mt-1 w-72 max-h-[min(70vh,24rem)] overflow-y-auto dhe-scroll-thin bg-white rounded-xl shadow-dhe-lg border border-orange-100 transition-all duration-200 ${
                          isOpen
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-1"
                        }`}
                      >
                        <div className="py-2">
                          {item.subMenu.map((subItem) => (
                            <SubNavLink
                              key={subItem.path + subItem.title}
                              item={subItem}
                              className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                            />
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

      <div
        id={mobilePanelId}
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenu ? "max-h-[85vh] overflow-y-auto" : "max-h-0"
        }`}
        aria-hidden={!mobileMenu}
      >
        <nav
          className="bg-white border-t border-orange-100 px-4 py-3 space-y-1 shadow-xl"
          aria-label="Mobile primary"
        >
          {headerNavItems.map((item, index) => {
            const submenuId = getSubmenuId(index);
            const isOpen = activeDropdown === index;
            const active = isNavItemActive(pathname, item);

            return (
              <div key={item.title} className="border-b border-gray-100 pb-2 last:border-0">
                {!item.subMenu ? (
                  <Link
                    href={item.path}
                    className={`block py-2.5 font-semibold ${
                      active ? "text-orange-700" : "text-gray-700 hover:text-orange-600"
                    }`}
                    aria-current={active ? "page" : undefined}
                    onClick={closeMobileMenu}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(isOpen ? null : index)}
                      className={`w-full flex items-center justify-between py-2.5 font-semibold ${
                        active ? "text-orange-700" : "text-gray-700 hover:text-orange-600"
                      }`}
                      aria-haspopup="true"
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
                      hidden={!isOpen}
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-[28rem] mt-1" : "max-h-0"
                      }`}
                    >
                      <div className="pl-3 border-l-2 border-orange-200 space-y-0.5 pb-1">
                        {item.subMenu.map((subItem) => (
                          <SubNavLink
                            key={subItem.path + subItem.title}
                            item={subItem}
                            onNavigate={closeMobileMenu}
                            className="block py-2 text-sm text-gray-600 hover:text-orange-600"
                          />
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
            className="block w-full text-center mt-3 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 min-h-11"
            onClick={closeMobileMenu}
          >
            Join DHE
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
