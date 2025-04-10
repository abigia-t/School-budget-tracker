import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../api/axiosInstance"; // Ensure this points to your axios instance
import "../../styles/PayrollManagement.css";

const HumanResourceDashboard = () => {
  const { stats } = useContext(StoreContext);
  const statsData = [
    { title: "Total Employees", count: stats.totalEmployees },
    { title: "Total Departments", count: stats.totalDepartments },
    { title: "Total Positions", count: stats.totalPositions },
  ];

  const [payrollStats, setPayrollStats] = useState({
    totalPayroll: 0,
    staffCount: 0,
    averageSalary: 0,
  });
  const [loadingPayroll, setLoadingPayroll] = useState(true);
  const [errorPayroll, setErrorPayroll] = useState(null);

  const fetchPayrollStats = async () => {
    setLoadingPayroll(true); // Set loading state before fetching
    try {
      const res = await api.get("/api/payroll/stats");
      if (res.data && res.data.success) {
        setPayrollStats(res.data); // Update with the fetched payroll stats
      } else {
        throw new Error("Invalid data structure");
      }
    } catch (err) {
      console.error("Error fetching payroll stats:", err);
      setErrorPayroll("Failed to load payroll statistics. Please try again later.");
    } finally {
      setLoadingPayroll(false); // Reset loading state after fetching
    }
  };

  useEffect(() => {
    fetchPayrollStats();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-100 to-indigo-200 pt-16"> {/* Gradient background */} 
      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {statsData.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center shadow-lg rounded-lg p-8
              ${index === 0
                ? " bg-blue-400 text-white"
                : index === 1
                ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white"
                : "bg-purple-600 text-white"}
              transition-all hover:scale-105 ease-in-out`}
          >
            <h1 className="text-lg font-semibold">{item.title}</h1>
            <h2 className="text-3xl font-bold mt-2">{item.count}</h2>
          </div>
        ))}
      </div>

      {/* Payroll Stats Section */}
      <div className="bg-white p-8 mt-8 rounded-lg shadow-xl">
        <h3 className="text-3xl font-semibold mb-6 text-center">Payroll Summary</h3>
        {loadingPayroll && <div className="text-center text-gray-600">Loading payroll statistics...</div>}
        {errorPayroll && <div className="text-center text-red-600">{errorPayroll}</div>}
        {!loadingPayroll && !errorPayroll && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-medium text-blue-600">Total Staff</h4>
              <p className="text-2xl font-bold text-gray-900">{payrollStats.staffCount}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-medium text-green-600">Total Payroll</h4>
              <p className="text-2xl font-bold text-gray-900">${payrollStats.totalPayroll.toFixed(2)}</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-medium text-yellow-600">Average Salary</h4>
              <p className="text-2xl font-bold text-gray-900">${payrollStats.averageSalary.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Send Notifications Section */}
        <div className="bg-gray-50 p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send Notifications</h2>
          {/* Notification sending logic goes here */}
        </div>

        {/* User Messages Section */}
        <div className="bg-gray-50 p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">User Messages</h2>
          {/* User messages logic goes here */}
        </div>
      </div>
    </div>
  );
};

export default HumanResourceDashboard;
