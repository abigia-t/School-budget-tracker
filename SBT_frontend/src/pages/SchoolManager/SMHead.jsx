import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";

// Define School Manager-specific navigation links
const SMHeadLinks = [
  { path: "/sm/dashboard", label: "Dashboard" },
  { path: "/sm/rrb", label: "Request Budget" },
];

const SMHead = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideBar title={"School Manager"} navLinks={SMHeadLinks} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* TopBar spanning full width */}
        <div className="fixed top-0 left-0 right-0 w-full z-10">
          <TopBar />
        </div>

        {/* Main section with correct padding to align with sidebar */}
        <main className="pt-16 pl-[200px] bg-gray-200 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SMHead;
