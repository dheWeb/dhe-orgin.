// Example usage in another component or page

import React from 'react';
import CellInfo from '@/app/component/CellInfo';

const MyPage = () => {
  const dataArray = [
    {
        title: "Environment Cell",
        objective:"The Environment Cell stands as a bastion of environmental consciousness, committed to sensitizing, creating awareness, and educating students on the critical need for the preservation and conservation of our precious natural resources. At the heart of our mission is the cultivation of love and respect for nature among students. Through a myriad of activities, we aim to instill a deep understanding of the importance of protecting the environment.",
        footnote:" Nurturing environmental stewardship among students."
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
