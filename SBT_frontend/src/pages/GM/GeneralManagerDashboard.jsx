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
import {
  FaUsers,
  FaUserGraduate,
  FaUserCheck,
  FaChalkboardTeacher,
  FaBalanceScale
} from "react-icons/fa";
import {
  MdAccountBalance,
  MdSchool,
  MdSavings,
  MdAssessment,
  MdReceiptLong,
} from "react-icons/md";
import SmallLoading from "../../components/loadings/SmallLoading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GeneralManagerDashboard = () => {
  const { stats, isFetchingStats } = useContext(StoreContext);
  const { totalEmployee, isFetchingTotalEmployee } = useContext(StoreContext); // Assuming this is the correct context for totalEmployees

  const statsData = [
    {
      title: "Total Actors",
      count: stats?.totalActors ?? 0,
      icon: <FaUsers className="text-3xl text-indigo-600" />,
    },
    {
      title: "Total Students",
      count: stats?.totalStudents ?? 0,
      icon: <FaUserGraduate className="text-3xl text-green-600" />,
    },
    {
      title: "Total Registered",
      count: stats?.totalRegistered ?? 0,
      icon: <FaUserCheck className="text-3xl text-blue-600" />,
    },
  ];

  const totalEmployeesData = [
    {
      title: "Total Employees",
      count: totalEmployee,
      icon: <FaChalkboardTeacher className="text-3xl text-red-600" />,
    },
  ];

  const { financialData } = useContext(StoreContext); // Assuming this is the correct context for financialData

  const financialCard = [
    {
      label: "Annual Budget",
      value: financialData.annualBudget,
      color: "text-blue-600",
      icon: <MdAccountBalance className="text-3xl" />,
    },
    {
      label: "Student Fee",
      value: financialData.studentFees,
      color: "text-green-600",
      icon: <MdSchool className="text-3xl" />,
    },
    {
      label: "Other Funds",
      value: financialData.otherFundTotal,
      color: "text-yellow-600",
      icon: <MdSavings className="text-3xl" />,
    },
    {
      label: "Total Revenue",
      value: financialData.totalRevenue,
      color: "text-purple-600",
      icon: <MdAssessment className="text-3xl text-green-600" />,
    },
    {
      label: "Total Expenses",
      value: financialData.totalExpenses,
      color: "text-red-600",
      icon: <MdReceiptLong className="text-3xl text-red-600" />,
    },{
      label: "Net Profit",
      value: financialData.netProfit,
      color: "text-Purple-900",
      icon: <FaBalanceScale className="text-3xl text-blue-600" />,
    },
  ];

  return (
    <div className="bg-gray-100 mt-7 p-6 rounded-lg shadow-sm gap-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Financial Overview */}
        <section>
          <h2 className="text-2xl text-center font-semibold mb-4 text-gray-800">
            Financial Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {financialCard.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 text-center space-y-2"
              >
                <div className="flex justify-center text-gray-600">
                  {item.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-700">
                  {item.label}
                </h3>
                <p className={`text-xl font-bold ${item.color}`}>
                  ETB  {item.value != null? item.value.toLocaleString():"0"}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* System Overview */}
        <section>
          <h2 className="text-2xl text-center font-semibold mb-4 text-gray-800">
            Users Overview
          </h2>
          {isFetchingStats || isFetchingTotalEmployee ? (
            <SmallLoading />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md p-6 text-center transition-transform transform hover:scale-105 space-y-2"
                >
                  <div className="flex justify-center">{item.icon}</div>
                  <h3 className="text-lg font-medium text-gray-700">
                    {item.title}
                  </h3>
                  <p className="text-2xl font-bold text-indigo-700">
                    {item.count}
                  </p>
                </div>
              ))}

              <div className="bg-white rounded-2xl shadow-md p-6 text-center transition-transform transform hover:scale-105 space-y-2">
                <div className="flex justify-center">
                  {totalEmployeesData[0].icon}
                </div>
                <h3 className="text-lg font-medium text-gray-700">
                  {totalEmployeesData[0].title}
                </h3>
                <p className="text-2xl font-bold text-indigo-700">
                  {totalEmployeesData[0].count}
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default GeneralManagerDashboard;
