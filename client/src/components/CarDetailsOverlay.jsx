import { useNavigate } from "react-router-dom";

export default function CarDetailsOverlay({ car }) {
   const navigate = useNavigate();

      const handleViewDetails = () => {
    navigate(`/car/${car._id}`);
  };
  return (
    <div className="absolute bottom-10 right-10 bg-gray-900/80 backdrop-blur-md p-5 rounded-xl text-white w-72 shadow-lg space-y-2">
      <h3 className="font-semibold text-xl">Car Details</h3>
      <div className="text-sm space-y-1">
        <p>
          <span className="font-medium">Doors:</span>{" "}
          {car.doors || "Four"}
        </p>
        <p>
          <span className="font-medium">Passengers:</span>{" "}
          {car.seats || "N/A"}
        </p>
        <p>
          <span className="font-medium">Transmission:</span>{" "}
          {car.transmission || "Manual"}
        </p>
        <p>
          <span className="font-medium">Fuel:</span>{" "}
          {car.fuelType || "Petrol"}
        </p>
      </div>

           <button
            onClick={handleViewDetails}
            className="block text-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            View Details
          </button>
    </div>
  );
}
