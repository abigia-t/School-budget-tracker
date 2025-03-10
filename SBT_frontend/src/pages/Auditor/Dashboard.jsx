import React from "react";

const Dashboard = () => {
  const auditData = {
    totalExpenditureItems: 10, // example number of expenditure items
    totalRevenueItems: 15,     // example number of revenue items
    notifications: [
      { id: 1, message: "New budget request pending review", date: "2025-03-05" },
      { id: 2, message: "Audit report submitted for approval", date: "2025-03-04" },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Auditor Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Expenditure Items */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Total Expenditure Items</h2>
          <p className="text-2xl font-bold text-gray-800">{auditData.totalExpenditureItems}</p>
        </div>

        {/* Total Revenue Items */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Total Revenue Items</h2>
          <p className="text-2xl font-bold text-green-600">{auditData.totalRevenueItems}</p>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Notifications</h2>
          <div className="space-y-3">
            {auditData.notifications.map((notification) => (
              <div key={notification.id} className="p-3 bg-blue-50 rounded-lg">
                <p className="text-gray-800">{notification.message}</p>
                <p className="text-sm text-gray-600">{notification.date}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            {auditData.notifications.length} new{" "}
            {auditData.notifications.length === 1 ? "notification" : "notifications"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
