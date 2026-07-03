"use client";

import NextTopLoader from "nextjs-toploader";
import CompanyInfo from "@/components/layout/CompanyInfo";
import Header from "@/components/layout/Header";
import BottomView, { type FooterSiteContact } from "@/components/layout/BottomView";
import Floating from "@/components/layout/Floating";
import VisibleBreadcrumbs from "@/components/layout/VisibleBreadcrumbs";
import HomePromoBanner from "@/components/home/HomePromoBanner";
import { Toaster } from "react-hot-toast";

export default function RootLayoutClient({
  children,
  sitePhone = "7903431900",
  footerMission,
  siteContact,
  smkUrls,
}: {
  children: React.ReactNode;
  sitePhone?: string;
  footerMission?: string;
  siteContact?: FooterSiteContact;
  smkUrls?: { siteUrl: string; registrationUrl: string };
}) {
  return (
    <>
      <NextTopLoader
        color="#f97316"
        initialPosition={0.08}
        crawlSpeed={200}
        height={4}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #f97316,0 0 5px #f97316"
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-orange-600 focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      <Floating sitePhone={sitePhone} />

      <CompanyInfo />

      <header className="sticky top-0 z-50 bg-white shadow-sm" role="banner">
        <Header />
      </header>

      <HomePromoBanner
        smkRegistrationUrl={smkUrls?.registrationUrl}
        smkSiteUrl={smkUrls?.siteUrl}
      />
      <VisibleBreadcrumbs />

      {children}

      <footer>
        <BottomView footerMission={footerMission} siteContact={siteContact} />
      </footer>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#111827",
            color: "#ffffff",
            borderRadius: "16px",
            padding: "14px",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}
