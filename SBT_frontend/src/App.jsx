import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GM from "./pages/GM";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen text-blue-500">
      <div className="flex-grow flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gm" element={<GM />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
