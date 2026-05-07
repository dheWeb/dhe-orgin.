import SlideShow from "./component/SlideShow";
import NoticeBoard from "./component/NoticeBoard";


export default function Home() {

  const slides1 = [
    {
      src: "/2024K/k6.jpg",
      alt: "Prof. Rajeev Ahuja and Dr. Thakur SKR invited Hon’ble President of Bharat for Shiksha Mahakumbh 2024",
      legend: "Shiksha Mahakumbh National Educational Movement",
    },
    {
      src: "/2024K/up_cm.jpg",
      alt: "Shiksha Mahakumbh team inviting Hon’ble Chief Minister of Uttar Pradesh",
      legend: "Educational Leadership & National Collaboration",
    },
    {
      src: "/R1.jpeg",
      alt: "DHE signed MoU with INST Mohali",
      legend: "Research & Institutional Partnerships",
    },
    {
      src: "/2024K/k1.jpeg",
      alt: "DHE Educational Initiative",
      legend: "Holistic Educational Transformation",
    },
    {
      src: "/2024K/k4.jpg",
      alt: "Shiksha Mahakumbh Event",
      legend: "National Educational Dialogue",
    },
    {
      src: "/k3.JPG",
      alt: "Educational Leadership Program",
      legend: "Leadership & Innovation",
    },
    {
      src: "/sm1.jpg",
      alt: "Students and Educators",
      legend: "Empowering Future Bharat",
    },
    {
      src: "/sm2.JPG",
      alt: "National Educational Ecosystem",
      legend: "Building Viksit Bharat",
    },
    {
      src: "/12.jpeg",
      alt: "Department of Holistic Education",
      legend: "Education • Innovation • Leadership",
    },
  ];

  return (
    // <main className="bg-white overflow-hidden">

      {/* COMPANY INFO */}
      {/* <CompanyInfo /> */}

      {/* MARQUEE */}
      // <Marquees />

      {/* HERO SECTION */}
      // <section className="relative bg-gradient-to-b from-[#07111f] via-[#0f172a] to-[#111827] overflow-hidden">

        {/* Background Blur */}
        {/* <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-10 blur-3xl rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-16">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"> */}

            {/* LEFT SIDE */}
            {/* <div className="lg:col-span-8"> */}

              {/* HERO TEXT */}
              {/* <div className="mb-10">

                <div className="inline-flex items-center px-5 py-2 rounded-full bg-orange-500/20 text-orange-300 text-sm font-semibold mb-6 border border-orange-500/20">
                  National Educational Transformation Platform
                </div>

                <h1 className="text-4xl lg:text-7xl font-extrabold text-white leading-tight">
                  Department of
                  <span className="block text-orange-400">
                    Holistic Education
                  </span>
                </h1>

                <p className="text-gray-300 text-lg lg:text-xl leading-9 mt-8 max-w-5xl">
                  Advancing Bharat as a global knowledge leader through
                  holistic education, innovation, leadership,
                  entrepreneurship, research, digital ecosystems,
                  and Bharatiya values aligned with NEP 2020.
                </p>
              </div> */}

              {/* SLIDESHOW */}
              <div className="overflow-hidden rounded-[35px] shadow-2xl border border-white/10">
                <SlideShow slides={slides1} />
              </div>

              {/* STATS */}
            //   <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

            //     <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
            //       <h2 className="text-4xl font-bold text-orange-400">
            //         2021
            //       </h2>

            //       <p className="text-gray-300 mt-3">
            //         Founded
            //       </p>
            //     </div>

            //     <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
            //       <h2 className="text-4xl font-bold text-orange-400">
            //         NEP
            //       </h2>

            //       <p className="text-gray-300 mt-3">
            //         Vision Aligned
            //       </p>
            //     </div>

            //     <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
            //       <h2 className="text-4xl font-bold text-orange-400">
            //         India
            //       </h2>

            //       <p className="text-gray-300 mt-3">
            //         National Reach
            //       </p>
            //     </div>

            //     <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
            //       <h2 className="text-4xl font-bold text-orange-400">
            //         Global
            //       </h2>

            //       <p className="text-gray-300 mt-3">
            //         Educational Vision
            //       </p>
            //     </div>
            //   </div>
            // </div>

            {/* RIGHT SIDE */}
            // <div className="lg:col-span-4 space-y-8">

              {/* NOTICE BOARD */}
              <div className="bg-white rounded-[35px] shadow-2xl overflow-hidden border border-orange-100">
                
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5">
                  <h2 className="text-2xl font-bold text-white">
                    Latest Notices
                  </h2>

                  <p className="text-orange-100 mt-1 text-sm">
                    Announcements & Updates
                  </p>
                </div>

                <div className="p-5">
                  <NoticeBoard />
                </div>
              </div>

              {/* QUICK INFO */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-[35px] shadow-2xl p-8 text-white">

                <h2 className="text-3xl font-bold mb-6">
                  DHE Mission
                </h2>

                <p className="leading-8 text-orange-50">
                  To create a holistic educational ecosystem that
                  nurtures innovation, leadership, values,
                  skills, research, entrepreneurship, and
                  national development for Viksit Bharat.
                </p>

                <div className="mt-8 space-y-4">

                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    Educational Leadership
                  </div>

                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    Research & Innovation
                  </div>

                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    Digital Transformation
                  </div>

                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    Holistic Development
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      {/* <section>
        <DepartmentInfo />
      </section> */}

      {/* RESIDENTIAL CAMPS */}
      {/* <section className="bg-gradient-to-b from-orange-50 to-white">
        <ResidentialCamps />
      </section> */}

      {/* MIDDLE COMPONENT */}
      {/* <section className="relative py-20 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-white to-orange-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">

          <div className="text-center mb-16">

            <div className="inline-flex items-center px-5 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-5">
              Educational Innovation & National Development
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900">
              DHE Ecosystem &
              <span className="block text-orange-500">
                National Initiatives
              </span>
            </h2>

            <p className="max-w-4xl mx-auto mt-6 text-lg text-gray-600 leading-9">
              Empowering institutions, educators, researchers,
              youth leaders, and students through integrated
              educational platforms and innovation ecosystems.
            </p>
          </div>

          <MiddleComponent />
        </div>
      </section> */}

      {/* CALL TO ACTION */}
       // <section className="relative overflow-hidden bg-[#07111f] py-20">

       //  <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 opacity-10 blur-3xl rounded-full"></div>
       //  <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-10 blur-3xl rounded-full"></div>

       //  <div className="relative max-w-6xl mx-auto px-4 lg:px-8 text-center"> 

          {/* <div className="inline-flex items-center px-5 py-2 rounded-full bg-orange-500/20 text-orange-300 text-sm font-semibold mb-6 border border-orange-500/20">
            Join the Educational Transformation Movement
          </div>

          <h2 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight">
            Building Bharat as a
            <span className="block text-orange-400">
              Global Knowledge Leader
            </span>
          </h2>

          <p className="max-w-4xl mx-auto mt-8 text-lg lg:text-xl text-gray-300 leading-9">
            Through holistic education, research, innovation,
            leadership development, entrepreneurship, and
            Bharatiya knowledge systems, DHE is shaping the
            future of education and empowering the next generation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12">

            <a
              href="https://www.rase.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="
                bg-gradient-to-r
                from-orange-500
                to-orange-600
                hover:from-orange-600
                hover:to-orange-700
                text-white
                px-10
                py-5
                rounded-2xl
                font-semibold
                shadow-2xl
                transition-all
                duration-300
                hover:scale-105
              "
            >
              Explore Shiksha Mahakumbh
            </a>

            <a
              href="https://www.dhe.org.in"
              target="_blank"
              rel="noopener noreferrer"
              className="
                border
                border-white/20
                hover:border-orange-400
                hover:text-orange-400
                text-white
                px-10
                py-5
                rounded-2xl
                font-semibold
                transition-all
                duration-300
              "
            >
              Visit Official Website
            </a>
          </div>
        </div>
      </section> */}

      {/* FOOTER */}
    //    <BottomView />
    // </main>
  );
}
