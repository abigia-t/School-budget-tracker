import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";

// Define Auditor-specific navigation links
const RFHeadLinks = [
  { path: "/rfhead/dashboard", label: "Dashboard" },
  { path: "/rfhead/pp", label: "Prepare Payroll" },
  { path: "/rfhead/rrb", label: "Request Budget" },
];

const RFHead = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar title={"Resource & Finance\nHead"} navLinks={RFHeadLinks} />
      <TopBar />
      <div className="flex-1 flex flex-col ml-[260px]">
        <main className="pt-20 pl-5 bg-gray-200 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RFHead;
