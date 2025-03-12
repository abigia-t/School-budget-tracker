import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";
import { Menu } from "lucide-react"; // Using Lucide for a clean menu icon

const SMHeadLinks = [
  { path: "/school-director-page/school-director-dashboard", label: "Dashboard" },
  { path: "/school-director-page/school-director-request", label: "Request Budget" },
];


const SchoolDirectorPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen transition-all duration-300">
      {/* Sidebar (Hidden Content but Menu Icon Always Visible) */}
      <div className={`fixed top-0 h-screen bg-blue-950 text-white shadow-lg transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"}`}>
        {/* Sidebar Content (Hidden when Sidebar is Collapsed) */}
        <div className={`${isSidebarOpen ? "block" : "hidden"} transition-opacity duration-300`}>
          <SideBar title="School Director" subtitle="Budget Tracking" navLinks={SMHeadLinks} />
        </div>

        {/* Always Visible Menu Icon */}
        <div className="absolute top-4 left-4 cursor-pointer p-2 bg-gray-800 rounded-md" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu size={24} color="white" />
        </div>
      </div>

      {/* Main Content (Expands When Sidebar is Hidden) */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
        {/* TopBar (Always Fully Displayed) */}
        <div className="fixed w-full z-50 bg-white shadow-md">
          <TopBar />
        </div>

        {/* Main Content */}
        <main className="bg-gray-200 min-h-screen pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SchoolDirectorPage;