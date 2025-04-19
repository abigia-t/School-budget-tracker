import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LargeLoading from "../../components/loadings/LargeLoading";

const SetBudget = () => {
  const [year, setYear] = useState("");
  const [allocatedBudget, setAllocatedBudget] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [fundYear, setFundYear] = useState("");
  const [allocatedFund, setAllocatedFund] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // slightly faster
    return () => clearTimeout(timer);
  }, []);

  const handleSubmitAnnual = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/annual-budget/", {
        year,
        allocatedBudget,
      });
      toast.success("Annual budget allocated!");
      navigate("/general-manager-page/general-manager-dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to allocate budget");
    }
  };

  const handleSubmitOtherFund = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/other-fund/", {
        organizationName,
        allocatedFund,
        fundYear
      });
      toast.success("Other fund allocated!");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to allocate funds");
    }
  };

  if (isLoading) return <LargeLoading />;

  return (
    <div className="bg-gray-100 my-7 p-6 rounded-lg shadow-sm min-h-[80vh]">
      <div className="grid grid-rows-2 gap-8 max-w-5xl mx-auto mb-14">
        {/* Annual Budget */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            Set Annual Budget
          </h2>
          <form onSubmit={handleSubmitAnnual} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Year</label>
              <input
                type="number"
                placeholder="e.g., 2024"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Allocated Budget
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                value={allocatedBudget}
                onChange={(e) => setAllocatedBudget(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 transition text-white py-2 rounded-lg font-medium"
            >
              Allocate Budget
            </button>
          </form>
        </div>

        {/* Other Funds */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Other Funds</h2>
          <form onSubmit={handleSubmitOtherFund} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Year</label>
              <input
                type="number"
                placeholder="e.g., 2024"
                value={fundYear}
                onChange={(e) => setFundYear(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Organization Name
              </label>
              <input
                type="text"
                placeholder="e.g., NGO..."
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Fund Amount</label>
              <input
                type="number"
                placeholder="e.g., NGO donations"
                value={allocatedFund}
                onChange={(e) => setAllocatedFund(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 transition text-white py-2 rounded-lg font-medium"
            >
              Allocate Funds
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetBudget;
