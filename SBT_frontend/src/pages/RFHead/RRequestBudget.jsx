import React, { useState } from "react";
import Modal from "../../components/Modal";

const RRequestBudget = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Form submitted with values:", values);
    setSubmitting(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Request Budget</h1>
      <p className="text-gray-600 mb-4">Submit your budget request here.</p>
      
      <Modal
        isOpen={isModalOpen}
        title="Request Budget"
        onSubmit={handleSubmit}
        onClose={() => setIsModalOpen(false)}
        submitButtonText="Submit Request"
      />
    </div>
  );
};

export default RRequestBudget;
