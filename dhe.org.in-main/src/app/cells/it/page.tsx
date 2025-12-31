// Example usage in another component or page

import React from 'react';
import CellInfo from '@/app/component/CellInfo';

const MyPage = () => {
  const dataArray = [
    {
      title: "IT Cell",
      objective: "The IT Cell of the Department of Holistic Education strives to be a one-stop solution for all IT-related needs of Vidya Bharati and the Sangh Parivar.",
      footnote: "This initiative promotes digital literacy and connectivity."
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
