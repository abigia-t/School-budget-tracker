import React, { useState, useEffect } from "react";
import axios from "axios";

const BudgetRequested = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the budget requests from the backend when the component mounts
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/budgets"); // Replace with your API endpoint
        console.log("API Response:", response.data); // Check the response format
        if (Array.isArray(response.data)) {
          setRequests(response.data); // Set only if it's an array
        } else {
          console.error("Response is not an array:", response.data);
          setRequests([]); // Set to an empty array if not an array
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching budget requests", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  if (loading) {
    return <div>Loading...</div>; // Add your custom loading indicator here
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Requested Budgets</h1>

      {/* Budget Requests Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Requested By</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Amount (ETB)</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id} className="border-b">
                <td className="p-3">{request.requestedBy ? request.requestedBy.fullName : "Unknown"}</td>
                <td className="p-3">{request.title}</td>
                <td className="p-3">ETB {request.amount}</td>
                <td className="p-3">{request.message}</td>
                <td className="p-3 text-center">
                  <select
                    className={`px-3 py-1 rounded ${request.status === "Approved" ? "bg-green-500 text-white" : request.status === "Rejected" ? "bg-red-500 text-white" : "bg-yellow-500 text-white"}`}
                    value={request.status}
                    onChange={(e) => handleStatusChange(request._id, e.target.value)}
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

export default BudgetRequested;