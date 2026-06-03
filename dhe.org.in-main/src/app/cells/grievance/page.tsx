// Example usage in another component or page

import React from 'react';
import CellInfo from '@/app/component/CellInfo';

const MyPage = () => {
  const dataArray = [
    {
        title: "Grievance Redressal Cell",
        objective:"Vidya Bharti is committed to ensuring a supportive environment for all. The Grievance Redressal Cell stands as a pillar to carry out research in the field of grievance redressal to smoothly address concerns and fostering a secure atmosphere for all stakeholders.",
        footnote:"Building trust through effective grievance resolution."
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
