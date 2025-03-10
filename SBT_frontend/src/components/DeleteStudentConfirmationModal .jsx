import React from "react";
import Modal from "./Modal";

const DeleteStudentConfirmationModal = ({ isOpen, student, handleModalClose, handleDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      title="Delete Student"
      onClose={handleModalClose}
      onSubmit={handleDelete}
      submitButtonText="Delete"
    >
      <div className="text-center">
        <p>Are you sure you want to delete the student {student?.firstName} {student?.lastName}?</p>
      </div>
    </Modal>
  );
};

export default DeleteStudentConfirmationModal;
