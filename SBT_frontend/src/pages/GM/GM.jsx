import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";

// Define GM-specific navigation links
const generalManagerLinks = [
  { path: "/gm/dashboard", label: "Dashboard" },
  { path: "/gm/sd", label: "School Director" },
  { path: "/gm/hr", label: "Human Resources Head" },
  { path: "/gm/rf", label: "Resource and Finance Head" },
  { path: "/gm/payment", label: "Payment" },
  { path: "/gm/vr", label: "View Report" },
];
const GM = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar title="General Manager" navLinks={generalManagerLinks} />
      <TopBar />
      <div className="flex-1 flex flex-col ml-[260px]">
        <main className="pt-20  pl-5 bg-gray-200 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default GM;
