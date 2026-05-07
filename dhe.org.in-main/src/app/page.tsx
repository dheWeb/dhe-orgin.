import BottomView from "./component/BottomView";
import CompanyInfo from "./component/CompanyInfo";
import Marquees from "./component/Marquees";
import MiddleComponent from "./component/MiddleComponent";
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
    <main className="bg-white overflow-hidden">

      {/* Top Components */}
      <CompanyInfo />
      <Marquees />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-[#07111f] via-[#0f172a] to-[#111827] overflow-hidden">

        {/* Background Blur */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 opacity-10 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-10 blur-3xl rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-16">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT SIDE */}
            <div className="lg:col-span-8">

              {/* SLIDESHOW */}
              <div className="overflow-hidden rounded-[35px] shadow-2xl border border-white/10">
                <SlideShow slides={slides1} />
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-4 space-y-8">

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

            </div>

          </div>

        </div>

      </section>

      {/* Middle Section */}
      <section className="py-16 bg-white">

        <div className="max-w-7xl mx-auto px-4">
          <MiddleComponent />
        </div>

      </section>

      {/* Footer */}
      <BottomView />

    </main>
  );
}
