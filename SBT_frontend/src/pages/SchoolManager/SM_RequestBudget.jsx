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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '300px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Request for Approval</h2>
      <button
        onClick={openModal}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Open Request Budget
      </button>
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