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
      {/* Sidebar (Fixed Width) */}
      <div className="w-64"> {/* Adjust the width of the sidebar here */}
      <SideBar
  title="School Director"
  subtitle="Budget Tracking" // Pass the subtitle here
  navLinks={SMHeadLinks}
/>
      </div>

      {/* Main Content (Flex Column) */}
      <div className="flex-1 flex flex-col">
        <TopBar /> {/* Ensure TopBar is at the top */}

        {/* Main Content */}
        <main className="bg-gray-200 min-h-screen pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SMHead;
