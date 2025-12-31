// Example usage in another component or page

import React from 'react';
import CellInfo from '@/app/component/CellInfo';

const MyPage = () => {
  const dataArray = [
    {
        title: "Olympiad Cell",
        objective:"The Olympiad cell aims to create a comprehensive test and platform at the national and international levels, strengthening Vidya Bharti's presence and establishing dominance in the education segment.",
        footnote:"Excelling beyond boundaries in the pursuit of knowledge"
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
