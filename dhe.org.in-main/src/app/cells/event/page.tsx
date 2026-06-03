// Example usage in another component or page

import React from 'react';
import CellInfo from '@/app/component/CellInfo';
import SlideShow from "@/app/component/SlideShow"; 

const MyPage = () => {
  const dataArray = [
   
    {
        title: "Event Management Cell",
        objective:"The Event Management Cell is dedicated to designing education-related events of national and international fame, aiming to establish Vidya Bharti's leadership in this dynamic field.",
        footnote:" Cultivating managerial skills and a sense of cultural pride along with opportunities to start starups."
    },
    
    // Add more data objects if needed
  ];

  const slides = [
    {
      src: "/cells/eventmanagementcell/k6.jpg", // Update with actual image paths
      alt: "",
    },
    {
      src: "/cells/eventmanagementcell/banwari_lal_purohit.JPG", // Update with actual image paths
      alt: "",
    },
    {
      src: "/cells/eventmanagementcell/bandaru_dattareya.jpg", 
      alt: "",
    },
    {
      src: "/cells/eventmanagementcell/anurag_singh_thakur.JPG",  
      alt: "",
    },
    {
      src: "/cells/eventmanagementcell/raghunandan.JPG",
      alt: "",
    },
    {
      src: "/cells/eventmanagementcell/shankarananda.JPG",
      alt: "",
    },
    {
      src: "/cells/eventmanagementcell/kashmiri_lal.JPG",
      alt: "",
    },
    {
      src: "/cells/eventmanagementcell/satish_kumar.JPG",
      alt: "",
    },
   
  ];

  return (
    <div className="bg-white sm:w-3/5 m-auto px-2">
      <p className="text-center text-2xl font-bold p-4 text-primary-color">
        Cells
      </p>

      <h2 className="text-left text-2xl font-bold text-primary-color sm:mb-0 mb-4">
      Event Management Cell
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
