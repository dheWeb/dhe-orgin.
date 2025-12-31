import React from "react";
import Link from "next/link";



const UpcomingEvent: React.FC = () => {
  return (
    <div className="p-2 mt-4 h-auto min-h-[70vh]">
    <h2 className="text-2xl text-center font-bold mb-4 text-primary-color">Our Upcoming Events</h2>
    <div className="overflow-x-auto mb-6 m">
      <table className="w-auto table-auto py-2">
        <thead>
          <tr className="bg-primary-color ">
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

          <tr>
            <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
            Indian Education System for Global Developement
            </td>
            <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
            December 16&#45;17, 2024
            </td>
            <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
            Kurukshetra University
            </td>
            <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
              <Link href="https://www.shikshamahakumbh.com/" className="text-primary font-bold hover:text-blue-950">Click here</Link> 
            </td>
          </tr>
          <tr>
            <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
            Shiksha Kumbh 2025
            </td>
            <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
            To be announced soon
            </td>
            <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
            Indian Institute of Technology Jammu
            </td>
            <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
              <Link href="/sk25.rase.co.in" className="text-primary font-bold hover:text-blue-950">Click here</Link> 
            </td>
          </tr>
          <tr>
            <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
            Shiksha Mahakumbh 2025
            </td>
            <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
            To be announced soon
            </td>
            <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
            Jawaharlal Nehru University
            </td>
            <td className="w-full sm:w-1/5 px-1 py-2 border text-left text-black">
              <Link href="/" className="text-primary font-bold hover:text-blue-950">Click here</Link> 
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default UpcomingEvent;
