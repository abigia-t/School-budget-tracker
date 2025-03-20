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
        </Link>
      </div>

      {/* Centered Title */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-3xl font-bold">Budget Tracking System</h1>
      </div>

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
      </div>
    </header>
  );
};

export default TopBar;