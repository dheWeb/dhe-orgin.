// Example usage in another component or page

import React from 'react';
import CellInfo from '@/app/component/CellInfo';

const MyPage = () => {
  const dataArray = [
    {
        title: "R & D Cell",
        objective:"The Research and Development (R & D) Cell is dedicated to promoting research in school education. It focuses on exploring and developing products like Edtech, AR/VR, AI, LMS, TMS, Paper Recycling, Plastic Recycling, Cloth Recycling, Herbal Garden, FMCG, Technology, etc., within schools.",
        footnote:"Driving educational excellence through continuous innovation."
    }, 
    // Add more data objects if needed
  ];

  return (
    <div className='bg-white'>
      
      <p className='text-center text-2xl font-bold p-4 text-primary-color '> Cells</p>
      {dataArray.map((data, index) => (
        <CellInfo
          key={index}
          title={data.title}
          objective={data.objective}
          footnote={data.footnote}
        />
      ))}
   
    </div>
  );
};

export default MyPage;
