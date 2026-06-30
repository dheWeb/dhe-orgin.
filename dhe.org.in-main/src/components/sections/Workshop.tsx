import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const relatedActivityLinks = [
  { href: "/pastevent", label: "Past Events", description: "Archive of DHE programs and conferences" },
  { href: "/upcomingevent", label: "Upcoming Events", description: "Current and planned initiatives" },
  { href: "/noticeboard", label: "DHE Notice Board", description: "Official notices and updates" },
  { href: "/messages", label: "Director's Message", description: "Leadership and educational vision" },
  { href: "/contribute", label: "Join DHE — Membership", description: "Membership and engagement" },
] as const;

const Workshop: React.FC = () => {
  return (
    <div className="bg-white min-w-0">
      <div className="dhe-container py-6 sm:py-10">
        <header className="max-w-3xl mx-auto text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-color">
            Innovation &amp; Entrepreneurship Workshop (May 2024)
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Archive of the May 2024 Innovation &amp; Entrepreneurship workshop led
            through DHE for school students, teachers, and ATL coordinators.
            Registration is closed; content is retained for reference.
          </p>
        </header>

        <section
          aria-labelledby="workshop-archive-heading"
          className="max-w-3xl mx-auto mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 sm:p-5"
        >
          <h2
            id="workshop-archive-heading"
            className="text-lg font-semibold text-amber-900"
          >
            Workshop Archive
          </h2>
          <p className="mt-2 text-sm sm:text-base text-amber-950 leading-relaxed">
            This page documents a one-day workshop that was conducted on{" "}
            <strong>10 May 2024</strong> at CSIR-CSIO, Chandigarh. The
            announcement, schedule, and coordinator information below are
            preserved for reference. This is not an active registration page.
          </p>
          <p className="mt-3 text-sm sm:text-base text-amber-950 leading-relaxed">
            For current and forthcoming DHE programs, please visit{" "}
            <Link
              href="/upcomingevent"
              className="font-semibold text-orange-800 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
            >
              upcoming events
            </Link>
            , the{" "}
            <a
              href="https://www.rase.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-orange-800 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
            >
              Shiksha Mahakumbh
            </a>{" "}
            initiative, or{" "}
            <Link
              href="/pastevent"
              className="font-semibold text-orange-800 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
            >
              past events
            </Link>
            .
          </p>
        </section>

        <div className="max-w-5xl mx-auto pt-2 text-primary-color">
          <h2 className="text-2xl font-bold mb-4 text-red-950 text-center">
            Workshop Announcement
          </h2>
          <Carousel showThumbs={false}>
            <div className="relative h-[25vh] pl-1 pr-1 md:h-[60vh]">
              <Image
                src="/14.jpg"
                alt="Innovation and Entrepreneurship workshop at CSIO Chandigarh"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
            <div className="relative h-[25vh] pl-1 pr-1 md:h-[60vh]">
              <Image
                src="/15.jpg"
                alt="Workshop session with students and teachers"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
            <div className="relative h-[25vh] pl-1 pr-1 md:h-[60vh]">
              <Image
                src="/16.jpg"
                alt="Hands-on learning at the DHE and CSIO workshop"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
            <div className="relative h-[25vh] pl-1 pr-1 md:h-[60vh]">
              <Image
                src="/17.jpg"
                alt="Participants at the innovation and entrepreneurship workshop"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </Carousel>
          <h2 className="text-xl font-bold mb-4 justify-between">
            Innovation and Entrepreneurship for School Students, Teachers and
            Atal Tinkering Labs&apos; Co-ordinators
          </h2>
          <ul className="list-none pl-2 mb-6 text-justify pr-2">
            <li>
              We are thrilled to announce a One-Day Workshop on &quot;Innovation
              and Entrepreneurship for School Students, Teachers and Atal
              Tinkering Labs&apos; Co-ordinators&quot; organized jointly by the
              Department of Holistic Education (DHE) and CSIR-Central Scientific
              Instruments Organisation (CSIO) under the CSIR-CSIO Skill Integrated
              Initiative and PRISM Scheme.
            </li>
            <br />
            <li>
              <span className="font-bold text-red-800">Date: 10th May 2024</span>
              <span className="ml-2 text-sm text-gray-600">(completed)</span>
            </li>
            <br />
            <li>
              <span className="font-bold text-red-800">Time: 10AM to 5PM</span>
            </li>
            <br />
            <li>
              <span className="font-bold text-red-800">
                Venue: CSIO Chandigarh
              </span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">About the Workshop</h2>
          <ul className="list-none pl-2 mb-6">
            <li>
              This workshop aims to foster innovation and entrepreneurship skills
              among school students, teachers and co-ordinators of Atal Tinkering
              Labs in the tri-city area of Chandigarh, Mohali, and Panchkula.
              Through insightful sessions, interactive discussions, and hands-on
              experiences, participants will gain valuable knowledge and
              inspiration to explore the world of innovation and entrepreneurship
              from scientists of CSIO, ISRO, DRDO, Industry Experts, Subject
              Experts, etc.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Target Participants</h2>
          <ul className="list-decimal pl-6 mb-6">
            <li>Students (Grades 9-12)</li>
            <li>ATL Labs Coordinators</li>
            <li>Science Teachers (TGT &amp; PGT) from Tricity Schools</li>
          </ul>
          <h2 className="text-2xl font-bold mb-4 text-red-800">
            Tentative Schedule of Workshop
          </h2>
          <ul className="list-none pl-2 mb-6">
            <li className="text-xl font-bold">Session-1</li>
            <li>Inaugural Address by Director, CSIO</li>
            <li className="text-xl font-bold">Session-2</li>
            <li>
              Insights into Cutting-Edge Research at CSIO Chandigarh and
              Opportunities for School Students and Teachers
            </li>
            <li className="text-xl font-bold">Session-3</li>
            <li>Introduction to Innovation and Entrepreneurship</li>
            <li className="text-xl font-bold">Session-4</li>
            <li>Interaction Session with Women Entrepreneurs</li>
            <li className="text-xl font-bold">Session-5</li>
            <li>
              Insights into Cutting-Edge Research at DHE Mohali and Opportunities
              for School Students and Teachers
            </li>
            <li className="text-xl font-bold">Session-6</li>
            <li>Visit of Mechatronics/Electronics Labs at CSIO Chandigarh</li>
            <li className="text-xl font-bold">Session-7</li>
            <li>Q&amp;A and Networking</li>
          </ul>
          <p className="text-lg font-semibold mb-2">Event Coordinators</p>
          <div className="overflow-x-auto mb-6">
            <table className="w-11/12 table-auto py-2">
              <thead>
                <tr className="bg-primary-color">
                  <th className="w-1/2 sm:w-1/5 px-1 py-2 border text-left text-white">
                    Name
                  </th>
                  <th className="w-1/2 sm:w-1/5 px-1 py-2 border text-left text-white">
                    Designation
                  </th>
                  <th className="w-1/2 sm:w-1/5 px-1 py-2 border text-left text-white">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
                    Dr. Pooja Devi
                  </td>
                  <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
                    Principal Scientist, CSIO, Chandigarh
                  </td>
                  <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
                    <a
                      className="text-primary font-bold hover:text-blue-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
                      href="tel:7837907516"
                    >
                      7837907516
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
                    Dr. Narinder Singh
                  </td>
                  <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
                    Principal Scientist and CAIR Integrated Skill Initiative
                    Co-ordinator
                  </td>
                  <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
                    <a
                      className="text-primary font-bold hover:text-blue-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
                      href="tel:7627888222"
                    >
                      7627888222
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
                    Mr. Ramendra Singh
                  </td>
                  <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
                    Co-ordinator, DHE
                  </td>
                  <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
                    <a
                      className="text-primary font-bold hover:text-blue-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
                      href="tel:7903431900"
                    >
                      7903431900
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="font-semibold text-black">
            For registration and further information, please contact the above
            mentioned numbers. Registration for this 2024 workshop is closed;
            historical registration information is available on the{" "}
            <Link
              href="/registrationForm"
              className="font-bold text-red-800 hover:text-blue-900 underline"
            >
              registration page
            </Link>
            .
          </p>
          <p className="text-xl mt-2 text-black">
            <span className="inline-block rounded-full bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-0.5 mr-2 align-middle">
              Registration Closed
            </span>
            For registration,{" "}
            <Link
              className="font-bold text-red-800 hover:text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
              href="/registrationForm"
            >
              open workshop registration form (archived)
            </Link>
            <span className="block text-sm text-gray-600 mt-1">
              (historical reference only)
            </span>
          </p>
        </div>

        <section
          aria-labelledby="related-activities-heading"
          className="max-w-3xl mx-auto mt-10 pt-8 border-t border-gray-200"
        >
          <h2
            id="related-activities-heading"
            className="text-xl font-semibold text-primary-color"
          >
            Related Educational Activities
          </h2>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
            {relatedActivityLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg border border-gray-200 p-4 hover:border-orange-400 hover:bg-orange-50/50 min-h-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                >
                  <span className="font-semibold text-orange-700">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-sm text-gray-600">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-gray-600">
            Questions about programs?{" "}
            <Link
              href="/contact"
              className="text-orange-700 font-medium hover:underline"
            >
              Contact DHE
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default Workshop;
