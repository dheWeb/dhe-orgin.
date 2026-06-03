

import React from 'react';
import MemberShipForm from './MemberShipForm';

const MembershipBenefits = () => {
  return (
    <div className='bg-white'>
    <div className="max-w-5xl mx-auto pt-4 bg-white text-primary-color">
      <h2 className="text-2xl font-bold mb-4">Benefits of Membership</h2>
      <ul className="list-disc pl-2 mb-6 text-justify">
        <li>Free Access to National Conferences: As a valued member, enjoy complimentary entry to our national and international conferences and events, fostering a platform for knowledge exchange.</li>
        <li>Editorial Board Opportunity: Stand a chance to become part of the editorial board for <b>Viksit India</b> and other Journals contributing to impactful educational content.</li>
        <li>Contribution to Education: Unlock opportunities to contribute significantly to the field of education. Your ideas and efforts can make a meaningful impact on the holistic development of learners.</li>
        <li>Exclusive Workshops and Seminars: Gain access to exclusive workshops and seminars, empowering you with insights and skills to thrive in the education sector.</li>
        <li>Networking Opportunities: Connect with a diverse community of educators, professionals, and students, creating a network that fosters collaboration and growth.</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Membership Fee</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Life Member: ₹ 5000</li>
        <li>Annual Member: ₹ 2000</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">Membership Fee for Students</h2>
      <ul className="list-disc pl-6">
        <li>Life Member: ₹ 2500</li>
        <li>Annual Member: ₹ 1000</li>
      </ul>
    </div>
    </div>
  );
};

export default MembershipBenefits;
