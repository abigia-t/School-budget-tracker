import React from "react";
import Header from "../components/Header";

const GM = () => {
  return (
    <div>
      <Header
        header={
          <div>
            <div className="flex items-center gap-3">
              <img
                className="h-12 w-12 object-contain"
                src={assets.edu_logo}
                alt="Yajeb Academy Logo"
              />
              <h2 className="text-2xl md:text-3xl font-semibold">
                Yajeb Academy
              </h2>
            </div>

            <h2 className="text-9xl md:text-3xl tracking-wide text-center">
              BUDGET TRACKING SYSTEM
            </h2>

            <div className="text-white text-3xl md:text-4xl">
              <FaGraduationCap />
            </div>
          </div>
        }
      />
      <div className="bg-slate-300 pt-20 w-full min-h-screen">
        <div className="w-full px-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">Welcome!</h2>
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
    </div>
  );
};

export default GM;
