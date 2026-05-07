import React from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";

const Marquees: React.FC = () => {
  interface Item {
    imageUrl: string;
    text: string;
    link: string;
  }

  const marquees: Item[] = [
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
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#07111f] via-[#0f172a] to-[#111827] border-y border-orange-500/20 shadow-lg">

      {/* Background Glow */}
      <div className="absolute left-0 top-0 w-40 h-40 bg-orange-500 opacity-10 blur-3xl rounded-full"></div>

      <div className="relative flex items-center">

        {/* Announcement Label */}
        <div
          className="
            flex
            items-center
            justify-center
            bg-gradient-to-r
            from-orange-500
            to-orange-600
            text-white
            font-bold
            tracking-wide
            text-sm
            md:text-base
            px-4
            md:px-6
            py-4
            min-w-fit
            shadow-lg
            z-10
          "
        >
          <span className="animate-pulse mr-2">●</span>
          ANNOUNCEMENTS
        </div>

        {/* Marquee Content */}
        <div className="flex-1 py-2">

          <Marquee
            speed={55}
            gradient={false}
            pauseOnHover={true}
            pauseOnClick={true}
          >
            {marquees.map((marqueeContent, index) => (
              <Link
                key={index}
                href={marqueeContent.link}
                target="_blank"
                className="
                  flex
                  items-center
                  mx-8
                  group
                  transition-all
                  duration-300
                "
              >

                {/* Icon */}
                <div className="flex-shrink-0">
                  <img
                    src={marqueeContent.imageUrl}
                    alt="Announcement"
                    className="
                      h-8
                      w-8
                      md:h-10
                      md:w-10
                      object-contain
                      mr-4
                    "
                  />
                </div>

                {/* Text */}
                <p
                  className="
                    text-white
                    text-sm
                    md:text-base
                    font-medium
                    tracking-wide
                    group-hover:text-orange-300
                    transition-all
                    duration-300
                  "
                >
                  {marqueeContent.text}
                </p>

              </Link>
            ))}
          </Marquee>

        </div>
      </div>
    </section>
  );
};

export default Marquees;
