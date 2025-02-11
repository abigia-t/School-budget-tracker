import React from "react";

const Home = () => {
  return (
    <div className="bg-slate-300 pt-20 w-full min-h-screen">
      {/* Top Black Bar - Full Width with Spaced Content */}
      <div className="w-full px-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Welcome!</h2>
        <button className="bg-white text-blue-600 font-medium px-6 py-3 rounded-md hover:bg-gray-100 transition">
          SIGN IN
        </button>
      </div>

      <hr className=" border-gray-400 mt-2" />

      <div className="grid grid-cols-2 gap-4 mt-6 px-6 text-center">
  <div className="bg-white shadow-md h-48 p-6 rounded-md">
    <h1 className="text-2xl font-semibold">Annual Budget</h1>
  </div>
  <div className="bg-white shadow-md h-48 p-6 rounded-md">
    <h1 className="text-2xl font-semibold">Revenue</h1>
  </div>
  <div className="bg-white shadow-md h-48 p-6 rounded-md">
    <h1 className="text-2xl font-semibold">Expense</h1>
  </div>
  <div className="bg-white shadow-md h-48 p-6 rounded-md">
    <h1 className="text-2xl font-semibold">Total</h1>
  </div>
</div>

    </div>
  );
};

export default Home;
