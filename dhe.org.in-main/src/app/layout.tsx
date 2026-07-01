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

import { getSiteContent } from "@/lib/cms/site-content";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
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
  const content = await getSiteContent(["site_contact", "footer_mission"]);
  const sitePhone = content.site_contact?.phone?.trim() || "7903431900";
  const footerMission = content.footer_mission?.text?.trim();

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body
        className={`${inter.className} bg-white text-black overflow-x-hidden antialiased`}
      >
        <RootLayoutClient sitePhone={sitePhone} footerMission={footerMission}>
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
