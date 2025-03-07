import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const ABP = () => {
  const [budgets, setBudgets] = useState([
    { id: 1, program: "Science Program", amount: 5000, month: "2025-03" },
    { id: 2, program: "Math Program", amount: 3000, month: "2025-03" },
  ]);

  const [payments, setPayments] = useState([
    { id: 1, studentName: "Emma", amount: 50, date: "2025-03-10", month: "2025-03" },
    { id: 2, studentName: "Liam", amount: 50, date: "2025-03-15", month: "2025-03" },
  ]);

  const [auditReport, setAuditReport] = useState([]);
  const [chartData, setChartData] = useState({});
  const [isAuditing, setIsAuditing] = useState(false);

  // Simulating the auditing process
  const startAudit = () => {
    setIsAuditing(true);
    
    const months = ["2025-03", "2025-04", "2025-05"];
    let expenseData = [];
    let incomeData = [];

    months.forEach((month) => {
      // Calculate expenses for each month
      const totalExpense = budgets
        .filter((budget) => budget.month === month)
        .reduce((sum, budget) => sum + budget.amount, 0);

      // Calculate income for each month (payments received)
      const totalIncome = payments
        .filter((payment) => payment.month === month)
        .reduce((sum, payment) => sum + payment.amount, 0);

      expenseData.push(totalExpense);
      incomeData.push(totalIncome);
    });

    // Set chart data
    setChartData({
      labels: months,
      datasets: [
        {
          label: "Expenses",
          data: expenseData,
          borderColor: "red",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
        {
          label: "Income",
          data: incomeData,
          borderColor: "green",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    });

    // Generate audit report
    const report = budgets.map((budget) => {
      const paymentTotal = payments
        .filter((payment) => payment.amount <= budget.amount)
        .reduce((sum, payment) => sum + payment.amount, 0);

      return {
        program: budget.program,
        approvedBudget: budget.amount,
        totalPayments: paymentTotal,
        status: paymentTotal === budget.amount ? "Balanced" : "Discrepancy",
      };
    });
    setAuditReport(report);

    // Send report to the General Manager (Mocked)
    sendAuditReportToGM(report);
  };

  // Function to simulate sending the report to General Manager
  const sendAuditReportToGM = (report) => {
    console.log("Sending audit report to General Manager...");
    // Here you would use an API call to send the report, for now we log it
    console.log(report);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Approve Budget Performance
      </h1>

      {/* Audit Button */}
      <div className="text-center mb-6">
        <button
          onClick={startAudit}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Start Auditing
        </button>
      </div>

      {/* Display Audit Results */}
      {isAuditing ? (
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Audit Report</h2>
            {auditReport.map((report, index) => (
              <div key={index} className="flex justify-between mb-4">
                <p className="text-gray-800">{report.program}</p>
                <p className="text-gray-800">Approved Budget: ${report.approvedBudget}</p>
                <p className="text-gray-800">Total Payments: ${report.totalPayments}</p>
                <p
                  className={`font-semibold ${
                    report.status === "Balanced" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {report.status}
                </p>
              </div>
            ))}
          </div>

          {/* Display Graph */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Budget vs Payment Graph</h2>
            <Line data={chartData} options={{ responsive: true }} />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">Approved Budgets</h2>
          <ul className="space-y-4">
            {budgets.map((budget) => (
              <li key={budget.id} className="flex justify-between items-center">
                <p className="text-gray-800">{budget.program}</p>
                <p className="font-semibold text-green-600">${budget.amount}</p>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold text-gray-700 mt-6">Payments Received</h2>
          <ul className="space-y-4">
            {payments.map((payment) => (
              <li key={payment.id} className="flex justify-between items-center">
                <p className="text-gray-800">{payment.studentName}</p>
                <p className="font-semibold text-green-600">${payment.amount}</p>
                <p className="text-sm text-gray-600">{payment.date}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ABP;
