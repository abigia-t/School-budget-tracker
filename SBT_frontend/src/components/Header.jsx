import React from "react";

const Header = ({ header }) => {
  return (
    <nav className="bg-blue-800 w-full text-white fixed top-0 left-0 py-2 px-6 flex flex-col md:flex-row justify-between items-center shadow-md">
      {header}
    </nav>
  );
};

export default Header;
