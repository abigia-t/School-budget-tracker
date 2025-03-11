import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import { Menu } from "lucide-react"; // Sidebar toggle icon

// System Admin-specific navigation links
const adminLinks = [
  { path: "/sa/dashboard", label: "Dashboard" },
  { path: "/sa/actors", label: "Manage Actors" },
  { path: "/sa/students", label: "Manage Students" },
  { path: "/sa/notifications", label: "Send Notifications" },
  { path: "/sa/chapa", label: "Manage Chapa Integration" },
];

const SA = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state

  return (
    <div className="flex min-h-screen transition-all duration-300">
      {/* Sidebar (Collapsible) */}
      <div className={`fixed top-0 h-screen bg-blue-950 text-white shadow-lg transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"}`}>
        {/* Sidebar Content (Hidden when collapsed) */}
        <div className={`${isSidebarOpen ? "block" : "hidden"} transition-opacity duration-300`}>
          <SideBar title="System Admin" navLinks={adminLinks} />
        </div>

        {/* Sidebar Toggle Button */}
        <div className="absolute top-4 left-4 cursor-pointer p-2 bg-gray-800 rounded-md" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu size={24} color="white" />
        </div>
      </div>

      {/* Main Content (Adjusts when Sidebar is toggled) */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
        {/* TopBar (Always visible at the top) */}
        <div className="fixed w-full z-50 bg-white shadow-md">
          <TopBar />
        </div>

        {/* Main Page Content */}
        <main className="bg-gray-200 min-h-screen pt-16 pl-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SA;
