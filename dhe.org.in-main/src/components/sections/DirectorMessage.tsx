"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

const initiativeLinks = [
  { href: "/structure", label: "Cells & Structure" },
  { href: "/people", label: "Cell Co-ordinators" },
  { href: "/cells/event", label: "Event Management Cell" },
  { href: "/cells/rd", label: "R & D Cell" },
  { href: "/pastevent", label: "Past Events" },
  { href: "/upcomingevent", label: "Upcoming Events" },
  { href: "/noticeboard", label: "DHE Notice Board" },
  { href: "/contribute", label: "Join DHE — Membership" },
  { href: "/contact", label: "Contact DHE" },
] as const;

const DirectorMessage: React.FC = () => {
  return (
    <div className="bg-white min-w-0">
      <div className="dhe-container py-6 sm:py-10 space-y-8 sm:space-y-10">
        <header className="text-center max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold text-primary-color">
            Director&apos;s Message
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Department of Holistic Education (DHE)
          </p>
        </header>

        <section
          aria-labelledby="about-dhe-heading"
          className="max-w-3xl mx-auto"
        >
          <h2
            id="about-dhe-heading"
            className="text-xl font-semibold text-primary-color"
          >
            About the Department of Holistic Education
          </h2>
          <div className="mt-3 space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed">
            <p>
              The Department of Holistic Education (DHE) is a national educational
              transformation platform dedicated to building Bharat as a global
              knowledge leader through value-based education, innovation,
              research, entrepreneurship, and holistic human development aligned
              with NEP 2020.
            </p>
            <p>
              Inspired by the transformative educational philosophy of Vidya
              Bharati, DHE was established as a catalyst for educational reform,
              innovation, and thought leadership in India—advancing holistic
              education, skill development, leadership, and Bharatiya values
              through programs, cells, and national initiatives such as Shiksha
              Mahakumbh Abhiyan.
            </p>
            <p>
              DHE&apos;s educational philosophy emphasizes comprehensive
              development: character, competence, creativity, and social
              responsibility alongside academic and vocational growth. The
              national vision aligns with empowering learners and institutions
              to contribute to Viksit Bharat through ethical, skilled, and
              globally aware citizenship rooted in Bharatiya civilization ethos.
            </p>
          </div>
        </section>

        <section aria-labelledby="director-message-heading">
          <h2
            id="director-message-heading"
            className="text-xl font-semibold text-primary-color text-center mb-4"
          >
            Message from the Director
          </h2>
          <div className="flex flex-col md:flex-row md:items-start gap-6 max-w-4xl mx-auto">
            <div className="w-full md:w-1/3 shrink-0 flex flex-col items-center">
              <Image
                src="/director.png"
                alt="Dr. Thakur SKR, Director — Department of Holistic Education"
                className="w-64 h-64 sm:w-80 sm:h-80 rounded-lg shadow-lg border-2 border-red-600 object-cover"
                width={800}
                height={800}
              />
              <p className="text-center font-semibold text-black p-2">
                <a
                  href="https://drthakurskr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
                >
                  <strong>Dr. Thakur SKR</strong>
                </a>
              </p>
            </div>
            <div className="w-full md:w-2/3 min-w-0 space-y-4 text-justify text-black text-sm sm:text-base leading-relaxed">
              <p>
                We believe that the best way to serve the nation is to empower the
                society by means of education. In this regard, the quality of
                education which is being imparted is pivotal. In today&apos;s era,
                on one hand, with increasing number of educational institutes,
                the literacy rate has been increasing steadfastly. However, on
                the other hand, there is a huge increase in unemployment, a huge
                gap in the requirement of skilled manpower, physical and mental
                illnesses, disturbed families, violence and unrest, etc.
              </p>
              <p>
                The Department of Holistic Education at Vidya Bharti was
                conceptualized to effectively bridge this gap in society by
                overhauling the education system. We at DHE are committed to
                making the education system more comprehensive by focusing not
                only on skill development but also aiming at the holistic
                development of students ranging from physical fitness to
                emotional well-being. Our vision is to impart this holistic
                education to children right from their young age so that we can
                mold these green cakes into not only skilled adults but also
                responsible humans who are an asset to the nation.
              </p>
              <p>
                I feel honored to be leading this Department and hope to
                revolutionize our system of education for the betterment of
                society.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="explore-initiatives-heading"
          className="max-w-3xl mx-auto pt-4 border-t border-gray-200"
        >
          <h2
            id="explore-initiatives-heading"
            className="text-xl font-semibold text-primary-color"
          >
            Explore DHE Initiatives
          </h2>
          <ul
            className="mt-4 flex flex-wrap gap-3 text-sm"
            role="list"
            aria-label="Related DHE programs"
          >
            {initiativeLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-md border border-orange-200 bg-orange-50/50 px-3 py-2 font-medium text-orange-800 hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default DirectorMessage;
