import React, { FC } from "react";

interface ITCellInfoProps {
  title?: string;
  objective: string;
  footnote: string;
  /** When page H1 already shows the primary title, omit duplicate heading */
  hideTitle?: boolean;
}

const CellInfo: FC<ITCellInfoProps> = ({
  title,
  objective,
  footnote,
  hideTitle = false,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-2 bg-white rounded-md">
      {title && !hideTitle ? (
        <h2 className="text-xl font-bold mb-4 text-primary-color">{title}</h2>
      ) : null}

      <p className="mb-2 text-black justify-between">{objective}</p>

      <p className="italic text-black text-center">&ldquo;{footnote}&rdquo;</p>
    </div>
  );
};

export default CellInfo;
