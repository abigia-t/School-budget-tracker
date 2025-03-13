import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi"; // Import notification icon
import LogoIcon from "../assets/Logo.png"; // Adjust the path if necessary

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-950 text-white h-20 flex items-center justify-between px-6 shadow-md w-full relative">
      {/* Left Section (Logo) */}
      <div className="flex items-center gap-3 cursor-pointer">
        <Link to={"/"} className="flex items-center gap-2">
          <img
            src={LogoIcon}
            alt="Yajeb Academy Logo"
            className="h-16 w-16 object-contain"
          />
        </Link>
      </div>

      {/* Centered Title */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-3xl font-bold">Budget Tracking System</h1>
      </div>

      {/* Right Section (Notification Icon) */}
      <div className="absolute right-6 top-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="relative p-2 bg-transparent rounded-full hover:bg-blue-800 transition"
        >
          <FiBell className="text-white text-3xl" /> {/* Increased size */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            2
          </span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
