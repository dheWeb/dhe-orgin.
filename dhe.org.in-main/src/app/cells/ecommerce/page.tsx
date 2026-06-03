// Example usage in another component or page

import React from 'react';
import CellInfo from '@/app/component/CellInfo';

const MyPage = () => {
  const dataArray = [
   {
        title: "E-Commerce Cell",
        objective:"The E-Commerce Sale cell aims to make the products and services generated from skill, startup, and entrepreneurship projects within schools accessible to the public. Additionally, the goal is to transform all schools in the country into laboratories and entrepreneurship centers.",
        footnote:"Empowering students with entrepreneurial skills."
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
