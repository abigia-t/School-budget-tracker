import React from "react";
import { FaCarSide } from "react-icons/fa";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const NavBar = ({ setContactModalOpen }) => {
  return (
    <nav
      className="bg-blue-950 flex justify-between items-center text-white fixed left-0 top-0 right-0 py-1 px-6 shadow-md z-50"
    >
      <div className="flex  items-center gap-3 cursor-pointer">
        <Link to={"/"}>
          <img
            src={assets.edu_logo}
            alt="Yajeb Academy Logo"
            className="h-12 w-12 object-contain"
          />
          <p className="text-lg md:text-xl font-bold">Yajeb Academy</p>
        </Link>
      </div>

      <ul className="hidden md:flex gap-10 text-lg font-semibold">
        <Link to={"/"}>
          <li className="hover:text-gray-300 cursor-pointer">Home</li>
        </Link>
        <a href="#about">
          <li className="hover:text-gray-300 cursor-pointer">About</li>
        </a>
        <li
          onClick={() => setContactModalOpen(true)}
          className="hover:text-gray-300 cursor-pointer"
        >
          Contact
        </li>
        <a href="#features">
          <li className="hover:text-gray-300 cursor-pointer">Features</li>
        </a>
      </ul>
      <Link to="/login">
        <button className="flex items-center gap-2 bg-white text-blue-950 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition">
          <FaCarSide />
          Sign In
        </button>
      </Link>
    </nav>
  );
};

export default NavBar;
