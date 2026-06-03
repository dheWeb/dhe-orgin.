// Example usage in another component or page

import React from 'react';
import CellInfo from '@/app/component/CellInfo';

const MyPage = () => {
  const dataArray = [
    {
        title: "CSR Cell",
        objective:"The CSR Cell plays a pivotal role in securing essential funding for educational initiatives. Its primary objective is to accomplish necessary projects for schools through CSR and develop new activities for school education.",
        footnote:" Integrating compassion and social awareness."
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
