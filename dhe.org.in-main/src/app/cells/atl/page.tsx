// Example usage in another component or page

import React from 'react';
import CellInfo from '@/app/component/CellInfo';

const MyPage = () => {
  const dataArray = [
    {
        title: " ATL Cell",
        objective:"The Atal Tinkering Lab (ATL) Cell aims to make optimal use of and operate the laboratories established in schools through the Atal Innovation Mission of the Government of India. It is committed to fostering innovation and scientific spirit among students.",
        footnote:" Fostering a culture of scientific exploration."
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
