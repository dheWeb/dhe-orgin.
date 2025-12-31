import React from "react";

interface AdvisoryMember2 {
  name: string;
  des2:string;
  designation: string;
  contact: string;
}

interface AdvisoryCouncilProps2 {
  title: string;
  members: AdvisoryMember2[];
}

const AdvisoryCouncil2: React.FC<AdvisoryCouncilProps2> = ({ title, members }) => {
  return (
    <div className="flex flex-col items-center bg-white p-5">
    <h2 className="text-2xl font-semibold mb-4 mt-4 text-primary-color">{title}</h2>
    <div className="overflow-x-auto">
      <table className="w-11/12 table-auto py-2">
        <thead>
          <tr className="bg-primary-color">
            <th className="w-1/2 sm:w-1/5 px-1 py-2 border text-left text-white">Name</th>
            <th className="w-1/2 sm:w-1/5 px-1 py-2 border text-left text-white">Position</th>
            <th className="w-1/2 sm:w-1/5 px-1 py-2 border text-left text-white">Designation</th>
            <th className="w-1/2 sm:w-1/5 px-1 py-2 border text-left text-white">Contact</th>
          </tr>
        </thead>
        <tbody>
          {members.map((_member, index) => (
            <tr key={index}>
              <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">{_member.name}</td>
              <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">{_member.des2}</td>
              <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">{_member.designation}</td>
              <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">{_member.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default AdvisoryCouncil2;
