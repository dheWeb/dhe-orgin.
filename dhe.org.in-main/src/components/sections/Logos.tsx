"use client";

import { AssetCard } from "@/components/ui/AssetCard";

const cardData = [
  { title: "VBITR Chandigarh", image: "/logos/vbitr.webp", download: "/logos/vbitr.png" },
  { title: "Viksit India", image: "/logos/viksitindia.webp", download: "/logos/viksitindia.png" },
  { title: "Viksit Bharat", image: "/logos/viksitbharat.jpg", download: "/logos/viksitbharat.jpg" },
  { title: "Sarvatr", image: "/logos/sarvatr.png", download: "/logos/sarvatr.png" },
  { title: "Shiksha Kumbh/Mahakumbh Abhiyan", image: "/logos/shikshamahakumbh.png", download: "/logos/shikshamahakumbh.png" },
  { title: "Holistic Harbour", image: "/logos/holisticharbour.jpeg", download: "/logos/holisticharbour.jpeg" },
  { title: "Job 360", image: "/logos/job360.png", download: "/logos/job360.png" },
  { title: "Pooja Wala", image: "/logos/poojawala.png", download: "/logos/poojawala.png" },
  { title: "Swadeshi Bazar", image: "/logos/swadeshibazar.png", download: "/logos/swadeshibazar.png" },
  { title: "Tredul", image: "/logos/tre-dul.png", download: "/logos/tre-dul.png" },
  { title: "Tudu", image: "/logos/Tudu.webp", download: "/logos/Tudu.png" },
  { title: "DHE", image: "/logos/dhe.webp", download: "/logos/dhe.png" },
  { title: "Vidya Bharti", image: "/logos/vidyabharti.png", download: "/logos/vidyabharti.png" },
  { title: "Punjab Super 100", image: "/logos/pb100.png", download: "/logos/pb100.png" },
];

export default function Logos() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">Logos</h1>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {cardData.map((data) => (
          <AssetCard
            key={data.title}
            title={data.title}
            description="Click preview or download for the official logo file."
            imageSrc={data.image}
            previewLink={data.image}
            downloadLink={data.download}
          />
        ))}
      </div>
    </div>
  );
}
