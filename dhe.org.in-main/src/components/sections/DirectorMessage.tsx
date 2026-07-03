"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import HomeFeatureCard from "@/components/ui/HomeFeatureCard";

const initiativeLinks = [
  { href: "/structure", label: "Cells & Structure", description: "25 national cells" },
  { href: "/people", label: "Cell Co-ordinators", description: "Directory by cell" },
  { href: "/cells/event", label: "Event Management", description: "SMK & events" },
  { href: "/cells/rd", label: "R & D Cell", description: "Research initiatives" },
  { href: "/pastevent", label: "Past Events", description: "Conference archive" },
  { href: "/upcomingevent", label: "Upcoming Events", description: "SMK 6.0 & more" },
  { href: "/noticeboard", label: "Notice Board", description: "Official updates" },
  { href: "/contribute", label: "Join DHE", description: "Membership" },
  { href: "/contact", label: "Contact DHE", description: "Institutional inquiries" },
] as const;

const DirectorMessage: React.FC<{ aboutParagraphs?: string[] }> = ({
  aboutParagraphs,
}) => {
  const aboutText =
    aboutParagraphs?.length ?
      aboutParagraphs.slice(0, 2).join(" ")
    : "DHE is a national educational transformation platform advancing holistic learning, innovation, and Bharatiya values aligned with NEP 2020.";

  return (
    <div className="bg-white min-w-0">
      <PageHero
        eyebrow="Leadership"
        title="Director's Message"
        description={aboutText}
      />

      <div className="dhe-container py-8 sm:py-12 space-y-10 max-w-6xl mx-auto">
        <section aria-labelledby="about-dhe-heading">
          <h2 id="about-dhe-heading" className="sr-only">
            About DHE
          </h2>
          <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed max-w-3xl">
            {aboutParagraphs?.length ? (
              aboutParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <>
                <p>
                  The Department of Holistic Education (DHE) is dedicated to building Bharat as a
                  global knowledge leader through value-based education, innovation, research, and
                  holistic human development aligned with NEP 2020.
                </p>
                <p>
                  Inspired by Vidya Bharati, DHE advances holistic education, skill development,
                  leadership, and Bharatiya values through programs, cells, and national
                  initiatives such as Shiksha Mahakumbh Abhiyan.
                </p>
              </>
            )}
          </div>
        </section>

        <section aria-labelledby="director-message-heading">
          <h2
            id="director-message-heading"
            className="text-xl font-bold text-gray-900 text-center mb-6"
          >
            Message from the Director
          </h2>
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="w-full md:w-1/3 shrink-0 flex flex-col items-center">
              <Image
                src="/director.png"
                alt="Dr. Thakur SKR, Director — Department of Holistic Education"
                className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl shadow-dhe-md border-2 border-orange-200 object-cover"
                width={800}
                height={800}
              />
              <p className="text-center font-semibold text-gray-900 mt-3">
                <a
                  href="https://drthakurskr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-700 hover:underline"
                >
                  Dr. Thakur S. K. R.
                </a>
              </p>
              <p className="text-xs text-gray-600 text-center mt-1">Director, DHE</p>
            </div>
            <div className="w-full md:w-2/3 min-w-0 space-y-4 text-gray-800 text-sm sm:text-base leading-relaxed">
              <p>
                We believe that the best way to serve the nation is to empower society through
                education. The quality of education imparted is pivotal — literacy is rising, yet
                unemployment, skill gaps, and social challenges persist.
              </p>
              <p>
                DHE was conceptualized to bridge this gap by overhauling the education system toward
                holistic development — physical fitness, emotional well-being, and ethical
                citizenship alongside academic and vocational growth.
              </p>
              <p>
                I am honored to lead this Department and hope to revolutionize our system of
                education for the betterment of society and Viksit Bharat.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="explore-initiatives-heading">
          <h2 id="explore-initiatives-heading" className="text-xl font-bold text-gray-900 mb-5">
            Explore DHE initiatives
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
            {initiativeLinks.map((link) => (
              <li key={link.href}>
                <HomeFeatureCard
                  href={link.href}
                  title={link.label}
                  description={link.description}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default DirectorMessage;
