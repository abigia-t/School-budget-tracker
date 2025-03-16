import React from "react";
import {Link} from 'react-router-dom'
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-2 px-6 flex flex-col md:flex-row justify-between items-center shadow-md">
      <Link to={"/"}>
      <div className="flex items-center gap-3 cursor-pointer">
                  <img
                    className="h-10 w-10 object-contain"
                    src={assets.edu_logo}
                    alt="Yajeb Academy Logo"
                  />
                  <h2 className="text-lg md:text-xl font-semibold">Yajeb Academy</h2>
                </div>
                </Link>
      
                <p className="text-sm text-gray-200 text-center md:text-left mt-2 md:mt-0">
            © {new Date().getFullYear()} Yajeb Academy. All Rights Reserved.
          </p>
    </footer>
  );
};

export default Footer;
