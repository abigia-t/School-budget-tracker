import React from "react";
const Footer = ({ logo, copyRight }) => {
  return (
    <footer className="bg-blue-950 text-white py-2 px-6 flex flex-col md:flex-row justify-between items-center shadow-md">
      {logo}
      {copyRight}
    </footer>
  );
};

export default Footer;
