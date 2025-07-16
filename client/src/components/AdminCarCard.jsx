// import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import CarCardBase from "./CarCardBase";

// const renderStatusBadge = (car) => {
//   if (car.isApproved) {
//     return (
//       <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
//         <FaCheckCircle className="text-green-600 text-sm" /> Approved
//       </span>
//     );
//   }

//   if (car.rejectionReason) {
//     return (
//       <span className="inline-flex items-start gap-1 bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-md max-w-[240px] shadow-sm">
//         <FaTimesCircle className="text-red-600 mt-0.5" />
//         <span className="line-clamp-2">
//           Rejected: <strong>{car.rejectionReason}</strong>
//         </span>
//       </span>
//     );
//   }

//   return (
//     <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
//       <FaClock className="text-yellow-600 text-sm" /> Pending
//     </span>
//   );
// };

// export default function AdminCarCard({ car, onApprove, onReject, onViewReason }) {
//   const navigate = useNavigate();

//   const actions = car.rejectionReason ? (
//     <div className="mt-4">
//       <button
//         onClick={() => onViewReason?.(car.rejectionReason)}
//         className="px-4 py-1.5 bg-red-100 text-red-700 font-medium rounded-md shadow-sm hover:bg-red-200 transition"
//       >
//         View Reason
//       </button>
//     </div>
//   ) : !car.isApproved ? (
//     <div className="flex flex-wrap gap-2 text-sm mt-4">
//       <button
//         onClick={() => onApprove?.(car._id)}
//         className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all shadow-sm"
//       >
//         Approve
//       </button>
//       <button
//         onClick={() => {
//           const reason = prompt("Enter rejection reason:");
//           if (reason) onReject?.(car._id, reason);
//         }}
//         className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-sm"
//       >
//         Reject
//       </button>
//     </div>
//   ) : (
//     <div className="italic text-gray-500 text-sm mt-3">No actions allowed</div>
//   );

//   return (
//     <CarCardBase
//       car={car}
//       statusBadge={renderStatusBadge(car)}
//       actions={actions}
//       ownerName={car.ownerId?.name}
//       onClick={() => navigate(`/cars/${car._id}`)}
//     />
//   );
// }

import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CarCardBase from "./CarCardBase";

const renderStatusBadge = (car) => {
  if (car.isApproved) {
    return (
      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
        <FaCheckCircle className="text-green-600 text-sm" /> Approved
      </span>
    );
  }

  if (car.rejectionReason) {
    return (
      <span className="inline-flex items-start gap-1 bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-md max-w-[240px] shadow-sm">
        <FaTimesCircle className="text-red-600 mt-0.5" />
        <span className="line-clamp-2">
          Rejected: <strong>{car.rejectionReason}</strong>
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
      <FaClock className="text-yellow-600 text-sm" /> Pending
    </span>
  );
};

export default function AdminCarCard({ car, onApprove, onReject, onViewReason }) {
  const navigate = useNavigate();

  const actions = car.rejectionReason ? (
    <div className="flex justify-between items-center gap-2 mt-4">
      <button
        onClick={() => onViewReason?.(car.rejectionReason)}
        className="px-3 py-1.4 bg-red-100 text-red-600 font-medium rounded-md hover:bg-red-200 border border-red-300 transition shadow-sm mb-3"
      >
        View Reason
      </button>
    </div>
  ) : !car.isApproved ? (
    <div className="flex gap-2 text-sm mt-4">
      <button
        onClick={() => onApprove?.(car._id)}
        className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all shadow-sm"
      >
        Approve
      </button>
      <button
        onClick={() => {
          const reason = prompt("Enter rejection reason:");
          if (reason) onReject?.(car._id, reason);
        }}
        className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-sm"
      >
        Reject
      </button>
    </div>
  ) : (
    <div className="italic text-gray-500 text-sm mt-3">No actions allowed</div>
  );

  return (
    <CarCardBase
      car={car}
      statusBadge={renderStatusBadge(car)}
      actions={actions}
      ownerName={car.ownerId?.name}
      onClick={() => navigate(`/cars/${car._id}`)}
    />
  );
}
