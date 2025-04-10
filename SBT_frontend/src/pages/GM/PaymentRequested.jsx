import React, { useState } from "react";

const PaymentRequest = () => {
  // Sample student payment requests (Replace with API data)
  const [paymentRequests, setPaymentRequests] = useState([
    { id: 1, studentName: "Jemal Kedir", amount: 1200, status: "Pending" },
    { id: 2, studentName: "Kahin Zekariyas", amount: 1500, status: "Pending" },
    { id: 3, studentName: "Samuel Mussie", amount: 1100, status: "Pending" }
  ]);

  // Handle payment approval status change
  const handleStatusChange = (id, newStatus) => {
    setPaymentRequests(paymentRequests.map(request => request.id === id ? { ...request, status: newStatus } : request));
  };

  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm gap-6">
      <h1 className="text-xl font-bold mb-5">Payments</h1>

      {/* Payment Requests Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Student Name</th>
              <th className="p-3 text-left">Amount (ETB)</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentRequests.map((request) => (
              <tr key={request.id} className="border-b">
                <td className="p-3">{request.studentName}</td>
                <td className="p-3">ETB {request.amount}</td>
                <td className="p-3 text-center">
                  <select
                    className={`px-3 py-1 rounded ${
                      request.status === "Approved" ? "bg-green-500 text-white" :
                      request.status === "Rejected" ? "bg-red-500 text-white" :
                      "bg-yellow-500 text-white"
                    }`}
                    value={request.status}
                    onChange={(e) => handleStatusChange(request.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentRequest;