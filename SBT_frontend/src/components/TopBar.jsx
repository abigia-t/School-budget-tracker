import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const TopBar = () => {
  return (
    <header className="bg-blue-950 text-white fixed top-0 w-full h-16 flex items-center justify-around px-6 shadow-md">
      <div className="flex items-center gap-3 cursor-pointer">
        <Link to={"/"} className="flex items-center gap-2">
          <img
            src={assets.edu_logo}
            alt="Yajeb Academy Logo"
            className="h-12 w-12 object-contain"
          />
          <p className="text-lg md:text-xl font-bold">Yajeb Academy</p>
        </Link>
      </div>
       <h1 className="text-2xl font-bold">Budget Tracking System</h1>
    </header>
  );
};

export default TopBar;
