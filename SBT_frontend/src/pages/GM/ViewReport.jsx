import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MdAttachMoney, MdMoneyOff } from "react-icons/md";
import { FaBalanceScale } from "react-icons/fa";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ViewReport = () => {
  // Sample report data (Replace with actual data from API)
  const reportData = {
    totalRevenue: 50000,
    totalExpenses: 20000,
    netProfit: 30000,
    systemMessages: [
      "Budget approval process updated.",
      "New report for Q1 ready for review.",
      "General Manager permissions updated."
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Budget vs Expenses",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `ETB${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  // Chart data
  const chartData = {
    labels: ["Revenue", "Expenses"],
    datasets: [
      {
        label: "Amount (ETB)",
        data: [reportData.totalRevenue, reportData.totalExpenses],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm gap-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">System Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-5 text-center">
            <div className="flex justify-center text-green-600 mb-2">
              <MdAttachMoney className="text-4xl" />
            </div>
            <h3 className="text-xl font-medium">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-600">ETB {reportData.totalRevenue}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-5 text-center">
            <div className="flex justify-center text-red-600 mb-2">
              <MdMoneyOff className="text-4xl" />
            </div>
            <h3 className="text-xl font-medium">Total Expenses</h3>
            <p className="text-3xl font-bold text-red-600">ETB {reportData.totalExpenses}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-5 text-center">
            <div className="flex justify-center text-blue-600 mb-2">
              <FaBalanceScale className="text-4xl" />
            </div>
            <h3 className="text-xl font-medium">Net Profit</h3>
            <p className="text-3xl font-bold text-blue-600">ETB {reportData.netProfit}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Budget Trends</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ViewReport;
