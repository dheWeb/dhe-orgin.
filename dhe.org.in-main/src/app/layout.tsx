"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import CompanyInfo from "./component/CompanyInfo";
import Header from "./component/Header";
import BottomView from "./component/BottomView";
import Floating from "./component/Floating";
import Modal from "./component/Modal";

import { Toaster } from "react-hot-toast";
import { useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <html lang="en" className="scroll-smooth">

      <head>

        {/* PRIMARY SEO */}
        <title>
          Department of Holistic Education (DHE) | Holistic Educational Transformation of Bharat
        </title>

        <meta
          name="description"
          content="Department of Holistic Education (DHE) is a national educational platform advancing holistic learning, innovation, leadership, research, Bharatiya values, NEP 2020, and Shiksha Mahakumbh Abhiyan for Viksit Bharat."
        />

        <meta
          name="keywords"
          content="
            Department of Holistic Education,
            DHE Bharat,
            Shiksha Mahakumbh,
            Vidya Bharti,
            NEP 2020,
            Educational Innovation,
            Holistic Education,
            Bharatiya Education,
            Viksit Bharat,
            Educational Leadership,
            Research and Innovation,
            Indian Education,
            DHE,
            Holistic Learning,
            Skill Development,
            National Education
          "
        />

        <meta name="author" content="Department of Holistic Education" />
        <meta name="robots" content="index, follow" />

        {/* MOBILE SEO */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <meta name="theme-color" content="#f97316" />

        {/* ICON */}
        <link rel="icon" href="/dhe.png" sizes="any" />

        {/* OPEN GRAPH */}
        <meta
          property="og:title"
          content="Department of Holistic Education (DHE)"
        />

        <meta
          property="og:description"
          content="Empowering Bharat through holistic education, innovation, leadership, research, and Shiksha Mahakumbh Abhiyan."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content="https://www.dhe.org.in/dhe.png"
        />

        <meta
          property="og:url"
          content="https://www.dhe.org.in"
        />

        {/* TWITTER SEO */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Department of Holistic Education (DHE)"
        />

        <meta
          name="twitter:description"
          content="National Educational Transformation Platform for Viksit Bharat."
        />

        <meta
          name="twitter:image"
          content="https://www.dhe.org.in/dhe.png"
        />

        {/* GOOGLE ADS */}
        {process.env.NODE_ENV === "production" && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4330032354977759"
            crossOrigin="anonymous"
          ></script>
        )}

        {/* BOTPRESS */}
        <script
          async
          src="https://cdn.botpress.cloud/webchat/v1/inject.js"
        ></script>

        <script
          async
          src="https://mediafiles.botpress.cloud/fa60123e-045a-48d8-862e-81258c3ccc9a/webchat/config.js"
        ></script>

      </head>

      <body
        className={`${inter.className} bg-white text-black overflow-x-hidden`}
      >

        {/* TOP LOADER */}
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

        {/* FLOATING COMPONENT */}
        <Floating />

        {/* HEADER */}
        <header className="sticky top-0 z-50 bg-white shadow-sm">

          <div className="border-b border-orange-100">
            <CompanyInfo />
          </div>

          <Header />

        </header>

        {/* MAIN CONTENT */}
        <main className="min-h-screen bg-gradient-to-b from-white via-orange-50/20 to-white">

          {children}

        </main>

        {/* FOOTER */}
        <BottomView />

        {/* GLOBAL TOASTER */}
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

        {/* MODAL */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#07111f] via-[#0f172a] to-[#111827] p-6 md:p-10 text-center">

            {/* BG EFFECT */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-orange-500 opacity-20 blur-3xl rounded-full"></div>

            <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

            <div className="relative z-10">

              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/20 text-orange-300 text-sm font-semibold border border-orange-400/20 mb-6">
                National Educational Movement
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">

                शिक्षा महाकुंभ अभियान
                <span className="block text-orange-400 mt-2">
                  6th Edition
                </span>

              </h2>

              <p className="text-gray-300 mt-6 text-lg md:text-xl leading-8">

                Join the national educational movement at
                <span className="font-bold text-orange-400">
                  {" "}NIT Hamirpur
                </span>

                <br />

                from

                <span className="font-bold text-white">
                  {" "}9th October to 11th October 2026
                </span>

              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

                <a
                  href="https://www.rase.co.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    bg-gradient-to-r
                    from-orange-500
                    to-orange-600
                    hover:from-orange-600
                    hover:to-orange-700
                    text-white
                    px-8
                    py-4
                    rounded-2xl
                    font-semibold
                    transition-all
                    duration-300
                    hover:scale-105
                    shadow-2xl
                  "
                >
                  Visit Website
                </a>

                <button
                  onClick={closeModal}
                  className="
                    border
                    border-white/20
                    text-white
                    hover:border-orange-400
                    hover:text-orange-400
                    px-8
                    py-4
                    rounded-2xl
                    font-semibold
                    transition-all
                    duration-300
                  "
                >
                  Continue
                </button>

              </div>

            </div>

          </div>

        </Modal>

      </body>

    </html>
  );
}
