import React from "react";

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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">View Report</h1>

      {/* Report Overview */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">System Overview</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-5">
            <h3 className="text-xl font-medium">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-600">${reportData.totalRevenue}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-5">
            <h3 className="text-xl font-medium">Total Expenses</h3>
            <p className="text-3xl font-bold text-red-600">${reportData.totalExpenses}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-5">
            <h3 className="text-xl font-medium">Net Profit</h3>
            <p className="text-3xl font-bold text-blue-600">${reportData.netProfit}</p>
          </div>
        </div>
      </div>

      {/* System Messages */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">System Admin Messages</h2>
        <ul className="list-disc pl-5">
          {reportData.systemMessages.map((message, index) => (
            <li key={index} className="mb-2 text-lg">{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewReport;