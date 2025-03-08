import React from "react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <header className="bg-blue-950 text-white h-20 flex items-center justify-between px-4 shadow-md w-full relative">
      {/* Left Section (Logo) */}
      <div className="flex items-center gap-3 cursor-pointer">
        <Link to={"/"} className="flex items-center gap-2">
          {/* <img
            src={assets.Logo}
            alt="Yajeb Academy Logo"
            className="h-14 w-14 object-contain"
          /> */}
        </Link>
      </div>

      {/* Centered Title */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-3xl font-bold">Budget Tracking System</h1>
      </div>
    </header>
  );
};

export default TopBar;
