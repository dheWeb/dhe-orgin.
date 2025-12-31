import BottomView from "./component/BottomView";
import CompanyInfo from "./component/CompanyInfo";
import Marquees from "./component/Marquees";
import MiddleComponent from "./component/MiddleComponent";
import SlideShow from "./component/SlideShow";
import NoticeBoard from "./component/NoticeBoard";
import PastEvent from "./component/PastEvent";
import UpcomingEvent from "./component/UpcomingEvent";
import ResidentialCamps from "./component/ResidentialCamps";

export default function Home() {
  const slides1 = [
    {
      src: "/2024K/k6.jpg",
      alt: "Prof. Rajeev Ahuja and Dr. Thakur SKR invited Smt. Droupadi Murmu, the Hon’ble President of Bharat, for the Shiksha Mahakumbh 2024",
      legend: "",
    },
    {
      src: "/2024K/up_cm.jpg",
      alt: "Shiksha Mahakumbh team inviting Hon’ble Chief Minister, UP to 2nd Edition",
      legend: "",
    },
    {
      src: "/R1.jpeg",
      alt: "DHE की HEI को-ऑर्डिनेशन सेल ने 11 मार्च 2024 को INST मोहाली के साथ शिक्षा के क्षेत्र में एक MoU साइन किया",
      legend: "",
    },
    {
      src: "/2024K/k1.jpeg",
      alt: "",
      legend: "",
    },
    {
      src: "/2024K/k4.jpg",
      alt: "",
      legend: "",
    },
    {
      src: "/k3.JPG",
      alt: "",
      legend: "",
    },
    {
      src: "/sm1.jpg",
      alt: "",
      legend: "",
    },
    {
      src: "/sm2.JPG",
      alt: "",
      legend: "",
    },

    {
      src: "/12.jpeg",
      alt: "",
      legend: "",
    },
  ];
  const MobileView = () => (
    <div className="flex flex-col space-y-4 items-center">
      <Marquees />
      <SlideShow slides={slides1} />
      <MiddleComponent />
    </div>
  );

  // Components for Desktop View
  const DesktopView = () => (
    <div>
      <div className="flex flex-col md:flex-col items-center justif space-x-4 space-y-4">
        <div className="flex flex-col md:flex-col">
          <div className="flex">
          <div className="w-1/4">
          <div>
            {/* <img src="./news.gif" alt="" /> */}</div>
            {/* <NoticeBoard /> */}
          <ResidentialCamps />
            </div>
            <div className="w-3/5">
              <SlideShow slides={slides1} />
            </div>
            <div className="w-1/4">
              <NoticeBoard />
            </div>
          </div>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4330032354977759"
            crossOrigin="anonymous"
          ></script>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-4330032354977759"
            data-ad-slot="6774265057"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</script>

          <div className="w-3/5 ml-auto mr-auto">
            <MiddleComponent />
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-1/2"></div>
      </div>
      <div>{/* <NoticeBoard /> */}</div>
    </div>
  );
  return (
    <div className="bg-white">
      <div>
        {/* Show Mobile or Desktop View based on screen size */}
        <div className="sm:hidden">
          <div className="flex flex-col space-y-4 items-center">
            <Marquees />
            <SlideShow slides={slides1} />
            <NoticeBoard />
            <MiddleComponent />
          </div>
        </div>
        <div className="hidden sm:block">
          <Marquees />
          <DesktopView />
        </div>
      </div>
    </div>
  );
}
