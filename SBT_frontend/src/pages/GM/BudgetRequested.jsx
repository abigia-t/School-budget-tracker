import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import SmallLoading from "../../components/loadings/SmallLoading";

const BudgetRequested = () => {
  const [isRequests, setIsRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(()=>{
      setIsLoading(false)
    },2500) 
    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/budget-requests"
        );
        if (response.data.success && Array.isArray(response.data.data)) {
          setIsRequests(response.data.data);
        }
         else {
          setIsRequests([]);
          console.error("Unexpected format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching budget requests:", error);
        setIsRequests([]);
        toast.error("Failed to fetch budget requests.");
      } 
    };

    fetchRequests();
  }, []);

  if (isLoading) return <SmallLoading />;
  
  const getStatusBadge = (status) => {
    const statusClass =
      {
        pending: "bg-yellow-100 text-yellow-800",
        approved: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800",
      }[status?.toLowerCase()] || "bg-gray-100 text-gray-800";

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
      >
        {status || "Unknown"}
      </span>
    );
  };
  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm">
      <h1 className="text-xl  text-center font-bold mb-5">Requested Budgets</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Requested By</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Month</th>
              <th className="p-3 text-left">Amount (ETB)</th>
              <th className="p-3 text-left">Status (ETB)</th>              
              <th className="p-3 text-center">Detail</th>
            </tr>
          </thead>
          <tbody>
            {isRequests.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No budget requests found.
                </td>
              </tr>
            ) : (
              isRequests.map((request) => (
                <tr key={request._id} className="border-b">
                  <td className="p-3">{request.requestedBy?.role || "Unknown"}</td>
                  <td className="p-3">{request.category}</td>
                  <td className="p-3">{request.month}</td>
                  <td className="p-3">ETB {request.amount}</td>
                  <td className="p-3">{getStatusBadge(request.status)}</td>
                  <td className="p-3 text-center">
                    <Link
                      to={`/general-manager-page/budget-requested/${request._id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Eye size={20} />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetRequested;
