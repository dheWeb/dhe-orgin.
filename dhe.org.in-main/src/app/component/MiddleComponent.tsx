import React from "react";
import Image from "next/image";

const DepartmentInfo: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50 to-white py-14 px-4 lg:px-10">
      
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-200 opacity-20 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">

          {/* Left Content */}
          <div>
            <div className="inline-flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-5">
              Transforming Education for Viksit Bharat
            </div>

            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight text-gray-900">
              Department of
              <span className="block text-orange-500">
                Holistic Education
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-700 leading-9 text-justify">
              The Department of Holistic Education (DHE) is a
              national educational transformation platform dedicated
              to building Bharat as a global knowledge leader through
              value-based education, innovation, research,
              entrepreneurship, and holistic human development
              aligned with NEP 2020.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">

              <div className="bg-white rounded-3xl shadow-xl p-5 border border-orange-100">
                <h2 className="text-3xl font-bold text-orange-500">
                  2021
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Founded
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-5 border border-orange-100">
                <h2 className="text-3xl font-bold text-orange-500">
                  2023
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  National Expansion
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-5 border border-orange-100">
                <h2 className="text-3xl font-bold text-orange-500">
                  NEP
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Aligned Vision
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-5 border border-orange-100">
                <h2 className="text-3xl font-bold text-orange-500">
                  India
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  National Reach
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-orange-300 rounded-[40px] blur-3xl opacity-20"></div>

            <div className="relative bg-white rounded-[40px] shadow-2xl overflow-hidden border border-orange-100">
              <Image
                src="/dhe-banner.jpg"
                alt="Department of Holistic Education"
                width={1200}
                height={900}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-white rounded-[40px] shadow-2xl border border-orange-100 p-8 lg:p-14 mb-16">

          <div className="flex items-center gap-4 mb-8">
            <div className="w-3 h-12 bg-orange-500 rounded-full"></div>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Vision & Foundation
            </h2>
          </div>

          <p className="text-gray-700 leading-9 text-lg text-justify">
            Inspired by the transformative educational philosophy of
            Vidya Bharti, DHE was established as a catalyst for
            educational reform, innovation, and thought leadership
            in India. Founded in 2021 under Vidya Bharti Punjab and
            scaled nationally in 2023 under the Vidya Bharti Institute
            of Training & Research (VBITR) Trust, DHE has rapidly
            evolved into an action-oriented national platform advancing
            holistic education, skill development, leadership,
            innovation, and Bharatiya values.
          </p>
        </div>

        {/* Impact + Leadership */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

          {/* Impact */}
          <div className="bg-gradient-to-br from-[#fff7ed] to-white rounded-[35px] p-8 shadow-xl border border-orange-100">
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              National Impact
            </h2>

            <p className="text-gray-700 leading-8 text-justify">
              DHE functions as the intellectual and operational
              nerve center for advancing educational discourse and
              implementation across Bharat. Through policy dialogue,
              institutional collaboration, leadership development,
              research initiatives, conferences, and digital platforms,
              DHE empowers educators, institutions, students,
              policymakers, and communities.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-gray-700">
                  National Educational Conferences & Summits
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-gray-700">
                  Innovation & Entrepreneurship Ecosystem
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-gray-700">
                  Digital Educational Platforms & Solutions
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-gray-700">
                  Leadership & Skill Development Initiatives
                </p>
              </div>
            </div>
          </div>

          {/* Leadership */}
          <div className="bg-[#07111f] rounded-[35px] p-8 shadow-2xl text-white relative overflow-hidden">

            <div className="absolute top-0 right-0 w-72 h-72 bg-orange-500 opacity-10 blur-3xl rounded-full"></div>

            <div className="relative">
              <h2 className="text-3xl font-bold mb-6">
                Leadership & Thought Direction
              </h2>

              <p className="text-gray-300 leading-8 text-justify">
                At the helm of DHE is
                <a
                  href="http://www.drthakurskr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 font-bold hover:underline ml-1"
                >
                  Dr. Thakur S. K. R.
                </a>
                , senior scientist at ISRO and pioneer in educational
                experimentation. His vision promotes character,
                competence, creativity, leadership, innovation,
                and globally relevant education rooted in
                Bharatiya civilization ethos.
              </p>

              <div className="mt-10 bg-white/10 border border-white/10 rounded-3xl p-6">
                <h3 className="text-xl font-semibold text-orange-300 mb-3">
                  Vision Statement
                </h3>

                <p className="text-gray-300 leading-8">
                  “Education must empower every learner to become
                  innovative, ethical, skilled, socially responsible,
                  and globally competent while remaining deeply rooted
                  in Bharat’s cultural and spiritual wisdom.”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shiksha Mahakumbh */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-[40px] p-10 lg:p-14 text-white shadow-2xl mb-16">

          <h2 className="text-3xl lg:text-5xl font-bold mb-8">
            Shiksha Mahakumbh Abhiyan
          </h2>

          <p className="text-lg leading-9 text-orange-50 text-justify">
            Through the Shiksha Mahakumbh Abhiyan, DHE has created
            a transformative national movement that brings together
            educators, policymakers, scientists, industry leaders,
            social reformers, institutions, startups, researchers,
            and youth from across Bharat and beyond.
          </p>

          <p className="text-lg leading-9 text-orange-50 mt-6 text-justify">
            More than a conference, it is a dynamic platform for
            collaborative educational reform, policy innovation,
            research dissemination, entrepreneurship development,
            leadership building, and societal transformation.
          </p>
        </div>

        {/* Digital Ecosystem */}
        <div className="mb-20">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900">
              Digital Innovation Ecosystem
            </h2>

            <p className="text-gray-600 mt-5 max-w-4xl mx-auto leading-8">
              DHE actively develops impact-driven digital platforms
              that transform educational vision into practical,
              scalable, and sustainable systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              {
                title: "Tredul",
                desc: "Experiential learning & educational tourism platform",
              },
              {
                title: "Sarvatra",
                desc: "Unified school resource & data management ecosystem",
              },
              {
                title: "Swadeshi Bazaar",
                desc: "Empowering local entrepreneurship & innovation",
              },
              {
                title: "Jobs 360°",
                desc: "Career readiness & employment ecosystem",
              },
              {
                title: "TuDu",
                desc: "Integrated event & initiative management platform",
              },
              {
                title: "Viksit Bharat & Viksit India",
                desc: "Quarterly educational research & policy journals",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="
                  bg-white
                  rounded-[35px]
                  p-8
                  shadow-xl
                  border
                  border-orange-100
                  hover:-translate-y-2
                  hover:shadow-2xl
                  transition-all
                  duration-300
                "
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-orange-500 rounded-xl"></div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-8">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Section */}
        <div className="bg-[#07111f] rounded-[40px] p-10 lg:p-16 text-center text-white shadow-2xl">

          <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
            Building Bharat as a
            <span className="block text-orange-400">
              Global Knowledge Leader
            </span>
          </h2>

          <p className="max-w-5xl mx-auto text-gray-300 leading-9 mt-8 text-lg">
            Through educational transformation, leadership development,
            innovation ecosystems, research, technology integration,
            entrepreneurship, and Bharatiya knowledge systems,
            DHE is committed to shaping the future of education
            and empowering Bharat’s journey toward becoming
            a Vishwa Guru.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">

            <a
              href="https://www.rase.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                bg-orange-500
                hover:bg-orange-600
                px-8
                py-4
                rounded-2xl
                font-semibold
                transition
              "
            >
              Explore Shiksha Mahakumbh
            </a>

            <a
              href="https://www.dhe.org.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                border
                border-white/20
                hover:border-orange-400
                hover:text-orange-400
                px-8
                py-4
                rounded-2xl
                font-semibold
                transition
              "
            >
              Visit Official Website
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepartmentInfo;
