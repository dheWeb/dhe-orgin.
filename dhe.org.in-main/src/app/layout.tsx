"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import Floating from "./component/Floating";
import CompanyInfo from "./component/CompanyInfo";
import Header from "./component/Header";
import BottomView from "./component/BottomView";
const inter = Inter({ subsets: ["latin"] });
import toast, { Toaster } from "react-hot-toast";
import Modal from "./component/Modal";
import { useState, useEffect } from "react";

interface CustomWindow extends Window {
  localStream?: MediaStream;
  localAudio?: HTMLAudioElement;
}

declare var window: CustomWindow;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      window.localStream = stream;

      if (!window.localAudio) {
        window.localAudio = new Audio();
        document.body.appendChild(window.localAudio);
      }

      window.localAudio.srcObject = stream;
      window.localAudio.autoplay = true;
    } catch (err) {
      console.error(`You got an error: ${err}`);
    }
  };

  useEffect(() => {
    // Uncomment the line below to automatically request permissions on page load (not recommended).
    // handlePermission();
  }, []);

  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === "production" && (
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4330032354977759"
            crossOrigin="anonymous"
          ></script>
        )}
        <script async src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
        <script
          async
          src="https://mediafiles.botpress.cloud/fa60123e-045a-48d8-862e-81258c3ccc9a/webchat/config.js"
          defer
        ></script>
      </head>

      <meta httpEquiv="refresh" content="1000" />
      <meta charSet="utf-8" />
      <link rel="icon" href="/dhe.png" sizes="any" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <title>Department of Holistic Education &minus; Vidya Bharti</title>
      <meta
        name="keywords"
        content="Department of Holistic Education,holistic department, DHE ,Vidya Bharti, National Conference on Recent Advances in School Education, Rase"
      />
      <meta name="description" content="Welcome to DHE" />
      <meta httpEquiv="cache-control" content="no-cache" />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Expires" content="-1" />

      <body className={inter.className} style={{ background: "#ffffff" }}>
        <CompanyInfo />
        <Header />
        {children}
        <BottomView />

        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="text-white p-4 rounded-lg flex flex-col items-center justify-center text-center text-base md:text-xl font-semibold bg-primary">
            <p>
          <strong>शिक्षा महाकुंभ 2.0</strong>was successfully concluded at Kurukshetra University from December 16-17, 2024. <strong> To download photographs click here</strong>:
            </p>
            <p>
             <a href="https://drive.google.com/drive/folders/1XnauGu1-dQ2KCpTzvIMHhUwlBF-6GDEN" className="text-white">
                Link
             </a>
            </p>
          </div>

        </Modal>
        <NextTopLoader
          color="#F44336"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={false}
          showSpinner={false}
          shadow="0 0 10px #F44336,0 0 5px #F44336"
        />
        <Toaster />
      </body>
    </html>
  );
}
