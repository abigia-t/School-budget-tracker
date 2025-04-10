import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { FaUsers, FaUserGraduate, FaUserCheck, FaChalkboardTeacher } from "react-icons/fa";
import { MdAttachMoney, MdSchool, MdMoneyOff, MdAccountBalance } from "react-icons/md";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GeneralManagerDashboard = () => {
  const { stats } = useContext(StoreContext);

  const statsData = [
    { title: "Total Actors", count: stats.totalActors, icon: <FaUsers className="text-3xl text-indigo-600" /> },
    { title: "Total Students", count: stats.totalStudents, icon: <FaUserGraduate className="text-3xl text-green-600" /> },
    { title: "Total Registered", count: stats.totalRegistered, icon: <FaUserCheck className="text-3xl text-blue-600" /> },
    { title: "Total Employees", count: stats.totalEmployees, icon: <FaChalkboardTeacher className="text-3xl text-yellow-600" /> },
  ];

  const annualBudget = 100000;
  const studentFee = 50000;
  const otherFunds = 20000;
  const totalRevenue = annualBudget + studentFee + otherFunds;
  const totalExpenses = 70000;

  const financialData = [
    { label: "Annual Budget", value: annualBudget, color: "text-blue-600", icon: <MdAccountBalance className="text-3xl" /> },
    { label: "Student Fee", value: studentFee, color: "text-green-600", icon: <MdSchool className="text-3xl" /> },
    { label: "Other Funds", value: otherFunds, color: "text-yellow-600", icon: <MdAttachMoney className="text-3xl" /> },
    { label: "Total Revenue", value: totalRevenue, color: "text-purple-600", icon: <MdAttachMoney className="text-3xl" /> },
    { label: "Total Expenses", value: totalExpenses, color: "text-red-600", icon: <MdMoneyOff className="text-3xl" /> },
  ];

  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm gap-6">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* System Overview */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">System Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 text-center transition-transform transform hover:scale-105 space-y-2"
              >
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="text-lg font-medium text-gray-700">{item.title}</h3>
                <p className="text-2xl font-bold text-indigo-700">{item.count}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Financial Overview */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Financial Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {financialData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 text-center space-y-2"
              >
                <div className="flex justify-center text-gray-600">{item.icon}</div>
                <h3 className="text-lg font-medium text-gray-700">{item.label}</h3>
                <p className={`text-xl font-bold ${item.color}`}>ETB {item.value}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default GeneralManagerDashboard;