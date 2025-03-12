import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/SideBar";

// Define GM-specific navigation links
const generalManagerLinks = [
  { path: "/general-manager-page/general-manager-dashboard", label: "Dashboard" },
  { path: "/general-manager-page/school-director-requested", label: "School Director" },
  { path: "/general-manager-page/human-resource-head-requested", label: "Human Resources Head" },
  { path: "/general-manager-page/resource-and-finance-head-requested", label: "Resource and Finance Head" },
  { path: "/general-manager-page/payment-requested", label: "Payment" },
  { path: "/general-manager-page/veiw-report", label: "View Report" },
];

const GeneralManagerPage = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar title="General Manager" navLinks={generalManagerLinks} />
      <TopBar />
      <div className="flex-1 flex flex-col ml-[260px]">
        <main className="pt-20  pl-5 bg-gray-200 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default GeneralManagerPage;
