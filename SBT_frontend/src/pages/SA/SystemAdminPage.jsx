import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";

const adminLinks = [
  { path: "/system-admin-page/system-admin-dashboard", label: "Dashboard" },
  { path: "/system-admin-page/manage-actors", label: "Manage Actors" },
  { path: "/system-admin-page/manage-students", label: "Manage Students" },
  { path: "/system-admin-page/manage-chapa", label: "Manage Chapa Integration" },
];

const SystemAdminPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        System Admin Panel
      </h1>

      {/* Layout with Sidebar and Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <SideBar title="System Admin" navLinks={adminLinks} />
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <TopBar />
          <main className="mt-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default SystemAdminPage;
