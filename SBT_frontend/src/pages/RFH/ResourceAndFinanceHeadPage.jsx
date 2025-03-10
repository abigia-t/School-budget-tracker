import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";

const RFHeadLinks = [
  { path: "/resource-and-finance-head-page/resource-and-finance-head-dashboard", label: "Dashboard" },
  { path: "/resource-and-finance-head-page/prepare-payroll", label: "Prepare Payroll" },
  { path: "/resource-and-finance-head-page/resource-and-finance-head-request", label: "Request Budget" },
];


const RFH = () => {
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

export default RFH;