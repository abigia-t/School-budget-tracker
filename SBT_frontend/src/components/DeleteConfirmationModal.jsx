import React from "react";
import Modal from "./Modal";

const DeleteConfirmationModal = ({ isOpen, actor, handleModalClose, handleDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      title="Delete"
      onClose={handleModalClose}
      onSubmit={handleDelete}
      submitButtonText="Delete"
    >
      <div className="text-center">
        <p>Are you sure you want to delete the actor {actor?.firstName}?</p>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
