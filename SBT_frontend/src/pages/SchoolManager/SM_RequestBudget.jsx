import React, { useState } from 'react';
import Modal from '../../components/Modal'; // Adjust path if needed

function SM_RequestBudget() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Request for Approval</h2>
      <button onClick={openModal}>Open Request Budget Modal</button>
      <Modal
        isOpen={isModalOpen}
        title="Request for Approval"
        onClose={closeModal}
        submitButtonText="Submit Request"
      />
    </div>
  );
}

export default SM_RequestBudget;