import React, { useState } from "react";
import NavBar from "../components/NavBar";
// Uncomment the following lines if you're using custom components for Card and Button
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

const GM = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <div className="bg-slate-300 pt-20 w-full min-h-screen">
            <div className="w-full px-6 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-white">Welcome!</h2>
            </div>
            <hr className="border-gray-400 mt-2" />
            <div className="grid grid-cols-2 gap-4 mt-6 px-6 text-center">
              <div className="bg-white shadow-md h-48 p-6 rounded-md">
                <h1 className="text-2xl font-semibold">Annual Budget</h1>
              </div>
              <div className="bg-white shadow-md h-48 p-6 rounded-md">
                <h1 className="text-2xl font-semibold">Revenue</h1>
              </div>
              <div className="bg-white shadow-md h-48 p-6 rounded-md">
                <h1 className="text-2xl font-semibold">Expense</h1>
              </div>
              <div className="bg-white shadow-md h-48 p-6 rounded-md">
                <h1 className="text-2xl font-semibold">Total</h1>
              </div>
            </div>
          </div>
        );
      case "sd":
        return <div>School director Page Content</div>;
      case "hr":
        return <div>Human Resources Page Content</div>;
        case "rf":
        return <div>Resource and finance head</div>;
        case "parent":
          return <div>Parent or Student Page Content</div>;
          case "vr":
          return <div>You will see reports here</div>;
      default:
        return <div>404 - Page Not Found</div>;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavBar/>
      {/* Navigation */}
      <nav className="bg-gray-200 py-2 mt-20 px-6 flex gap-4">
        <button
          onClick={() => setActivePage("dashboard")}
          className={`py-2 px-4 rounded ${
            activePage === "dashboard" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActivePage("sd")}
          className={`py-2 px-4 rounded ${
            activePage === "sd" ? "bg-blue-500 text-white" : ""
          }`}
        >
          School Director
        </button>
        <button
          onClick={() => setActivePage("hr")}
          className={`py-2 px-4 rounded ${
            activePage === "hr" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Human Resources Head
        </button>
        <button
          onClick={() => setActivePage("rf")}
          className={`py-2 px-4 rounded ${
            activePage === "rf" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Resource and Finance Head
        </button>
        <button
          onClick={() => setActivePage("student")}
          className={`py-2 px-4 rounded ${
            activePage === "student" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Student
        </button>
        <button
          onClick={() => setActivePage("vr")}
          className={`py-2 px-4 rounded ${
            activePage === "vr" ? "bg-blue-500 text-white" : ""
          }`}
        >
          View Report
        </button>
      </nav>

      {/* Content */}
      <main className="flex-grow p-6 bg-gray-100">{renderContent()}</main>
    </div>
  );
};

export default GM;
