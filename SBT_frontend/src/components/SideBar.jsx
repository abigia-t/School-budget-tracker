import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "./Modal"; // Import your reusable modal component
import DashboardIcon from "../assets/Dashboard.png"; // Import the dashboard icon
import RequestBudgetIcon from "../assets/request.png"; // Import the request budget icon
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
                `flex items-center gap-2 py-2 px-4 rounded-md my-1 transition ${
                  isActive ? "bg-blue-500" : "hover:bg-gray-700"
                }`
              }
            >
              {label === "Dashboard" && (
                <img src={DashboardIcon} alt="Dashboard Icon" className="w-6 h-6" />
              )}
              {label === "Request Budget" && (
                <img src={RequestBudgetIcon} alt="Request Budget Icon" className="w-6 h-6" />
              )}
              {label === "Prepare Payroll" && (
                <img src={PayrollIcon} alt="Payroll Icon" className="w-6 h-6" />
              )}
              {label === "Manage Actors" && (
                <img src={ManageAccountIcon} alt="Manage Account Icon" className="w-6 h-6" />
              )}
              {label === "View Report" && (
                <img src={ReportIcon} alt="Report Icon" className="w-6 h-6" />
              )}
              {label === "Human Resources Head" && (
                <img src={HrManagementIcon} alt="Hr Management Icon" className="w-6 h-6" />
              )}
              {label === "Resource and Finance Head" && (
                <img src={ResourceManagementIcon} alt="Resource Management Icon" className="w-6 h-6" />
              )}
              {label === "School Director" && (
                <img src={SchoolDirectorIcon} alt="School Director Icon" className="w-6 h-6" />
              )}
              {label === "Send Notifications" && (
                <img src={SendNotificationIcon} alt="Send Notification Icon" className="w-6 h-6" />
              )}
               {label === "Manage Students" && (
                <img src={ManageStudentsIcon} alt="Manage Students Icon" className="w-6 h-6" />
              )}
               {label === "Parent Receipt" && (
                <img src={ParentReceiptIcon} alt="Parent Receipt Icon" className="w-6 h-6" />
              )}
               {label === "Approve Budget" && (
                <img src={ApproveBudgetIcon} alt="Approve Budget Icon" className="w-6 h-6" />
              )}
              {label === "Approve Performance" && (
                <img src={ApprovePerformanceIcon} alt="Approve Performance Icon" className="w-6 h-6" />
              )}
              {label === "Payment" && (
                <img src={PaymentIcon} alt="Payment Icon" className="w-6 h-6" />
              )}
               {label === "Manage Chapa" && (
                <img src={ChapaIntegrationIcon} alt="Chapa Integration Icon" className="w-6 h-6" />
              )}
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
