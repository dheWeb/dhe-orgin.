"use client";
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const pathname = usePathname()
console.log(pathname);

  const shouldRenderModal = pathname=== '/';
  
  return (
    shouldRenderModal && isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-2 rounded shadow-lg w-2/3 h-300 lg:w-2/5 h-auto">
          <button
            className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
          
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
