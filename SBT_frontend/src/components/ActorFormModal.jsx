import React, { useState } from "react";
import Modal from "./Modal";

const ActorFormModal = ({
  isOpen,
  modalType,
  newActor,
  handleInputChange,
  handleModalClose,
  handleSubmit,
}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    if (!newActor.firstName.trim()) tempErrors.firstName = "First Name is required";
    if (!newActor.lastName.trim()) tempErrors.lastName = "Last Name is required";
    if (!newActor.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(newActor.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!newActor.password.trim()) {
      tempErrors.password = "Password is required";
    } else if (newActor.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long";
    }
    if (!newActor.phoneNumber.trim()) {
      tempErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(newActor.phoneNumber)) {
      tempErrors.phoneNumber = "Invalid phone number (must be 10 digits)";
    }
    if (!newActor.address.trim()) tempErrors.address = "Address is required";
    if (!newActor.role.trim()) tempErrors.role = "Role is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={modalType === "create" ? "Register New Actor" : "Update Actor"}
      onClose={handleModalClose}
      onSubmit={handleFormSubmit}
      submitButtonText={modalType === "create" ? "Save" : "Update"}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(newActor).map((key) => (
            <div key={key}>
              <label className="block text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type={key === "password" ? "password" : "text"}
                name={key}
                value={newActor[key]}
                onChange={handleInputChange}
                className={`border px-3 py-1 rounded w-full ${errors[key] ? "border-red-500" : ""}`}
              />
              {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ActorFormModal;
