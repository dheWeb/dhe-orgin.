import "@/lib/fontawesome-config";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import RootLayoutClient from "./RootLayoutClient";
import { defaultMetadata } from "@/lib/seo/site-metadata";
import { CookieConsentBanner } from "@/components/layout/CookieConsent";
import {
  BotpressChatLauncher,
  DeferredAnalyticsScripts,
} from "@/components/layout/DeferredThirdParty";

import { getPrograms } from "@/lib/cms/programs-content";
import { getSmkUrlsFromPrograms } from "@/lib/programs/external-urls";
import { getSiteContent } from "@/lib/cms/site-content";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  variable: "--font-inter",
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f97316",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [content, programs] = await Promise.all([
    getSiteContent(["site_contact", "footer_mission"]),
    getPrograms(),
  ]);
  const sitePhone = content.site_contact?.phone?.trim() || "7903431900";
  const siteEmail = content.site_contact?.email?.trim();
  const siteOfficeAddress = content.site_contact?.office_address?.trim();
  const footerMission = content.footer_mission?.text?.trim();
  const smkUrls = getSmkUrlsFromPrograms(programs);

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body
        className={`${inter.className} bg-white text-black overflow-x-hidden antialiased`}
      >
        <RootLayoutClient
          sitePhone={sitePhone}
          footerMission={footerMission}
          siteContact={{
            phone: sitePhone,
            email: siteEmail,
            officeAddress: siteOfficeAddress,
          }}
          smkUrls={smkUrls}
        >
          <main
            id="main-content"
            className="min-h-screen bg-white min-w-0"
          >
            {children}
          </main>
        </RootLayoutClient>

        <CookieConsentBanner />
        <DeferredAnalyticsScripts />
        <BotpressChatLauncher />
      </body>
    </html>
  );
}
