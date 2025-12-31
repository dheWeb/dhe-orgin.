// Example usage in another component or page

import React from 'react';
import CellInfo from '@/app/component/CellInfo';

const MyPage = () => {
  const dataArray = [
    {
        title: "Industry Co-ordination Cell",
        objective:"The Industry Coordination Cell envisions making school education skillful by forging partnerships with companies and startups across the country affiliated with Vidya Bharti.",
        footnote:" Nurturing global perspectives and cross-cultural understanding."
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
