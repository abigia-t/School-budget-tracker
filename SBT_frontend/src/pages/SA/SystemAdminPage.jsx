import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import { Menu } from "lucide-react";

const adminLinks = [
  { path: "/system-admin-page/system-admin-dashboard", label: "Dashboard" },
  { path: "/system-admin-page/manage-actors", label: "Manage Staff" },
  { path: "/system-admin-page/manage-students", label: "Manage Students" },
  { path: "/system-admin-page/manage-chapa", label: "Manage Chapa Integration" },
];

const SystemAdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen transition-all duration-300">
      {/* Sidebar */}
      <div className={`fixed top-0 h-screen bg-blue-950 text-white shadow-lg transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"}`}>
        {/* Sidebar Content */}
        <div className={`${isSidebarOpen ? "block" : "hidden"} transition-opacity duration-300`}>
          <SideBar title="System Admin" navLinks={adminLinks} />
        </div>

        {/* Sidebar Toggle Button */}
        <div className="absolute top-4 left-4 cursor-pointer p-2 bg-gray-800 rounded-md" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu size={24} color="white" />
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
        {/* TopBar */}
        <div className="fixed w-full z-50 bg-white shadow-md">
          <TopBar />
        </div>

        {/* Main Page Content (Outlet must be inside here) */}
        <main className="bg-gray-200 min-h-screen pt-16 pl-5">
          <Outlet /> {/* This will render child routes */}
        </main>
      </div>
    </div>
  );
};

export default SystemAdminPage;
