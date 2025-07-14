// import { useNavigate } from 'react-router-dom';

// export default function CarCard({ car }) {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
//       <div className="relative">
//         <img
//           src={car.image?.url}
//           alt={car.car_name}
//           className="w-full h-48 object-cover"
//         />
//         {/* Labels */}
//         <div className="absolute top-2 left-2 flex flex-col gap-1">
//           <span className="bg-black text-white text-xs px-2 py-1 rounded">
//             {car.type}
//           </span>
//           <span className="bg-black text-white text-xs px-2 py-1 rounded">
//             {car.fuelType}
//           </span>
//         </div>
// {/* 
//         <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
//           Discount 15%
//         </span> */}
//       </div>

//       <div className="p-4">
//         <h3 className="font-semibold text-lg">{car.car_name}</h3>
//         <p className="text-sm text-gray-500 mb-2">
//           ${car.rentalPricePerDay} / per day
//         </p>

//         <div className="flex flex-wrap gap-2 text-xs mb-2">
//           <span className="bg-gray-100 px-2 py-1 rounded">{car.transmission}</span>
//           <span className="bg-gray-100 px-2 py-1 rounded">{car.fuelType}</span>
//           <span className="bg-gray-100 px-2 py-1 rounded">{car.seats} Seats</span>
//         </div>

//         <div className="flex justify-between items-center">
//           {/* Rating */}
//           <span className="text-sm bg-black text-white px-2 py-1 rounded">⭐ 4.5</span>

//           <button
//             onClick={() => navigate(`/cars/${car._id}`)}
//             className="bg-gray-800 text-white text-sm px-3 py-1 rounded hover:bg-gray-700"
//           >
//             View Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useNavigate } from "react-router-dom";

// export default function CarCard({ car, context = "public" }) {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
//       <div className="relative">
//         <img
//           src={car.image?.url}
//           alt={car.car_name}
//           className="w-full h-48 object-cover"
//         />
//         <div className="absolute top-2 left-2 flex flex-col gap-1">
//           <span className="bg-black text-white text-xs px-2 py-1 rounded">
//             {car.type}
//           </span>
//           <span className="bg-black text-white text-xs px-2 py-1 rounded">
//             {car.fuelType}
//           </span>
//         </div>
//       </div>

//       <div className="p-4">
//         <h3 className="font-semibold text-lg">{car.car_name}</h3>
//         <p className="text-sm text-gray-500 mb-2">
//           ₹{car.rentalPricePerDay} / per day
//         </p>

//         <div className="flex flex-wrap gap-2 text-xs mb-2">
//           <span className="bg-gray-100 px-2 py-1 rounded">{car.transmission}</span>
//           <span className="bg-gray-100 px-2 py-1 rounded">{car.fuelType}</span>
//           <span className="bg-gray-100 px-2 py-1 rounded">{car.seats} Seats</span>
//         </div>

//         {context === "carOwner" && (
//           <div className="mt-2 text-xs">
//             {car.isApproved ? (
//               <span className="text-green-600 font-medium">✅ Approved</span>
//             ) : car.rejectionReason ? (
//               <span className="text-red-600 font-medium">
//                 ❌ Rejected: {car.rejectionReason}
//               </span>
//             ) : (
//               <span className="text-yellow-600 font-medium">⏳ Pending Approval</span>
//             )}
//           </div>
//         )}

//         <div className="flex justify-between items-center mt-3">
//           <span className="text-sm bg-black text-white px-2 py-1 rounded">⭐ 4.5</span>
//           <button
//             onClick={() => navigate(`/cars/${car._id}`)}
//             className="bg-gray-800 text-white text-sm px-3 py-1 rounded hover:bg-gray-700"
//           >
//             View Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

export default function CarCard({ car, context = "public", onEdit, onDelete }) {
  const navigate = useNavigate();

  // Status badge rendering
  const renderStatus = () => {
    if (car.isApproved) {
      return (
        <span className="flex items-center gap-1 bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
          <FaCheckCircle className="text-green-600" /> Approved
        </span>
      );
    } else if (car.rejectionReason) {
      return (
        <span className="flex items-start gap-1 bg-red-100 text-red-800 text-xs px-3 py-1 rounded-md w-full max-w-[240px]">
          <FaTimesCircle className="mt-0.5 text-red-600" />
          <span className="line-clamp-2">
            Rejected: <strong>{car.rejectionReason}</strong>
          </span>
        </span>
      );
    } else {
      return (
        <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
          <FaClock className="text-yellow-600" /> Pending Approval
        </span>
      );
    }
  };

  // CAR OWNER UI
  if (context === "carOwner") {
    return (
      <div className="bg-white rounded-xl border shadow-sm hover:shadow-md transition p-4 flex flex-col gap-3">
        {/* Car Image */}
        <div className="relative w-full h-44 rounded-lg overflow-hidden">
          <img
            src={car.image?.url}
            alt={car.car_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">{car.type}</span>
            <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">{car.fuelType}</span>
          </div>
        </div>

        {/* Car Info */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">{car.car_name}</h2>
            <p className="text-sm text-gray-500">₹{car.rentalPricePerDay} / day</p>
            <div className="flex flex-wrap gap-2 mt-1 text-xs">
              <span className="bg-gray-100 px-2 py-1 rounded">{car.transmission}</span>
              <span className="bg-gray-100 px-2 py-1 rounded">{car.seats} Seats</span>
              <span className="bg-gray-100 px-2 py-1 rounded">{car.color}</span>
            </div>
          </div>
          <div>{renderStatus()}</div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-2">
          {car.rejectionReason ? (
            <div className="text-sm text-red-500 font-medium italic">
              No actions allowed
            </div>
          ) : (
            <div className="flex gap-2 text-sm">
              <button
                onClick={() => onEdit?.(car)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete?.(car)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          )}

          <button
            onClick={() => navigate(`/cars/${car._id}`)}
            className="text-sm underline text-gray-700 hover:text-black"
          >
            View Details
          </button>
        </div>
      </div>
    );
  }

  // PUBLIC UI
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
      <div className="relative">
        <img
          src={car.image?.url}
          alt={car.car_name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="bg-black text-white text-xs px-2 py-1 rounded">{car.type}</span>
          <span className="bg-black text-white text-xs px-2 py-1 rounded">{car.fuelType}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{car.car_name}</h3>
        <p className="text-sm text-gray-500 mb-2">₹{car.rentalPricePerDay} / per day</p>

        <div className="flex flex-wrap gap-2 text-xs mb-2">
          <span className="bg-gray-100 px-2 py-1 rounded">{car.transmission}</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{car.fuelType}</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{car.seats} Seats</span>
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className="text-sm bg-black text-white px-2 py-1 rounded">⭐ 4.5</span>
          <button
            onClick={() => navigate(`/cars/${car._id}`)}
            className="bg-gray-800 text-white text-sm px-3 py-1 rounded hover:bg-gray-700"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

