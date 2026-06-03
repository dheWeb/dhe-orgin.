"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {

  const pathname = usePathname();

  // Only show on homepage
  const shouldRenderModal = pathname === "/";

  if (!shouldRenderModal || !isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-md
        px-4
        py-6
        animate-fadeIn
      "
    >

      {/* MODAL BOX */}
      <div
        className="
          relative
          w-full
          max-w-3xl
          overflow-hidden
          rounded-[35px]
          border
          border-white/10
          bg-gradient-to-br
          from-[#07111f]
          via-[#0f172a]
          to-[#111827]
          shadow-[0_20px_80px_rgba(0,0,0,0.45)]
          animate-scaleIn
        "
      >

        {/* Background Glow */}
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-orange-500 opacity-20 blur-3xl rounded-full"></div>

        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="
            absolute
            top-5
            right-5
            z-20
            flex
            items-center
            justify-center
            h-11
            w-11
            rounded-full
            bg-white/10
            text-white
            text-xl
            font-bold
            backdrop-blur-md
            border
            border-white/10
            hover:bg-orange-500
            hover:scale-110
            transition-all
            duration-300
          "
        >
          ✕
        </button>

        {/* CONTENT */}
        <div className="relative z-10 p-6 md:p-10">

          {/* TOP LABEL */}
          <div
            className="
              inline-flex
              items-center
              px-5
              py-2
              rounded-full
              bg-orange-500/20
              border
              border-orange-400/20
              text-orange-300
              text-sm
              md:text-base
              font-semibold
              mb-6
            "
          >
            National Educational Transformation Movement
          </div>

          {/* TITLE */}
          <h2
            className="
              text-3xl
              md:text-5xl
              font-extrabold
              text-white
              leading-tight
            "
          >
            Department of
            <span className="block text-orange-400 mt-2">
              Holistic Education
            </span>
          </h2>

          {/* SUBTITLE */}
          <p
            className="
              text-gray-300
              text-base
              md:text-xl
              leading-8
              mt-6
              max-w-3xl
            "
          >
            Empowering Bharat through holistic education,
            innovation, research, leadership, entrepreneurship,
            and Bharatiya values aligned with NEP 2020.
          </p>

          {/* CHILDREN */}
          <div className="mt-8">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
};

export default Modal;
