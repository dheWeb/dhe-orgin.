// Example usage in another component or page

import React from 'react';
import CellInfo from '@/app/component/CellInfo';

const MyPage = () => {
  const dataArray = [
   {
        title: "Spiritual Cell",
        objective:"The Spiritual Cell integrates profound spiritual education into the curriculum, fostering holistic growth and character development among students.",
        footnote:"Nurturing souls for a balanced and purposeful life."
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
