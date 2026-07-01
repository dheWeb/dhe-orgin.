"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const WHATSAPP_URL = "https://wa.me/917903431900";

const Floating: React.FC = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact DHE on WhatsApp"
      className="fixed bottom-6 right-6 z-[1000] flex h-14 w-14 min-h-11 min-w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg motion-safe:transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="h-6 w-6" aria-hidden />
    </a>
  );
};

export default Floating;
