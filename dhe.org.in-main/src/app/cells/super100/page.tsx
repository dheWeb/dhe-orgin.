// Example usage in another component or page

import React from 'react';
import CellInfo from '@/app/component/CellInfo';

const MyPage = () => {
  const dataArray = [
    
    {
        title: " Super 100",
        objective:"Super 100 is driven by the primary objective of establishing Vidya Bharti's dominance in the education sector, providing a platform for the free preparation of competitive exams across the country. Additionally, it aims to position India as a global leader in education through Vidya Bharti, offering culture-based education to the world using science and technology in this era of globalization.",
        footnote:"Bridging local talent to national aspirations"
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
