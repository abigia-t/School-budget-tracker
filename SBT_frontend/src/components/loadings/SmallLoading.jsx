import React from "react";

const SmallLoading = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="ml-2 text-blue-600 text-sm">Fetching data...</p>
    </div>
  );
};

export default SmallLoading;
