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
    <div className="flex flex-col items-center bg-white p-4 w-full max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 mt-2 text-primary-color">
        {title}
      </h2>
      <div className="w-full overflow-x-auto">
        <table className="table-fixed w-full min-w-[280px] my-5">
          <caption className="sr-only">
            {title} — names, designations, and contact numbers
          </caption>
          <thead>
            <tr className="bg-primary-color">
              <th scope="col" className="w-1/3 p-2 border text-left text-white">
                Name
              </th>
              <th scope="col" className="w-1/3 p-2 border text-left text-white">
                Designation
              </th>
              <th scope="col" className="w-1/3 p-2 border text-left text-white">
                Contact
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={`${member.name}-${member.contact}`}>
                <td className="p-2 border text-left text-black">{member.name}</td>
                <td className="p-2 border text-left text-black">
                  {member.designation}
                </td>
                <td className="p-2 border text-left text-black">
                  <a
                    href={`tel:${member.contact.replace(/\s/g, "")}`}
                    className="text-orange-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
                  >
                    {member.contact}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvisoryCouncil;
