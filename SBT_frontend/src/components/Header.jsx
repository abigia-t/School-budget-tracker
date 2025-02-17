import React from "react";

const Header = ({ header }) => {
  return (
    <nav className="bg-blue-950 text-white fixed left-0 top-0 right-0 py-10 px-6 shadow-md flex justify-between items-center z-50">
      {header}
    </nav>
  );
};

export default Header;
