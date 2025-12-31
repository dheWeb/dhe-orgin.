"use client";
import Image from "next/image";
import React from "react";
import Link from 'next/link';

const DirectorMessage: React.FC = () => {
  return (
    <div className="bg-white p-4 items-center">
      <h2 className="text-2xl font-semibold mb-4 text-primary-color ">Director Message</h2>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/5"></div>
        <div className="w-full md:w-1/5">
          <Image
            src="/director.png"
            alt="Director's Image"
            className="w-80 h-80 md:w-80 md:h-80 lg:w-80 lg:h-80 rounded-lg shadow-lg border-2 border-red-600 mx-auto"
            width={800}
            height={800}
          />

          <p className="text-center font-semibold text-black p-2">
           <Link href="https://drthakurskr.com"  > <strong>Dr. Thakur SKR</strong></Link>
          </p>
        </div>
        <div className="w-full md:w-2/5 p-2">
          <p className="text-justify text-black">
            We believe that the best way to serve the nation is to empower the society by means of education. In this regard, the quality of education which is being imparted is pivotal. In today’s era, on one hand, with increasing number of educational institutes, the literacy rate has been increasing steadfastly. However, on the other hand, there is a huge increase in unemployment, a huge gap in the requirement of skilled manpower, physical and mental illnesses, disturbed families, violence and unrest, etc.
          </p>
          <br />
          <p className="text-justify text-black">
            The Department of Holistic Education at Vidya Bharti was conceptualized to effectively bridge this gap in society by overhauling the education system. We at DHE are committed to making the education system more comprehensive by focusing not only on skill development but also aiming at the holistic development of students ranging from physical fitness to emotional well-being. Our vision is to impart this holistic education to children right from their young age so that we can mold these green cakes into not only skilled adults but also responsible humans who are an asset to the nation.
          </p>
          <br />
          <p className="text-justify text-black">
            <br />
            I feel honored to be leading this Department and hope to revolutionize our system of education for the betterment of society.
          </p>
        </div>
        <div className="w-full md:w-1/5"></div>
      </div>
    </div>
  );
};

export default DirectorMessage;
