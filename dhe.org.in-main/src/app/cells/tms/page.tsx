// Example usage in another component or page

import React from 'react';
import CellInfo from '@/app/component/CellInfo';

const MyPage = () => {
  const dataArray = [
   {
        title: "TMS Cell",
        objective:"The TMS (Teaching and Non-Teaching Staff Management) Cell is dedicated to bringing excellent teaching and non-teaching staff into schools, ensuring quality education and administration.",
        footnote:" Prioritizing progressive learning for every student."
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
