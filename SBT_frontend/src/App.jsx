import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GM from "./pages/GM";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen text-blue-500">
      <div className="flex-grow flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<GM />} />
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
};

export default App;
