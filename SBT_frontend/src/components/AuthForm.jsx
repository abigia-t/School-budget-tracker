import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import RoleRoute from "../config/RoleRoute";

const AuthForm = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const { login } = useContext(StoreContext); 
  const navigate = useNavigate();

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
  });

  const forgotPasswordValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
  });

  const initialValues = { email: "", password: "", confirmPassword: "" };

  const onSubmit = async (values, { resetForm, setFieldError }) => {
    try {
      if (isForgotPassword) {
        // Password Reset Request
        const response = await axios.post("http://localhost:5000/api/actors/change-password", {
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
  
        alert(response.data.message); // Show success message
        setIsForgotPassword(false);
        resetForm();
      } else {
        // Login Request
        const response = await axios.post("http://localhost:5000/api/actors/login", {
          email: values.email,
          password: values.password,
        });
  
        if (response.data.message === "User doesn't exist.") {
          setFieldError("email", response.data.message); // Set error for email
        } else if (response.data.message === "Invalid password.") {
          setFieldError("password", response.data.message); // Set error for password
        } else {
          login(response.data.actor); // Store user in context
          const rolePath = RoleRoute[response.data.actor.role]; // Get path from roleRoutes
          if (rolePath) {
            navigate(rolePath); // Navigate to the correct dashboard
          } else {
            toast.error("Invalid role detected. Redirecting to home.");
            navigate("/"); // Default to home if role is unknown
          }
        }
        
      }
    } catch (error) {
      console.error("Login error:", error);
    
      if (error.response) {
        setFieldError("email", error.response.data?.message || "An error occurred. Please try again.");
      } else if (error.request) {
        setFieldError("email", "No response from the server. Check your connection.");
      } else {
        setFieldError("email", `Request error: ${error.message}`);
      }
    }
    
  };
  
  

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl text-blue-600 font-bold text-center mb-4">
          {isForgotPassword ? "Reset Password" : "Sign In"}
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={isForgotPassword ? forgotPasswordValidationSchema : loginValidationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-blue-500 text-sm font-medium">
                  Email Address
                </label>
                <Field type="email" name="email" id="email" className="w-full border rounded-md p-3 mt-1 text-sm" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label htmlFor="password" className="block text-blue-500 text-sm font-medium">
                  {isForgotPassword ? "New Password" : "Password"}
                </label>
                <Field type="password" name="password" id="password" className="w-full border rounded-md p-3 mt-1 text-sm" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              {isForgotPassword && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-blue-500 text-sm font-medium">
                    Confirm Password
                  </label>
                  <Field type="password" name="confirmPassword" id="confirmPassword" className="w-full border rounded-md p-3 mt-1 text-sm" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white p-2 rounded-md font-semibold hover:bg-blue-700 transition">
                {isForgotPassword ? "Reset Password" : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
        {!isForgotPassword && (
          <div className="mt-4 text-sm text-center">
            <p>
              Forgot your password?{" "}
              <button onClick={() => setIsForgotPassword(true)} className="text-blue-600 text-xl hover:underline">
                Reset password
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
