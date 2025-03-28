import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "./Modal"; // Import your reusable modal component
import DashboardIcon from "../assets/icons8-dashboard-layout-24.png"; // Dashboard icon
import RequestBudgetIcon from "../assets/icons8-service-50.png"; // Request budget icon
import PayrollIcon from "../assets/payroll.png";
import ManageAccountIcon from "../assets/manage account.png";
import ReportIcon from "../assets/report.png";
import HrManagementIcon from "../assets/HRmngr.png";
import ResourceManagementIcon from "../assets/resourse mngt.png";
import SchoolDirectorIcon from "../assets/school director.png";
import SendNotificationIcon from "../assets/send notification.png";
import ManageStudentsIcon from "../assets/student mngt.png";
import ParentReceiptIcon from "../assets/receipt.png";
import ApproveBudgetIcon from "../assets/approve budget.png";
import ApprovePerformanceIcon from "../assets/Aperformance.png";
import PaymentIcon from "../assets/payment.png";
import ChapaIntegrationIcon from "../assets/chapa integration.png";
import LogoIcon from "../assets/Logo.png"; // Default icon
import MenuIcon from "../assets/icons8-menu-50.png";
import { LogOut } from "lucide-react";
import DefaultIcon from "../assets/chapa integration.png";  // or any other fallback icon you prefer


const iconMapping = {
  "Dashboard": DashboardIcon,
  "Request Budget": RequestBudgetIcon,
  "Prepare Payroll": PayrollIcon,
  "Manage Actors": ManageAccountIcon,
  "View Report": ReportIcon,
  "Human Resources Head": HrManagementIcon,
  "Resource and Finance Head": ResourceManagementIcon,
  "School Director": SchoolDirectorIcon,
  "Send Notifications": SendNotificationIcon,
  "Manage Students": ManageStudentsIcon,
  "Approved Revenue": ParentReceiptIcon,
  "Approved Expenditure": ApproveBudgetIcon,
  "Auditing": ApprovePerformanceIcon,
  "Payment": PaymentIcon,
  "Manage Chapa": ChapaIntegrationIcon,
};

const SideBar = ({ title, subtitle = "", navLinks }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Handle logout confirmation
  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div
      className={`fixed top-0 h-screen bg-blue-950 text-white flex flex-col justify-between shadow-lg transition-all duration-300 ${isSidebarOpen ? "left-0 w-64" : "-left-64 w-64"}`}
    >
      {/* Menu Toggle Section */}
      <div
        className="fixed top-4 left-4 z-50 cursor-pointer bg-blue-950 p-2 rounded-md shadow-lg mb-6"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <img src={MenuIcon} alt="Menu Icon" className="w-8 h-8" />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col p-6 mt-20">
        {navLinks.map(({ path, label }) => (
          <NavLink
            key={label}  // Use label here or another unique identifier
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-2 py-2 px-4 rounded-md transition mb-2 ${
                isActive ? "bg-gray-500" : "hover:bg-[rgb(0,157,255)]"
              }`
            }
          >
            {/* Always show the icon */}
            <img src={iconMapping[label] || DefaultIcon} alt={`${label} Icon`} className="w-6 h-6" />

            {/* Only hide text when collapsed */}
            <span className={`transition-all duration-300 ${isSidebarOpen ? "opacity-100 ml-2" : "opacity-0"}`}>
              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Log Out Button */}
      <div className="mt-auto p-4">
        <hr className="border-gray-600 mb-4" />
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex items-center gap-2 py-2 px-4 rounded-md transition mb-2 bg-red-600 hover:bg-red-700"
        >
          <LogOut className="w-6 h-6 text-white" />
          <span className={`transition-all duration-300 ${isSidebarOpen ? "opacity-100 ml-2" : "opacity-0"}`}>
            Logout
          </span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal isOpen={isLogoutModalOpen} title="Confirm Logout" onClose={() => setIsLogoutModalOpen(false)}>
        <p className="text-lg text-gray-700">Are you sure you want to log out?</p>
        {/* Modal Footer */}
        <div className="mt-6 flex justify-around">
          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(false)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
          >
            Yes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SideBar;