"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { trackGaEvent } from "@/lib/analytics/ga-events";

type FloatingProps = {
  sitePhone?: string;
};

const Floating: React.FC<FloatingProps> = ({ sitePhone = "7903431900" }) => {
  const digits = sitePhone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/91${digits}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact DHE on WhatsApp"
      onClick={() => trackGaEvent("whatsapp_click", { link_url: whatsappUrl })}
      className="fixed bottom-6 right-6 z-[1000] flex h-14 w-14 min-h-11 min-w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg motion-safe:transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="h-6 w-6" aria-hidden />
    </a>
  );
};

export default Floating;
