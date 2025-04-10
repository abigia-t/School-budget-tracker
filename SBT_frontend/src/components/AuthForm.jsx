import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import RoleRoute from "../config/RoleRoute";
import schoolImage from "../assets/school-budget-tracker.png";

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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const initialValues = { email: "", password: "", confirmPassword: "" };

  const onSubmit = async (values, { resetForm, setFieldError }) => {
    try {
      if (isForgotPassword) {
        const response = await axios.post("http://localhost:5000/api/actors/change-password", {
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        });

        toast.success(response.data.message);
        setIsForgotPassword(false);
        resetForm();
      } else {
        const response = await axios.post("http://localhost:5000/api/actors/login", {
          email: values.email,
          password: values.password,
        });

        if (response.data.message === "User doesn't exist.") {
          setFieldError("email", response.data.message);
        } else if (response.data.message === "Invalid password.") {
          setFieldError("password", response.data.message);
        } else {
          login(response.data.actor);
          const rolePath = RoleRoute[response.data.actor.role];
          if (rolePath) {
            navigate(rolePath);
          } else {
            toast.error("Invalid role detected. Redirecting to home.");
            navigate("/");
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
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1581090700227-1f9c1c62a631?auto=format&fit=crop&w=1650&q=80')`,
      }}
    >
      <div className="flex-grow flex justify-center items-center bg-gradient-to-r">
        <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white rounded-lg shadow-md overflow-hidden">
          {/* Form Section */}
          <div className="flex-grow p-8 md:w-1/2">
            <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {isForgotPassword ? "Reset Password" : "Sign In"}
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={isForgotPassword ? forgotPasswordValidationSchema : loginValidationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-blue-600 text-lg font-medium">
                      Email Address
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="w-full border-2 border-blue-200 rounded-lg p-3 mt-1 text-lg focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-blue-600 text-lg font-medium">
                      {isForgotPassword ? "New Password" : "Password"}
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className="w-full border-2 border-blue-200 rounded-lg p-3 mt-1 text-lg focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  {isForgotPassword && (
                    <div>
                      <label htmlFor="confirmPassword" className="block text-blue-600 text-lg font-medium">
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="w-full border-2 border-blue-200 rounded-lg p-3 mt-1 text-lg focus:outline-none focus:border-blue-500"
                      />
                      <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full p-3 rounded-lg font-semibold text-lg transition duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent border-2 border-blue-600 hover:border-purple-600"
                  >
                    {isForgotPassword ? "Reset Password" : "Sign In"}
                  </button>
                </Form>
              )}
            </Formik>

            {!isForgotPassword && (
              <div className="mt-6 text-lg text-center">
                <p>
                  Forgot your password?{" "}
                  <button
                    onClick={() => setIsForgotPassword(true)}
                    className="text-blue-600 hover:text-purple-600 hover:underline transition duration-300"
                  >
                    Reset password
                  </button>
                </p>
              </div>
            )}
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 h-64 md:h-auto relative">
            <img
              src={schoolImage}
              alt="School Budget Tracker"
              className="w-full h-full object-cover transition duration-300 ease-in-out hover:opacity-100 opacity-80"
            />
            <div className="absolute inset-0 bg-black opacity-20 hover:opacity-30 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
