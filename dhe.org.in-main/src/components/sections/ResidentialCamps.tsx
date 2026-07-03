import React from "react";
import Link from "next/link";

const ResidentialCamps: React.FC = () => {
  const events = [
    {
      title: "DHE प्रथम आवासीय आवास वर्ग",
      subtitle:
        "राष्ट्रीय शिक्षण, नेतृत्व एवं संगठनात्मक विकास प्रशिक्षण शिविर",
      date: "07–08 September 2024",
      venue: "IIT Ropar",
      link: "/residentialcamps/dhe-first-residential-camp.pdf",
      color: "from-orange-500 to-orange-400",
    },
    {
      title: "DHE द्वितीय आवासीय आवास वर्ग",
      subtitle:
        "समग्र शिक्षा, नेतृत्व विकास एवं राष्ट्रीय चिंतन आवासीय शिविर",
      date: "23–24 November 2024",
      venue: "Gita Niketan, Kurukshetra",
      link: "/residentialcamps/second.webp",
      color: "from-[#07111f] to-[#10223d]",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50 to-white py-14 px-4 lg:px-8 min-h-screen">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-200 blur-3xl opacity-20 rounded-full"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">

          <div className="inline-flex items-center px-5 py-2 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm mb-5">
            Department of Holistic Education
          </div>

          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Residential
            <span className="block text-orange-500">
              Camps & Training Programs
            </span>
          </h1>

          <p className="max-w-4xl mx-auto mt-6 text-lg text-gray-600 leading-9">
            DHE Residential Camps are designed to nurture
            leadership, character, educational innovation,
            organisational development, national consciousness,
            and holistic personality development aligned with
            Bharatiya values and NEP 2020.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {events.map((event, index) => (
            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-[35px]
                bg-white
                border
                border-orange-100
                shadow-2xl
                hover:-translate-y-2
                hover:shadow-orange-200/50
                transition-all
                duration-500
              "
            >

              {/* Top Gradient */}
              <div
                className={`h-3 w-full bg-gradient-to-r ${event.color}`}
              ></div>

              <div className="p-8 lg:p-10">

                {/* Number */}
                <div className="flex items-center justify-between mb-8">

                  <div
                    className={`
                      w-16 h-16 rounded-2xl
                      bg-gradient-to-r ${event.color}
                      flex items-center justify-center
                      text-white text-2xl font-bold
                      shadow-xl
                    `}
                  >
                    0{index + 1}
                  </div>

                  <div className="text-right">
                    <p className="text-sm uppercase tracking-wider text-gray-500">
                      Residential Program
                    </p>

                    <h3 className="text-lg font-bold text-orange-500">
                      DHE Camp
                    </h3>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
                  {event.title}
                </h2>

                {/* Subtitle */}
                <p className="text-gray-600 leading-8 mb-8">
                  {event.subtitle}
                </p>

                {/* Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">

                  <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
                    <p className="text-sm text-gray-500 mb-2">
                      आयोजन तिथि
                    </p>

                    <h4 className="text-lg font-bold text-gray-900">
                      {event.date}
                    </h4>
                  </div>

                  <div className="bg-[#07111f] rounded-2xl p-5">
                    <p className="text-sm text-gray-300 mb-2">
                      आयोजन स्थल
                    </p>

                    <h4 className="text-lg font-bold text-white">
                      {event.venue}
                    </h4>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-10">

                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-orange-500 mt-2"></div>

                    <p className="text-gray-700">
                      Leadership & Organisational Development
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-orange-500 mt-2"></div>

                    <p className="text-gray-700">
                      Bharatiya Educational Philosophy & NEP Vision
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-orange-500 mt-2"></div>

                    <p className="text-gray-700">
                      Holistic Personality & Skill Development
                    </p>
                  </div>
                </div>

                {/* Button */}
                <Link
                  href={event.link}
                  target="_blank"
                  className={`
                    inline-flex
                    items-center
                    justify-center
                    w-full
                    bg-gradient-to-r ${event.color}
                    text-white
                    py-4
                    rounded-2xl
                    font-semibold
                    shadow-xl
                    hover:scale-[1.02]
                    transition-all
                    duration-300
                  `}
                >
                  View Complete Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-20">

          <div className="bg-[#07111f] rounded-[40px] overflow-hidden shadow-2xl">

            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Left */}
              <div className="p-10 lg:p-14">

                <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/20 text-orange-300 text-sm font-semibold mb-6">
                  DHE Leadership Vision
                </div>

                <h2 className="text-4xl font-bold text-white leading-tight mb-6">
                  Building Future Educational Leaders
                </h2>

                <p className="text-gray-300 leading-9 text-lg">
                  DHE Residential Camps create immersive
                  learning environments where educators,
                  researchers, youth leaders, and institutional
                  coordinators engage in collaborative learning,
                  leadership training, national dialogue,
                  innovation thinking, and holistic development.
                </p>
              </div>

              {/* Right */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-10 lg:p-14 flex flex-col justify-center">

                <h3 className="text-3xl font-bold text-white mb-8">
                  Core Objectives
                </h3>

                <div className="space-y-5">

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                    <p className="text-white font-medium">
                      Educational Leadership Development
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                    <p className="text-white font-medium">
                      Organisational Capacity Building
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                    <p className="text-white font-medium">
                      Bharatiya Knowledge & Cultural Values
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                    <p className="text-white font-medium">
                      Innovation, Collaboration & Skill Development
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResidentialCamps;
