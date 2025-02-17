import React from "react";

const Modal = ({ isOpen, title, children, onSubmit, onClose }) => {
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
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            type="submit"
            className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-900"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
