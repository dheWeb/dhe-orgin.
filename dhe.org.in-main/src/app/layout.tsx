import "@/lib/fontawesome-config";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import RootLayoutClient from "./RootLayoutClient";
import { defaultMetadata } from "@/lib/seo/site-metadata";

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

        {process.env.NODE_ENV === "production" && (
          <Script
            id="adsense"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4330032354977759"
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}

        <Script
          id="botpress-inject"
          src="https://cdn.botpress.cloud/webchat/v1/inject.js"
          strategy="lazyOnload"
        />
        <Script
          id="botpress-config"
          src="https://mediafiles.botpress.cloud/fa60123e-045a-48d8-862e-81258c3ccc9a/webchat/config.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
