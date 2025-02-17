import React from "react";
import AccountForm from "../components/AccountForm";
import Header from "../components/Header";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";
const AccountPage = () => {
  return (

    <div>
      <Header
        header={
          <nav className="bg-blue-950 text-white fixed left-0 top-0 right-0 py-4 px-6 shadow-md flex justify-between items-center z-50">
            <div
              onClick={() => {
                const element = document.getElementById("home");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src={assets.edu_logo}
                alt="Yajeb Academy Logo"
                className="h-12 w-12 object-contain"
              />
              <h1 className="text-lg md:text-xl font-bold">Yajeb Academy</h1>
            </div>
            <ul className="hidden md:flex gap-10 text-lg font-semibold">
              <li
                onClick={() => {
                  const element = document.getElementById("home");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="hover:text-gray-300 cursor-pointer"
              >
                Home
              </li>
              <li
                onClick={() => {
                  const element = document.getElementById("about");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="hover:text-gray-300 cursor-pointer"
              >
                About
              </li>
              <li
                onClick={() => setContactModalOpen(true)}
                className="hover:text-gray-300 cursor-pointer"
              >
                Contact
              </li>
              <li
                onClick={() => {
                  const element = document.getElementById("features");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="hover:text-gray-300 cursor-pointer"
              >
                Features
              </li>
            </ul>
            <Link to={"/login"}>
            <button className="flex items-center gap-2 bg-white text-blue-950 px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition">
              <FaCarSide />
              Sign In
            </button>
            </Link>
          </nav>
        }
      />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <AccountForm />
    </div>
    </div>
  );
};

export default AccountPage;
