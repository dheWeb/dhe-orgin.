"use client";

import AntdProviders from "./AntdProviders";
import NextTopLoader from "nextjs-toploader";
import CompanyInfo from "@/components/layout/CompanyInfo";
import Header from "@/components/layout/Header";
import BottomView from "@/components/layout/BottomView";
import Floating from "@/components/layout/Floating";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";

const HomePromoDialog = dynamic(
  () => import("@/components/home/HomePromoDialog"),
  { ssr: false, loading: () => null }
);

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AntdProviders>
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

      <Floating />

      <header className="sticky top-0 z-50 bg-white shadow-sm" role="banner">
        <div className="border-b border-orange-100">
          <CompanyInfo />
        </div>
        <Header />
      </header>

      {children}

      <footer>
        <BottomView />
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

      <HomePromoDialog />
    </AntdProviders>
  );
}
