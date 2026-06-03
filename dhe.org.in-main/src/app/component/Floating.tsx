import React from 'react';
import { FloatButton } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Link from 'next/link';

const Floating: React.FC = () => {
  return (
    <Link href="https://wa.me/917627888222" target="_blank" rel="noopener noreferrer">
    
    <FloatButton
      icon={<FontAwesomeIcon icon={faWhatsapp} size="lg" className="text-white" />}
      type="primary"
      style={{ right: 24 }} // Change the background color here
    />
    </Link>
  );
}

export default Floating;
