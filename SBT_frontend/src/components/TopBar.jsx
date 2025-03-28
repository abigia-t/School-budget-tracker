<<<<<<< HEAD
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import LogoIcon from "../assets/Logo.png";
import MaleAvatar from "../assets/boy avatar.png";
import FemaleAvatar from "../assets/female avatar.png";

const TopBar = ({ user }) => {
  const avatar = user && user.gender === "female" ? FemaleAvatar : MaleAvatar;
  const [showInfo, setShowInfo] = useState(false);

  return (
    <header className="bg-blue-950 text-white h-20 flex items-center justify-between px-4 shadow-md w-full relative">
      {/* Left Section (Logo) */}
      <div className="flex items-center gap-3 cursor-pointer">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={LogoIcon} alt="Yajeb Academy Logo" className="h-14 w-auto object-contain" />
=======
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
>>>>>>> 69d30179b39cca79304f10922ab012fe0af19153
        </Link>
      </div>

      {/* Centered Title */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-3xl font-bold">Budget Tracking System</h1>
      </div>

<<<<<<< HEAD
      {/* Right Section (Profile Avatar) */}
      <div className="relative69 l-10">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setShowInfo(!showInfo)}>
          <img
            src={avatar}
            alt="User Avatar"
            className="h-10 w-10 rounded-full border-2 border-white object-cover"
          />
          <IoMdArrowDropdown size={20} className="text-white" />
        </div>

        {/* User Info Dropdown */}
        {showInfo && (
          <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden animate-fadeIn">
            <div className="p-4 flex flex-col items-center border-b">
              <img src={avatar} alt="User" className="h-16 w-16 rounded-full border-2 border-blue-500 object-cover" />
              <p className="mt-2 font-semibold text-lg">{user?.name || "User"}</p>
              <p className="text-sm text-gray-500">{user?.role || "Role not set"}</p>
            </div>
            <div className="p-4 space-y-2">
              <p className="text-sm font-medium">Email: {user?.email || "Not provided"}</p>
              <p className="text-sm font-medium">Phone: {user?.phone || "Not provided"}</p>
            </div>
            {/* Logout Button */}
            <button className="w-full flex items-center justify-center py-3 bg-red-600 text-white hover:bg-red-700 transition font-semibold gap-2" onClick={() => console.log("Logout")}> 
              <FiLogOut size={20} /> Logout
            </button>
          </div>
        )}
=======
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
>>>>>>> 69d30179b39cca79304f10922ab012fe0af19153
      </div>
    </header>
  );
};

export default TopBar;