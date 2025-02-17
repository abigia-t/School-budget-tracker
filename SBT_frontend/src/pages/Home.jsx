import React, { useState } from "react";
import { assets, features } from "../assets/assets";
import { FaCarSide } from "react-icons/fa";
import Title from "../components/Title";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';

const Home = () => {
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message submitted successfully!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
    setTimeout(() => setContactModalOpen(false), 3000); // Close modal after the toast duration
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Navigation Bar */}
      <ToastContainer />
      <Header
        header={
          <nav className="bg-blue-950 text-white fixed left-0 top-0 right-0 py-4 px-6 shadow-md flex justify-between items-center z-50">
           <Link to={"/"}>
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
            </div></Link>
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

      {/* Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        title="Contact Us"
        onClose={() => setContactModalOpen(false)}
      >
        {/* Modal Content */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-1xl font-medium">Your Name</label>
            <input
              type="text"
              className="w-full text-black border rounded-lg px-3 py-2"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block  text-1xl font-medium">
              Your Email
            </label>
            <input
              type="email"
              className="w-full text-black border rounded-lg px-3 py-2"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-1xl font-medium">
              Message
            </label>
            <textarea
              className="w-full text-black border rounded-lg px-3 py-2"
              rows="7"
              placeholder="Your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-950 text-white text-[20px] px-4 py-2 rounded-lg hover:bg-blue-900"
          >
            Submit
          </button>
        </form>
      </Modal>

      {/* Header Section */}
      <div id="home" className="bg-blue-950 text-white py-12 px-8 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Section */}
          <div className="fade-in text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold">
              Welcome to Yajeb Academy Budget Tracker
            </h1>
            <p className="text-lg md:text-xl mt-4 text-gray-300">
              Efficiently manage and monitor your school's budgets and resources
              with ease.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex justify-center">
            <img
              src={assets.getty_5}
              alt="Students engaged in learning"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        id="features"
        className="flex-grow bg-gray-100 py-12 px-6 scroll-mt-20"
      >
        <Title title="Our Features" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature Cards */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md text-center"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="h-20 mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-white py-12 px-6 scroll-mt-20">
        <Title title="About Yajeb Academy" />
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-8">
            Yajeb Academy is dedicated to providing quality education and
            ensuring efficient management of resources through innovative
            solutions like the Budget Tracker. Located in Addis Ababa, we aim to
            simplify budget management for schools and foster transparency in
            financial operations.
          </p>
          <p className="text-gray-700 font-medium">Contact us:</p>
          <ul className="text-gray-700 mt-4">
            <li>
              <strong>Location:</strong> Bole Sub-City, Yajeb Street, Addis
              Ababa
            </li>
            <li>
              <strong>Email:</strong> info@yajebacademy.com
            </li>
            <li>
              <strong>Phone:</strong> +251-123-456-789
            </li>
            <li>
              <strong>Telegram:</strong> @yajebacademy
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
