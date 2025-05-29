import React from "react";
import AuthForm from "../components/AuthForm";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer"; // Assuming you have a Footer component
const LoginPage = () => {
  return (
    <div className="h-full bg-gray-300">
      <NavBar />
      <div className="bg-gray-300 flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <AuthForm />
      </div>
      <Footer/>
    </div>
  );
};

export default LoginPage;