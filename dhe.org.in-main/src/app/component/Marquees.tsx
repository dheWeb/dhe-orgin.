import React from 'react';
import Marquee from 'react-fast-marquee';

const Marquees: React.FC = () => {

  interface Item {
    imageUrl: string;
    text: string;
    link: string;
  }

  const marquees: Item[] = [
    { imageUrl: '/new.gif', text: "3rd Edition of RASE Conferences concluded successfully at NIT Srinagar on June 29-30, 2024", link: '' },
    { imageUrl: '/new.gif', text: "Next RASE Conferences of J&K will be held in IIT Jammu. Stay tuned for more updates.", link: '' },
    { imageUrl: '/new.gif', text: " शिक्षा महाकुंभ 2.0 was successfully concluded at Kurukshetra University from December 16-17, 2024.To download photographs click here", link: '' },
    { imageUrl: '/new.gif', text: "", link: '' },
  ];

  return (
    <div className='flex flex-row bg-primary-light w-full'>
      <div className='text-white justify-center items-center bg-primary-color rounded-sm text-center pe-2 text-xl py-1'>
        Announcement
      </div>
      <Marquee pauseOnHover={true} pauseOnClick={true}>
        {marquees.map((marqueeContent, index) => (
          <div key={index} className='flex items-center pe-12'>
            <img src={marqueeContent.imageUrl} alt='Announcement Icon' className='h-10 w-12 me-2' />
            <p className='text-white'>{marqueeContent.text}</p>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Marquees;
