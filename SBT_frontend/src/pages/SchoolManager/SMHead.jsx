import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";

// Define Auditor-specific navigation links
const SMHeadLinks = [
  { path: "/sm/dashboard", label: "Dashboard" },
  { path: "/sm/rrb", label: "Request Budget" },
];

const SMHead = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar title={"School Manager"} navLinks={SMHeadLinks} />
      <div className="flex-1 flex flex-col ml-[200px]"> {/* Reduced margin-left */}
        <TopBar />
        <main className="pt-16 pl-3 bg-gray-200 min-h-screen"> {/* Reduced padding */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};


export default SMHead;
