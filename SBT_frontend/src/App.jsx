import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GM from "./pages/GM";
import "react-toastify/dist/ReactToastify.css";
import AccountPage from "./pages/AccountPage";
import Footer from "./components/Footer";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";


const App = () => {
  return (
    <div className="flex flex-col min-h-screen text-blue-500">

      <div className="flex-grow flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<GM />} />
          <Route path="/login" element={<AccountPage/>}/>
        </Routes>
      </div>
      <Footer/>

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
