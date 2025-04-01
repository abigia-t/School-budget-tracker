import axios from "axios";
import { useState, useEffect } from "react";

const ParentDashboard = () => {
  const [parentData, setParentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!storedUser || storedUser.role !== "Parent") {
      setParentData(null);
    } else {
      axios.get(`http://localhost:5000/api/student/${storedUser._id}`).then((res) => {
        setParentData(res.data);
      }
      );
    }
    setLoading(false);
  }, []);

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (!parentData)
    return (
      <p className="text-center text-red-500">
        No parent data found. Please log in.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Parent Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* Upcoming Payments Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Upcoming Payments
          </h2>
          <div className="space-y-3">
            {parentData.upcomingPayments && parentData.upcomingPayments.length > 0 ? (
              parentData.upcomingPayments.map((payment, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {payment.childName || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Due: {payment.dueDate || "N/A"}
                    </p>
                  </div>
                  <p className="font-semibold text-green-600">
                    ETB {payment.amount ? payment.amount.toFixed(2) : "0.00"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No upcoming payments.</p>
            )}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Total due: ETB{" "}
            {parentData.upcomingPayments
              ? parentData.upcomingPayments
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toFixed(2)
              : "0.00"}
          </p>
        </div>

        {/* Notifications Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Notifications
          </h2>
          <div className="space-y-3">
            {parentData.notifications && parentData.notifications.length > 0 ? (
              parentData.notifications.map((notification, index) => (
                <div key={index} className="p-3 bg-red-50 rounded-lg">
                  <p className="text-gray-800">{notification.message}</p>
                  <p className="text-sm text-gray-600">
                    {notification.date || "Unknown date"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No notifications available.</p>
            )}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            {parentData.notifications ? parentData.notifications.length : 0}{" "}
            {parentData.notifications?.length === 1
              ? "notification"
              : "notifications"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
