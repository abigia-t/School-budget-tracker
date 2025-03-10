import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";

const auditorLinks = [
  { path: "/auditor-page/auditor-dashboard", label: "Dashboard" },
  { path: "/auditor-page/approved-request", label: "Approve Budget" },
  { path: "/auditor-page/parent-receipt", label: "Parent Receipt" },
  { path: "/auditor-page/abp", label: "Approve Budget Performance" },
  { path: "/auditor-page/auditor-request", label: "Request Budget" },
];

const AuditorPage = () => {
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

export default AuditorPage;