import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";

// Define System Admin-specific navigation links
const adminLinks = [
  { path: "/system-admin-page/system-admin-dashboard", label: "Dashboard" },
  { path: "/system-admin-page/manage-actors", label: "Manage Actors" },
  { path: "/system-admin-page/manage-students", label: "Manage Students" },
  { path: "/system-admin-page/manage-chapa", label: "Manage Chapa Integration" },
];

const SystemAdminPage = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar title="System Admin" navLinks={adminLinks} />
      <TopBar />
      <div className="flex-1 flex flex-col ml-[260px]">
        <main className="pt-20 pl-5 bg-gray-200 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SystemAdminPage;
