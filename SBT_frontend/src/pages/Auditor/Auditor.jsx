import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";

// Define Auditor-specific navigation links
const auditorLinks = [
  { path: "/auditor/dashboard", label: "Dashboard" },
  { path: "/auditor/ab", label: "Approved Expenditure" },
  { path: "/auditor/pr", label: "Approved Revenue" },
  { path: "/auditor/abp", label: "Auditing" },
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
