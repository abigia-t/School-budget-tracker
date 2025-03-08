import React from "react";
import AuthForm from "../components/AuthForm";
import NavBar from "../components/NavBar";
const LoginPage = () => {
  return (
    <div>
     <NavBar/>
      <div className="flex justify-center items-center py-6 pt-10">
        <AuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
