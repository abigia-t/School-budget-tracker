import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";

// Define Auditor-specific navigation links
const auditorLinks = [
  { path: "/auditor/dashboard", label: "Dashboard" },
  { path: "/auditor/ab", label: "Approve Budget" },
  { path: "/auditor/pr", label: "Parent Receipt" },
  { path: "/auditor/abp", label: "Approve Budget Performance" },
  { path: "/auditor/rb", label: "Request Budget" },
];

const Auditor = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar title="Auditor" navLinks={auditorLinks} />
      <TopBar />
      <div className="flex-1 flex flex-col ml-[260px]">
        <main className="pt-20 pl-5 bg-gray-200 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Auditor;
