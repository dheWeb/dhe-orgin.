import "@/lib/fontawesome-config";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import RootLayoutClient from "./RootLayoutClient";
import { defaultMetadata } from "@/lib/seo/site-metadata";
import {
  CookieConsentBanner,
  ThirdPartyScripts,
} from "@/components/layout/CookieConsent";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body
        className={`${inter.className} bg-white text-black overflow-x-hidden antialiased`}
      >
        <RootLayoutClient>
          <main
            id="main-content"
            className="min-h-screen bg-white min-w-0"
          >
            {children}
          </main>
        </RootLayoutClient>

        <CookieConsentBanner />
        <ThirdPartyScripts />
      </body>
    </html>
  );
}
