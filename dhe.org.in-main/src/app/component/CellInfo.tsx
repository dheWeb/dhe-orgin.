// components/ITCellInfo.tsx

import React, { FC } from 'react';

interface ITCellInfoProps {
  title?: string;
  objective: string;
  footnote: string;
}

const CellInfo: FC<ITCellInfoProps> = ({ title, objective, footnote }) => {
  return (
   

    <div className="max-w-4xl mx-auto px-4 pb-2 bg-white rounded-md ">
      {/* Adding Tailwind CSS classes to style the div */}
      <h1 className="text-xl font-bold mb-4 text-primary-color">{title}</h1>

     
      <p className="mb-2 text-black justify-between">{objective}</p>

      <p className="italic text-black text-center">&ldquo;{footnote}&rdquo;</p>
    </div>
 
  );
};

export default CellInfo;
