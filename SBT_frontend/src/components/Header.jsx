import React from 'react';
import { assets } from '../assets/assets';
import { FaGraduationCap } from 'react-icons/fa'; // Example education icon

const Header = () => {
  return (
    <header className="bg-blue-800 w-full text-white fixed top-0 left-0 py-2 px-6 flex flex-col md:flex-row justify-between items-center shadow-md">
      {/* Logo & Academy Name */}
      <div className="flex items-center gap-3">
        <img className="h-12 w-12 object-contain" src={assets.edu_logo} alt="Yajeb Academy Logo" />
        <h2 className="text-2xl md:text-3xl font-semibold">Yajeb Academy</h2>
      </div>

      {/* System Title */}
      <h2 className="text-9xl md:text-3xl tracking-wide text-center">
        BUDGET TRACKING SYSTEM
      </h2>

      {/* Education-Related Icon (You can change or add more icons) */}
      <div className="text-white text-3xl md:text-4xl">
        <FaGraduationCap />
      </div>
    </header>
  );
};

export default Header;
