import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen text-blue-500">
      <Header />

      {/*Home page */}
      <div className="flex-grow flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
