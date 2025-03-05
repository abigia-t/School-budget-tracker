import React from "react";
import Modal from "./Modal";

const ActorFormModal = ({
  isOpen,
  modalType,
  newActor,
  handleInputChange,
  handleModalClose,
  handleSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      title={modalType === "create" ? "Register New Actor" : "Update Actor"}
      onClose={handleModalClose}
      onSubmit={handleSubmit}
      submitButtonText={modalType === "create" ? "Save" : "Update"}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(newActor).map((key) => (
            <div key={key}>
              <label className="block text-gray-700">{key}</label>
              <input
                type={key === "password" ? "password" : "text"}
                name={key}
                value={newActor[key]}
                onChange={handleInputChange}
                className="border px-3 py-1 rounded w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ActorFormModal;
