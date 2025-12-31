// Example usage in another component or page

import React from 'react';
import CellInfo from '@/app/component/CellInfo';

const MyPage = () => {
  const dataArray = [
    {
        title: "LMS Cell",
        objective:"The Learning Management System Cell envisions making LMS an integral part of school education, providing financially viable services to thousands of schools in Vidya Bharti. The goal is to develop services in segments like gamification, AI, ML, AR/VR, etc., making them accessible to the entire Vidya Bharti at an affordable rate.",
        footnote:" Enhancing accessibility and flexibility in education"
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
