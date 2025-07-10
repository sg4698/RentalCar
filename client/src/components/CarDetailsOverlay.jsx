export default function CarDetailsOverlay({ car }) {
  return (
    <div className="absolute bottom-10 right-10 bg-gray-800 bg-opacity-80 p-4 rounded-lg text-white w-64">
      <h3 className="font-semibold text-lg mb-2">Car Details:</h3>
      <p><strong>Doors:</strong> {car.doors || 'Four'}</p>
      <p><strong>Passengers:</strong> {car.seats}</p>
      <p><strong>Transmission:</strong> {car.transmission}</p>
      <p><strong>Fuel:</strong> {car.fuelType}</p>
      <button className="mt-4 bg-green-600 px-4 py-2 rounded w-full hover:bg-green-700">
        View All Details
      </button>
    </div>
  );
}
