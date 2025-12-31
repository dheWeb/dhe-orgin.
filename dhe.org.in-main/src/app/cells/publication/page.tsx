// Example usage in another component or page

import React from 'react';
import CellInfo from '@/app/component/CellInfo';

const MyPage = () => {
  const dataArray = [
     {
        title: "Publications and Promotions Cell",
        objective:"Inclusive education, the cornerstone of our vision, transcends traditional boundaries. It embodies the essence of equality and empowerment, ensuring a collective learning experience for all. ",
        footnote:"Showcasing and celebrating academic achievements."
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
