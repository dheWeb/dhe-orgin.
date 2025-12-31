import React from "react";
import Link from "next/link";

const ResidentialCamps: React.FC = () => {
  const events = [
    {
      title: "DHE प्रथम  आवासीय आवास वर्ग",
      date: "September 07-08, 2024",
      venue: "IIT Ropar",
      link: "/residentialcamps/DHE_प्रथम _आवासीय_आवास_वर्ग.pdf",
    }, {
      title: "DHE द्वितीय आवासीय आवास वर्ग",
      date: "November 23-24, 2024",
      venue: "Gita Niketan, Kurukshetra",
      link: "/residentialcamps/second.jpg",
    },
    
  ];

  return (
    <div className="p-2 mt-4 h-auto min-h-[70vh]">
      <h2 className="text-2xl text-center font-bold mb-4 text-primary-color">
        Residential Camps
      </h2>
      <div className="overflow-x-auto mb-6 ">
        <table className="w-auto table-auto ml-auto mr-auto py-2">
          <thead>
            <tr className="bg-primary-color">
              <th className="w-1/2 sm:w-1/5 px-1 py-2 border text-left text-white">
                Title
              </th>
              <th className="w-1/2 sm:w-1/5 px-1 py-2 border text-left text-white">
                Date
              </th>
              <th className="w-1/2 sm:w-1/5 px-1 py-2 border text-left text-white">
                Venue
              </th>
              <th className="w-1/2 sm:w-1/5 px-1 py-2 border text-left text-white">
                More Information
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
                  {event.title}
                </td>
                <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
                  {event.date}
                </td>
                <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
                  {event.venue}
                </td>
                <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
                  <Link
                    href={event.link}
                    className="text-primary font-bold hover:text-blue-950"
                  >
                    Click here
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResidentialCamps;
