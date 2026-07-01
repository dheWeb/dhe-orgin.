"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";

const marquees = [
  {
    imageUrl: "/new.gif",
    text:
      "शिक्षा महाकुंभ अभियान – 6th Edition at NIT Hamirpur from 9th Oct to 11th Oct 2026.",
    link: "https://www.rase.co.in",
  },
  {
    imageUrl: "/new.gif",
    text:
      "शिक्षा महाकुंभ 5.0 concluded at NIPER Mohali, 31 Oct to 2nd Nov 2025. Download official photos here.",
    link:
      "https://drive.google.com/drive/folders/1c2CKx2Z9IaN-dsoW-Ymw6Npx1EOTFcsA",
  },
  {
    imageUrl: "/new.gif",
    text:
      "Join the educational revolution through Shiksha Mahakumbh at NIT Hamirpur. Registration Open Now.",
    link:
      "https://www.rase.co.in/registration/Single_Registration",
  },
] as const;

const Marquees: React.FC = () => {
  return (
    <section
      aria-label="Announcements"
      className="flex items-stretch min-h-10 bg-gray-900 text-white text-sm border-b border-gray-800"
    >
      <span className="shrink-0 px-3 sm:px-4 py-2.5 bg-orange-600 text-xs font-semibold uppercase tracking-wide flex items-center">
        News
      </span>
      <div className="flex-1 min-w-0 py-1">
        <Marquee speed={50} gradient={false} pauseOnHover pauseOnClick>
          {marquees.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-4 sm:mx-6 text-gray-200 hover:text-orange-300 min-h-11 inline-flex items-center text-xs sm:text-sm"
            >
              {item.text}
            </Link>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Marquees;
