import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";

const HRheadLinks = [
  { path: "/human-resource-page/human-resource-dashboard", label: "Dashboard" },
  { path: "/human-resource-page/human-resource-request", label: "Request Budget" },
];


const HumanResourcePage = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar title={"Human Resource\nHead"} navLinks={HRheadLinks} />
      <TopBar />
      <div className="flex-1 flex flex-col ml-[260px]">
        <main className="pt-20 pl-5 bg-gray-200 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HumanResourcePage;