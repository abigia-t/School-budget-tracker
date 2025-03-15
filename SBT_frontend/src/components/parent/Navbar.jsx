/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FiMenu } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

const NavBar = ({ onLogout }) => {
  const [isOpen, SetIsOpen] = useState(false);
  const toggleMenu = () => {
    SetIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-blue-950 flex justify-between items-center text-white fixed left-0 top-0 right-0 py-1 px-6 shadow-md z-50">
        <div className="flex  items-center gap-3 cursor-pointer">
          <Link to={""} className="flex items-center gap-1">
            <img
              src={assets.edu_logo}
              alt="Yajeb Academy Logo"
              className="h-12 w-12 object-contain"
            />
            <span className="text-lg md:text-3xl text-yellow-400 font-bold">
              Yajeb Academy
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-10 text-lg font-semibold">
          <Link to={"dashboard"}>
            <li className="hover:text-yellow-300 cursor-pointer">Dashboard</li>
          </Link>
          <Link to={"payment"}>
            <li className="hover:text-yellow-300 cursor-pointer">Payment</li>
          </Link>
          <Link to="pyament-history">
            <li className="hover:text-yellow-300 cursor-pointer">
              Payment History
            </li>
          </Link>
          <Link to="notfication">
            <li className="hover:text-yellow-300 cursor-pointer">
              Notification
            </li>
          </Link>
        </ul>

        {/* Log out button */}
        <div className="flex gap-8">
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-300 text-blue-950 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition"
          >
            {/* <span className="rotate-180">
            <FiLogOut />
          </span> */}
            Log Out
          </button>

          <Link
            to="profile"
            className="w-12 h-12 bg-gray-200  text-blue-500 hover:text-blue-600 flex items-center justify-center rounded-3xl"
          >
            <FaUser size={32} className=" cursor-pointer" />
          </Link>
        </div>
        {/* mobile menu togler */}
        <button
          className="flex md:hidden items-center gap-2 bg-blue-400 text-blue-950 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition "
          onClick={toggleMenu}
        >
          {isOpen ? <MdCancel /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <ul className="flex flex-col fixed top-10 w-full bg-blue-900/85   gap-4 text-lg font-semibold px-6 py-8">
          <Link to={"dashboard"}>
            <li onClick={toggleMenu} className="text-gray-300 cursor-pointer ">
              Dashboard
            </li>
          </Link>
          <Link to={"profile"}>
            <li onClick={toggleMenu} className="text-gray-300 cursor-pointer ">
              Profile
            </li>
          </Link>
          <Link to={"payment"}>
            <li onClick={toggleMenu} className="text-gray-300 cursor-pointer ">
              Payment
            </li>
          </Link>
          <Link to="pyament-history">
            <li onClick={toggleMenu} className="text-gray-300 cursor-pointer ">
              Payment History
            </li>
          </Link>
          <Link to="notfication">
            <li onClick={toggleMenu} className="text-gray-300 cursor-pointer ">
              Notfication
            </li>
          </Link>
        </ul>
      )}
    </>
  );
};

export default NavBar;
