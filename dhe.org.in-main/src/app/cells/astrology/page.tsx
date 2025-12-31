// Example usage in another component or page

import CellInfo from '@/app/component/CellInfo';
import React from 'react';


const MyPage = () => {
  const dataArray = [
   {
        title: " Astrology Cell",
        objective:" Vidya Bharti embraces a unique approach to holistic growth with the Astrology Cell, unlocking cosmic insights to guide students on a journey of self-discovery.",
        footnote:"Nurturing minds through the cosmic lens."
    },
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
