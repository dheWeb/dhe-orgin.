// Example usage in another component or page

import React from "react";
import CellInfo from "@/app/component/CellInfo";

const MyPage = () => {
  const dataArray = [
    {
      title: "HEI Coordination Cell",
      objective:
        "The HEI Coordination Cell is dedicated to enhancing mutual coordination between higher education institutions and schools, working towards the complementary development of both.",
      footnote: "Facilitating a smooth educational journey beyond schools.",
    },
    // Add more data objects if needed
  ];

  return (
    <div className="bg-white">
      <p className="text-center text-2xl font-bold p-4 text-primary-color ">
        {" "}
        Cells
      </p>
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
