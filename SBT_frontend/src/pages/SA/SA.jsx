import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";

// Define System Admin-specific navigation links
const adminLinks = [
  { path: "/sa/dashboard", label: "Dashboard" },
  { path: "/sa/actors", label: "Manage Actors" },
  { path: "/sa/students", label: "Manage Students" },
  { path: "/sa/notifications", label: "Send Notifications" },
  { path: "/sa/chapa", label: "Manage Chapa" },
];
const SA = () => {
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

export default SA;
