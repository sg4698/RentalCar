import React from "react";

const RejectionReasonModal = ({ isOpen, onClose, reason }) => {
  if (!isOpen) return null;

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10">
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold text-red-600 mb-2">Rejection Reason</h2>
        <p className="text-sm text-gray-700">{reason}</p>
        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectionReasonModal;
