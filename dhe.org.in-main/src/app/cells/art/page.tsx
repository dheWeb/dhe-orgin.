import React from "react";
import CellInfo from "@/app/component/CellInfo";
import SlideShow from "@/app/component/SlideShow"; // Import SlideShow component

const MyPage = () => {
  const dataArray = [
    {
      objective:
        "The Art Sale Cell is dedicated to exploring new avenues of skills and startups within schools, specifically in the field of arts. Its primary objective is to develop innovative initiatives and opportunities in the realm of arts.",
      footnote: "Cultivating artistic expression and cultural appreciation",
    },
    // Add more data objects if needed
  ];

  // Define slides data for the slideshow
  const slides = [
    {
      src: "/cells/artcell/1.jpg", // Update with actual image paths
      alt: "",
    },
    {
      src: "/cells/artcell/2.jpg",
      alt: "",
    },
    {
      src: "/cells/artcell/3.jpg", // Update with actual image paths
      alt: "",
    },
    {
      src: "/cells/artcell/4.jpg",
      alt: "",
    },
    // Add more slides as needed
  ];

  return (
    <div className="bg-white sm:w-3/5 m-auto px-2">
      <p className="text-center text-2xl font-bold p-4 text-primary-color">
        Cells
      </p>

      <h2 className="text-left text-2xl font-bold text-primary-color sm:mb-0 mb-4">
        Art Cell
      </h2>

      <div className="flex justify-center ">
        <div className="sm:-mt-8 sm:-mb-8">
          <SlideShow slides={slides} />
        </div>
      </div>

      {dataArray.map((data, index) => (
        <CellInfo
          key={index}
          objective={data.objective}
          footnote={data.footnote}
        />
      ))}
    </div>
  );
};

export default MyPage;
