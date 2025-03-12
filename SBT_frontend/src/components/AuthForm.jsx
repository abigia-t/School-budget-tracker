import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import RoleRoute from "../config/RoleRoute";

const AuthForm = () => {
  const { login } = useContext(StoreContext);
  const navigate = useNavigate();

  // Validation Schema
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });

  const initialValues = { email: "", password: "" };

  // Handle Login Submission
  const onSubmit = async (values, { resetForm, setFieldError }) => {
    try {
      const endpoint = values.email.includes("@actor")
        ? "http://localhost:5000/api/actors/login"
        : "http://localhost:5000/api/students/login";
  
      const { data } = await axios.post(endpoint, values);
      const user = data.actor || data.student;
  
      if (!user) {
        setFieldError("email", "Invalid credentials. Please try again.");
        return;
      }
  
      login(user); // Store user in context
      const rolePath = RoleRoute[user.role] || "/"; // Get role-based route
  
      toast.success("Login successful!");
      navigate(rolePath); // Redirect user
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      setFieldError("email", errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-2xl text-blue-600 font-bold text-center mb-6">Sign In</h1>

        <Formik initialValues={initialValues} validationSchema={loginValidationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-600 text-sm font-medium">
                  Email Address
                </label>
                <Field type="email" name="email" id="email" className="w-full border rounded-md p-3 mt-1 text-sm" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-600 text-sm font-medium">
                  Password
                </label>
                <Field type="password" name="password" id="password" className="w-full border rounded-md p-3 mt-1 text-sm" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white p-2 rounded-md font-semibold hover:bg-blue-700 transition">
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AuthForm;
