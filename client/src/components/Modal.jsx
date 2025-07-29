// src/components/common/Modal.js
import { Fragment } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white-blur bg-opacity-30">
      <div className="relative bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg">
        {/* Close Icon (X) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Close Modal"
        >
          &times;
        </button>

        {/* Title */}
        {title && <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>}

        {/* Content */}
        <div>{children}</div>

        {/* Close Button at Bottom */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
