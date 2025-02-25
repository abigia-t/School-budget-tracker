import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AuthForm = ({ onLoginSuccess }) => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // Validation schema for Login
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  // Validation schema for Forgot Password
  const forgotPasswordValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Submit handler
  const onSubmit = (values, { resetForm }) => {
    if (isForgotPassword) {
      // Simulate password reset process
      alert(`Password reset successfully for: ${values.email}`);
      setIsForgotPassword(false); // Redirect back to login form
    } else {
      // Simulate login process
      alert(`Logged in as: ${values.email}`);
      if (onLoginSuccess) onLoginSuccess(); // Callback for successful login
    }
    resetForm();
  };

  return (
    <div className=" min-h-screen flex justify-center items-center bg-white">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl text-blue-600 font-bold text-center mb-4">
          {isForgotPassword ? "Reset Password" : "Sign In"}
        </h1>

        <Formik
          initialValues={initialValues}
          validationSchema={
            isForgotPassword
              ? forgotPasswordValidationSchema
              : loginValidationSchema
          }
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-blue-500 text-sm font-medium"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full border rounded-md p-2 mt-1 text-sm"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-blue-500 text-sm font-medium"
                >
                  {isForgotPassword ? "New Password" : "Password"}
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full border rounded-md p-2 mt-1 text-sm"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Confirm Password Field (Only visible in Forgot Password mode) */}
              {isForgotPassword && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-blue-500 text-sm font-medium"
                  >
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="w-full border rounded-md p-2 mt-1 text-sm"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white p-2 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                {isForgotPassword ? "Reset Password" : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Footer Links */}
        <div className="mt-4 text-sm text-center">
          {isForgotPassword ? (
            <p>
              Remembered your password?{" "}
              <button
                onClick={() => setIsForgotPassword(false)}
                className="text-blue-600 text-xl hover:underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Forgot your password?{" "}
              <button
                onClick={() => setIsForgotPassword(true)}
                className="text-blue-600 text-xl hover:underline"
              >
                Reset Password
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
