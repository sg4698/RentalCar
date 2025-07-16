import { useState } from "react";
import CarCardBase from "./CarCardBase";
import { FaClock, FaTimesCircle } from "react-icons/fa";

const CarCardOwner = ({ car, onEdit, onDelete }) => {
  const [showReason, setShowReason] = useState(false);

  const renderStatus = () => {
    if (!car.isApproved && !car.rejectionReason) {
      return (
        <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
          <FaClock className="text-yellow-600" /> Pending Approval
        </span>
      );
    }

    if (!car.isApproved && car.rejectionReason) {
      return (
        <div className="flex flex-col items-end">
          <button
            className="text-xs text-red-600 font-semibold underline hover:text-red-800"
            onClick={() => setShowReason((prev) => !prev)}
          >
            Reject
          </button>

          {showReason && (
            <div className="mt-1 bg-red-100 text-red-800 text-xs p-2 rounded-md max-w-xs shadow">
              <FaTimesCircle className="inline mr-1 text-red-600" />
              <strong>Reason:</strong> {car.rejectionReason}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const actions = car.rejectionReason ? (
    <div className="text-sm text-red-500 font-medium italic">No actions allowed</div>
  ) : (
    <div className="flex gap-2 text-sm mt-3">
      <button
        onClick={() => onEdit?.(car)}
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete?.(car)}
        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition"
      >
        Delete
      </button>
    </div>
  );

  return (
    <CarCardBase
      car={car}
      status={renderStatus()}
      actions={actions}
      showBottomButton
    />
  );
};

export default CarCardOwner;
