import { useNavigate } from "react-router-dom";

const CarCardBase = ({ car, status, actions, ownerName }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
      {/* Car Image */}
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

      {/* Car Info */}
      <div className="p-4">
        {/* Owner Name */}
        {ownerName && (
          <p className="text-sm text-gray-700 font-semibold mb-1">
            Owner: <span className="font-bold">{ownerName}</span>
          </p>
        )}

        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-lg">{car.car_name}</h3>
          {status}
        </div>

        <p className="text-sm text-gray-500 mb-2">
          ₹{car.rentalPricePerDay} / per day
        </p>

        <div className="flex flex-wrap gap-2 text-xs mb-2">
          <span className="bg-gray-100 px-2 py-1 rounded">{car.transmission}</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{car.fuelType}</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{car.seats} Seats</span>
        </div>

        {/* Action Row: Edit/Delete Left + View Right */}
        <div className="flex justify-between items-center mt-4">
          <div>{actions}</div>
          <button
            onClick={() => navigate(`/cars/${car._id}`)}
            className="bg-gray-800 text-white text-sm px-3 py-1 rounded hover:bg-gray-700 transition"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCardBase;
