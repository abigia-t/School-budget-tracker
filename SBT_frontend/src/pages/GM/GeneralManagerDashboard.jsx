import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GeneralManagerDashboard = () => {
  // Sample data (Replace with actual API data)
  const { stats } = useContext(StoreContext);

  const statsData = [
    { title: "Total Actors", count: stats.totalActors },
    { title: "Total Students", count: stats.totalStudents },
    { title: "Total Registered", count: stats.totalRegistered },
  ];

  const annualBudget = 100000; // Default planned budget
  const studentFee = 50000; // Total collected from students
  const otherFunds = 20000; // Other funding sources
  const totalRevenue = annualBudget + studentFee + otherFunds;
  const totalExpenses = 70000; // Expenses made

  // Chart data
  const chartData = {
    labels: ["Revenue", "Expenses"],
    datasets: [
      {
        label: "Amount (ETB)",
        data: [totalRevenue, totalExpenses],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
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

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        General Manager Dashboard
      </h1>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-center"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">{item.title}</h2>
            <p className="text-2xl font-bold text-gray-800">{item.count}</p>
          </div>
        ))}
      </div>

      {/* Financial Overview */}
      <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-6 text-center">Financial Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-center">
          <h3 className="text-lg font-semibold text-gray-700">Annual Budget</h3>
          <p className="text-xl font-bold text-blue-600">ETB {annualBudget}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-center">
          <h3 className="text-lg font-semibold text-gray-700">Student Fee</h3>
          <p className="text-xl font-bold text-green-600">ETB {studentFee}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-center">
          <h3 className="text-lg font-semibold text-gray-700">Other Funds</h3>
          <p className="text-xl font-bold text-yellow-600">ETB {otherFunds}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
          <p className="text-xl font-bold text-purple-600">ETB {totalRevenue}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Expenses</h3>
          <p className="text-xl font-bold text-red-600">ETB {totalExpenses}</p>
        </div>
      </div>

      {/* Budget Trends Chart */}
      <div className="mt-10 p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Budget Trends</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default GeneralManagerDashboard;
