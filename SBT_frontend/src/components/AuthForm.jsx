import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import RoleRoute from "../config/RoleRoute";
import ChangePasswordForm from "./ChangePasswordForm";
import schoolImage from "../assets/school-budget-tracker.png";

const AuthForm = () => {
  const { login, resetPassword } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values, { setFieldError }) => {
    const result = await login(values.email, values.password);

    if (result.requiresPasswordChange) {
      setUserEmail(values.email);
      setUserRole(result.role);
      setIsChangingPassword(true);
      return;
    }

    if (result.success) {
      navigate(RoleRoute[result.role] || "/");
    } else {
      setFieldError("email", result.message);
      toast.error(result.message);
    }
  };

  const handlePasswordChange = async (values) => {
    const result = await resetPassword(
      userEmail,
      values.newPassword,
      values.confirmPassword,
      userRole
    );

    if (result.success) {
      setIsChangingPassword(false);
      setUserEmail("");
      setUserRole("");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white rounded-lg shadow-md overflow-hidden">
        {/* Form Section */}
        <div className="flex-grow p-8 md:w-1/2">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isChangingPassword ? "Change Password" : "Sign In"}
          </h1>
          
          {isChangingPassword ? (
            <ChangePasswordForm
              onSubmit={handlePasswordChange}
              onCancel={() => {
                setIsChangingPassword(false);
                setUserEmail("");
                setUserRole("");
              }}
            />
          ) : (
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
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
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className="w-full border-2 border-blue-200 rounded-lg p-3 mt-1 text-lg focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full p-3 rounded-lg font-semibold text-lg transition duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-purple-600 hover:to-blue-600"
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>

        {/* Image Section - Now using the imported schoolImage */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src={schoolImage}
            alt="School Budget Tracker"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-20" />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;