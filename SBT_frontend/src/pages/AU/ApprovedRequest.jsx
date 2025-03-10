import React, { useState, useEffect } from "react";

const ApprovedRequest = () => {
  const [approvedBudgets, setApprovedBudgets] = useState([]);

  // Simulate fetching approved budgets (replace with real data fetching)
  useEffect(() => {
    const fetchedBudgets = [
      { id: 1, program: "New Classroom Construction", approvedAmount: 10000,  },
      { id: 2, program: "School Bus Maintenance", approvedAmount: 5000,  },
      { id: 3, program: "Science Lab Renovation", approvedAmount: 7000,  },
    ];
    setApprovedBudgets(fetchedBudgets);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Approved Budget Requests
      </h1>

      {/* Approved Budget List */}
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Approved Budgets</h2>
        <div className="space-y-3">
          {approvedBudgets.length === 0 ? (
            <p className="text-center text-gray-600">No approved budgets available.</p>
          ) : (
            approvedBudgets.map((budget) => (
              <div
                key={budget.id}
                className="p-3 bg-green-50 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{budget.program}</p>
                  <p className="text-sm text-gray-600">Approved Amount: ${budget.approvedAmount}</p>
                  <p className="text-sm font-semibold text-green-600">{budget.status}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovedRequest;