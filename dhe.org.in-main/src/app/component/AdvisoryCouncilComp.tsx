import React from "react";

interface AdvisoryMember {
  name: string;
  designation: string;
  contact: string;
}

interface AdvisoryCouncilProps {
  title: string;
  members: AdvisoryMember[];
}

const AdvisoryCouncil: React.FC<AdvisoryCouncilProps> = ({ title, members }) => {
  return (
    <div className="flex flex-col items-center bg-white p-4">
      <h2 className="text-2xl font-semibold mb-4 mt-4 text-primary-color">{title}</h2>
      <table className="table-fixed max-width my-5">
        <thead>
          <tr className="bg-primary-color">
            <th className="w-1/3 p-2 border text-left text-white">Name</th>
            <th className="w-1/3 p-2 border text-left text-white">Designation</th>
            <th className="w-1/3 p-2 border text-left text-white">Contact</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td className="p-2 border text-left text-black">{member.name}</td>
              <td className="p-2 border text-left text-black">{member.designation}</td>
              <td className="p-2 border text-left text-black">{member.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvisoryCouncil;
