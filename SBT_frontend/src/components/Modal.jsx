import React from "react";

const Modal = ({isOpen, title, children, onSubmit, onClose, submitButtonText,}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-bold text-black">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black font-semibold"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-6">{children}</div>

        {/* Modal Footer */}
        <div className="mt-6 flex justify-around">
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 font-semibold py-2 px-4 rounded-md border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
          >
            {submitButtonText || "Submit"} {/* Dynamic button text */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;