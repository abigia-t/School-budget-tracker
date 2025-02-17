import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup for validation

const AccountForm = () => {
  const [isSignIn, setIsSignIn] = useState(true); // Toggle between Sign In and Create Account

  // Validation schema for Sign In
  const signInValidationSchema = Yup.object({
    username: Yup.string().required("Email or Username is required"),
    password: Yup.string().required("Password is required"),
  });

  // Validation schema for Create Account
  const createAccountValidationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone Number is required"),
    role: Yup.string().required("Role is required"),
    address: Yup.string().required("Address is required"),
  });

  // Form submission logic
  const handleSubmit = (values, { resetForm }) => {
    if (isSignIn) {
      console.log("Logging in with:", values);
    } else {
      console.log("Creating Account with:", values);
    }
    resetForm();
  };

  const toggleForm = () => setIsSignIn(!isSignIn);

  return (
    <div className="flex flex-col items-center p-3 bg-white rounded shadow-md w-96">
      <h2 className="text-xl font-bold mb-4">{isSignIn ? "Sign In" : "Create Account"}</h2>

      <Formik
        initialValues={{
          name: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
          phone: "",
          role: "",
          address: "",
        }}
        validationSchema={isSignIn ? signInValidationSchema : createAccountValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className=" text-black w-full">
            {/* Conditional Fields for Create Account */}
            {!isSignIn && (
              <>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="p-2 border rounded w-full"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-3">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="p-2 border rounded w-full"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-3">
                  <Field
                    type="password"
                    name="password"
                    placeholder="New Password"
                    className="p-2 border rounded w-full"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-3">
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="p-2 border rounded w-full"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="p-2 border rounded w-full"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-3">
                  <Field
                    as="select"
                    name="role"
                    className="p-2 border rounded w-full"
                  >
                    <option value="">Select Role</option>
                    <option value="parent">Parent</option>
                    <option value="system_admin">System Admin</option>
                  </Field>
                  <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="p-2 border rounded w-full"
                  />
                  <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                </div>
              </>
            )}

            {/* Fields for Sign In */}
            {isSignIn && (
              <>
                <div className="mb-3">
                  <Field
                    type="text"
                    name="username"
                    placeholder="Email or Username"
                    className="p-2 border rounded w-full"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mb-3">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="p-2 border rounded w-full"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="text-right">
                  <button className="text-blue-500 text-sm underline">Forgot Password?</button>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-2 bg-blue-500 text-white text-xl rounded hover:bg-blue-600"
            >
              {isSignIn ? "Sign In" : "Create Account"}
            </button>
          </Form>
        )}
      </Formik>

      <p className="text-sm text-black mt-4">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={toggleForm}
          className="text-blue-500 text-xl underline"
        >
          {isSignIn ? " Create Account" : " Sign in"}
        </button>
      </p>
    </div>
  );
};

export default AccountForm;
