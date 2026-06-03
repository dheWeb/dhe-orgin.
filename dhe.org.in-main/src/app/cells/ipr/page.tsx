// Example usage in another component or page

import React from 'react';
import CellInfo from '@/app/component/CellInfo';

const MyPage = () => {
  const dataArray = [
   
    {
        title: "IPR Cell",
        objective:"The IPR Cell is committed to establishing India as a leader in Intellectual Property Rights by fostering a culture of IPR in 15 lakh schools across the nation.",
        footnote:"Building a culture of respect for intellectual property."
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
