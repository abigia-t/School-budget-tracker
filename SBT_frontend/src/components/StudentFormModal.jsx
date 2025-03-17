/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const StudentFormModal = ({
  isOpen,
  modalType,
  currentStudent,
  handleModalClose,
  handleSubmit,
}) => {
  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    grade: "",
  });

  useEffect(() => {
    if (modalType === "edit" && currentStudent) {
      setFormData({
        studentId: currentStudent.studentId,
        firstName: currentStudent.firstName,
        middleName: currentStudent.middleName,
        lastName: currentStudent.lastName,
        email: currentStudent.email,
        password: "", // Don't show the current password
        phoneNumber: currentStudent.phoneNumber,
        address: currentStudent.address,
        grade: currentStudent.grade,
      });
    }
  }, [modalType, currentStudent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96 mt-10">
        <h3 className="text-xl font-semibold mb-4">
          {modalType === "create" ? "Add Student" : "Edit Student"}
        </h3>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label htmlFor="studentId" className="block text-sm font-medium">
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="firstName" className="block text-sm font-medium">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="middleName" className="block text-sm font-medium">
              Middle Name
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {modalType === "create" && (
            <div className="col-span-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Grade Selection */}
          <div className="col-span-2">
            <label htmlFor="grade" className="block text-sm font-medium">
              Grade
            </label>
            <select
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="KG1">KG1</option>
              <option value="KG2">KG2</option>
              <option value="KG3">KG3</option>
              <option value="Grade1">Grade 1</option>
              <option value="Grade2">Grade 2</option>
              <option value="Grade3">Grade 3</option>
              <option value="Grade4">Grade 4</option>
              <option value="Grade5">Grade 5</option>
              <option value="Grade6">Grade 6</option>
            </select>
          </div>

          <div className="col-span-2 flex justify-between">
            <button
              type="button"
              onClick={handleModalClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {modalType === "create" ? "Register" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default StudentFormModal;
