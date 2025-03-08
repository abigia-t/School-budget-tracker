/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "./Modal"; // Import your reusable modal component

const SideBar = ({ title, navLinks }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  // Handle logout confirmation
  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="fixed left-0 top-16 w-45 h-[calc(100vh-4rem)] bg-blue-900 text-white flex flex-col justify-between overflow-y-auto shadow-lg">
      <div>
        {/* Sidebar Title */}
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          {title}
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-4">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `py-2 px-4 rounded-md my-1 transition ${
                  isActive ? "bg-blue-500" : "hover:bg-gray-700"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Log Out Button (Separated Below) */}
      <div className="mt-auto p-4">
        <hr className="border-gray-600 mb-4" />
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="block w-full py-2 px-4 rounded-md text-center bg-red-600 hover:bg-red-700 transition font-semibold"
        >
          Log Out
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={isLogoutModalOpen}
        title="Confirm Logout"
        onClose={() => setIsLogoutModalOpen(false)}
        onSubmit={handleLogout}
        submitButtonText="Yes"  /* Change button text to 'Yes' */
      >
        <p className="text-lg text-gray-700">Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};

export default SideBar;
