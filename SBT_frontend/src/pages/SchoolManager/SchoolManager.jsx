import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";

// Define Auditor-specific navigation links
const RFHeadLinks = [
  { path: "/sm/dashboard", label: "Dashboard" },
  { path: "/sm/rrb", label: "Request Budget" },
];

const SMHead = () => {
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

export default SMHead;
