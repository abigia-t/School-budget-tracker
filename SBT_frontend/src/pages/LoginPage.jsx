import React from "react";
import AuthForm from "../components/AuthForm";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    navigate("/parent");
  };
  return (
    <div>
      <NavBar />
      <div className="flex justify-center  items-center py-6 pt-10">
        <AuthForm onLoginSuccess={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
