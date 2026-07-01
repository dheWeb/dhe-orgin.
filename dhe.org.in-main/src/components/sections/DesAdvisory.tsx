import React from "react";

interface AdvisoryMember2 {
  name: string;
  des2: string;
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
      <div className="overflow-x-auto w-full max-w-5xl">
        <table className="w-full table-auto py-2">
          <caption className="sr-only">
            {title} — names, positions, designations, and contact numbers
          </caption>
          <thead>
            <tr className="bg-primary-color">
              <th scope="col" className="px-1 py-2 border text-left text-white">Name</th>
              <th scope="col" className="px-1 py-2 border text-left text-white">Position</th>
              <th scope="col" className="px-1 py-2 border text-left text-white">Designation</th>
              <th scope="col" className="px-1 py-2 border text-left text-white">Contact</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={`${member.name}-${member.contact}`}>
                <td className="px-1 py-2 border text-left text-black">{member.name}</td>
                <td className="px-1 py-2 border text-left text-black">{member.des2}</td>
                <td className="px-1 py-2 border text-left text-black">{member.designation}</td>
                <td className="px-1 py-2 border text-left text-black">{member.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvisoryCouncil2;
