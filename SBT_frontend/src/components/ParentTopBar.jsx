import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiBell } from "react-icons/fi"; // Notification icon
import { IoMdArrowDropdown } from "react-icons/io";
import LogoIcon from "../assets/Logo.png"; // Adjust the path as necessary
import MaleAvatar from "../assets/boy avatar.png"; // Replace with actual paths
import FemaleAvatar from "../assets/female avatar.png"; // Replace with actual paths

const ParentTopBar = ({ user, onNotificationClick }) => {
  const avatar = user && user.gender === "female" ? FemaleAvatar : MaleAvatar;
  const [showInfo, setShowInfo] = useState(false);

  return (
    <header className="bg-blue-950 text-white h-20 flex items-center justify-between px-4 shadow-md w-full fixed top-0 left-0 z-50">
      {/* Left Section (Logo) */}
      <div className="flex items-center gap-3 cursor-pointer">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={LogoIcon} alt="Logo" className="h-20 w-auto object-contain" />
        </Link>
      </div>

      {/* Middle Section (School Name) */}
      <div className="flex-grow text-center">
        <h1 className="text-2xl font-bold group hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300">
          Yajeb Academy
        </h1>
      </div>

      {/* Right Section (Notifications and Profile) */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <div className="relative cursor-pointer group" onClick={onNotificationClick}>
          <FiBell size={24} className="transition duration-300 ease-in-out group-hover:text-yellow-300" />
          <div className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</div>
        </div>

        {/* Profile Avatar */}
        <div className="relative" onClick={() => setShowInfo(!showInfo)}>
          <img
            src={avatar}
            alt="User Avatar"
            className="h-10 w-10 rounded-full border-2 border-white object-cover transition-transform duration-300 hover:scale-105"
          />
          <IoMdArrowDropdown size={20} className="text-white ml-2 cursor-pointer transition-transform duration-300 hover:scale-105" />
          {showInfo && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 flex flex-col items-center border-b">
                <img src={avatar} alt="User" className="h-16 w-16 rounded-full border-2 border-blue-500 object-cover" />
                <p className="mt-2 font-semibold text-lg">{user?.name || "User"}</p>
                <p className="text-sm text-gray-500">{user?.role || "Role not set"}</p>
              </div>
              <div className="p-4 space-y-2">
                <p className="text-sm font-medium">Email: {user?.email || "Not provided"}</p>
                <p className="text-sm font-medium">Phone: {user?.phone || "Not provided"}</p>
              </div>
              <button className="w-full flex items-center justify-center py-3 bg-red-600 text-white hover:bg-red-700 transition font-semibold gap-2" onClick={() => console.log("Logout")}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ParentTopBar;