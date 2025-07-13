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


import { useNavigate } from "react-router-dom";

export default function CarCard({ car, context = "public" }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
      <div className="relative">
        <img
          src={car.image?.url}
          alt={car.car_name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="bg-black text-white text-xs px-2 py-1 rounded">
            {car.type}
          </span>
          <span className="bg-black text-white text-xs px-2 py-1 rounded">
            {car.fuelType}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{car.car_name}</h3>
        <p className="text-sm text-gray-500 mb-2">
          ₹{car.rentalPricePerDay} / per day
        </p>

        <div className="flex flex-wrap gap-2 text-xs mb-2">
          <span className="bg-gray-100 px-2 py-1 rounded">{car.transmission}</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{car.fuelType}</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{car.seats} Seats</span>
        </div>

        {context === "carOwner" && (
          <div className="mt-2 text-xs">
            {car.isApproved ? (
              <span className="text-green-600 font-medium">✅ Approved</span>
            ) : car.rejectionReason ? (
              <span className="text-red-600 font-medium">
                ❌ Rejected: {car.rejectionReason}
              </span>
            ) : (
              <span className="text-yellow-600 font-medium">⏳ Pending Approval</span>
            )}
          </div>
        )}

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
