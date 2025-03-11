import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import { Menu } from "lucide-react"; // Sidebar toggle icon

// Auditor-specific navigation links
const auditorLinks = [
  { path: "/auditor/dashboard", label: "Dashboard" },
  { path: "/auditor/ab", label: "Approved Expenditure" },
  { path: "/auditor/pr", label: "Approved Revenue" },
  { path: "/auditor/abp", label: "Auditing" },
];

const Auditor = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen transition-all duration-300">
      {/* Sidebar (Collapsible) */}
      <div className={`fixed top-0 h-screen bg-blue-950 text-white shadow-lg transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"}`}>
        {/* Sidebar Content (Hidden when collapsed) */}
        <div className={`${isSidebarOpen ? "block" : "hidden"} transition-opacity duration-300`}>
          <SideBar title="Auditor" navLinks={auditorLinks} />
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

export default Auditor;
