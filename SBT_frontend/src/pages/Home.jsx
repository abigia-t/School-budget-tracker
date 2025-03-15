import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {toast} from "react-toastify"
import Modal from "../components/Modal";
import Title from "../components/Title";
import { assets, features } from "../assets/assets";
import NavBar from "../components/NavBar";

const Home = () => {
  const [isContactModalOpen, setContactModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:5000/api/contact-messages/send", {
          recipientType: "specific_actor", // Ensure the backend supports this
          recipientDetail: "systemadmin@actor.com",
          userName: values.name,
          userEmail: values.email,
          userMessage: values.message, // Match with backend
        });
    
        setContactModalOpen(false);
        toast("Message sent successfully!");
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send the message.");
      }
    }
  });

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Navigation Bar */}
      {/* Assuming you have a NavBar component */}
      <NavBar setContactModalOpen={setContactModalOpen} />

      {/* Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        title="Contact Us"
        onClose={() => setContactModalOpen(false)}
        onSubmit={formik.handleSubmit} // Pass formik handleSubmit
        submitButtonText="Send Message" // Optional dynamic button text
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-1xl font-medium">Your Name</label>
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                className="w-full text-black border rounded-lg px-3 py-2"
                placeholder="Enter your name"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-600 text-sm">{formik.errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-1xl font-medium">Your Email</label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                className="w-full text-black border rounded-lg px-3 py-2"
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-600 text-sm">{formik.errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-1xl font-medium">Message</label>
              <textarea
                name="message"
                onChange={formik.handleChange}
                value={formik.values.message}
                onBlur={formik.handleBlur}
                className="w-full text-black border rounded-lg px-3 py-2"
                rows="5"
                placeholder="Your message here..."
              />
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-600 text-sm">{formik.errors.message}</p>
              )}
            </div>
          </div>
        </form>
      </Modal>

      {/* Header Section */}
      <div id="home" className="bg-blue-950 text-white py-12 px-8 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold">
              Welcome to Yajeb Academy Budget Tracker
            </h1>
            <p className="text-lg md:text-xl mt-4 text-gray-300">
              Efficiently manage and monitor your school's budgets and resources
              with ease.
            </p>
          </div>
          <div className="flex justify-center">
            <img src={assets.getty_5} alt="Students engaged in learning" />
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div id="features" className="bg-gray-100 py-20 px-6">
        <Title title="Our Features" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md text-center"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="h-20 mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-white py-12 px-6">
        <Title title="About Yajeb Academy" />
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-8">
            Yajeb Academy is dedicated to providing quality education and
            ensuring efficient management of resources through innovative
            solutions like the Budget Tracker.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Home;
