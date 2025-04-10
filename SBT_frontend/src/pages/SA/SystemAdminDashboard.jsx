import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { FaUsers, FaUserGraduate, FaClipboardCheck, FaUserTie } from "react-icons/fa";

const SystemAdminDashboard = () => {
  const { stats } = useContext(StoreContext);

  const statsData = [
    {
      title: "Total Staff",
      count: stats.totalActors,
      icon: <FaUsers className="text-4xl text-blue-700 mb-2" />,
    },
    {
      title: "Total Students",
      count: stats.totalStudents,
      icon: <FaUserGraduate className="text-4xl text-green-600 mb-2" />,
    },
    {
      title: "Total Registered",
      count: stats.totalRegistered,
      icon: <FaClipboardCheck className="text-4xl text-purple-600 mb-2" />,
    },
    {
      title: "Total Employees",
      count: stats.totalEmployees || 0, // fallback if missing
      icon: <FaUserTie className="text-4xl text-yellow-600 mb-2" />,
    },
  ];

  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm gap-6">
      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-5">
        {statsData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center shadow-md rounded-lg p-6 bg-white hover:shadow-lg transition"
          >
            {item.icon}
            <h1 className="text-lg font-semibold text-gray-700">{item.title}</h1>
            <h2 className="text-2xl font-bold text-gray-800 mt-1">{item.count}</h2>
          </div>
        ))}
      </div>

      <div className="bg-white grid grid-cols-2 mt-10 p-6 rounded-xl shadow-md">
        {/* Future sections like Notifications or Messages go here */}
        {/* <NotificationSection /> */}
        {/* <MessagesSection /> */}
      </div>
    </div>
  );
};

export default SystemAdminDashboard;
