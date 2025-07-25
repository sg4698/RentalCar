import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCarById } from "../features/cars/carSlice";

const CarDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { car, loading } = useSelector((state) => state.car);
  const { user, loading: userLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) dispatch(getCarById(id));
  }, [id, dispatch]);

  if (loading || userLoading) {
    return <p className="text-center mt-10 text-blue-500">Loading car details...</p>;
  }

  if (!car) {
    return <p className="text-center mt-10 text-gray-500">Car not found.</p>;
  }

  const role = user?.role;
  console.log(role)
  const showOwner = role === "admin";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{car.car_name}</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={car.image?.url || car.image || "/placeholder-car.jpg"}
          alt={car.car_name}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow"
        />

        <div className="flex-1 space-y-3 text-sm">
          <p><strong>Brand:</strong> {car.brand}</p>
          <p><strong>Type:</strong> {car.type}</p>
          <p><strong>Fuel Type:</strong> {car.fuelType}</p>
          <p><strong>Transmission:</strong> {car.transmission}</p>
          <p><strong>Seats:</strong> {car.seats}</p>
          <p><strong>Rental Price/Day:</strong> ₹{car.rentalPricePerDay}</p>
          <p><strong>Registration Number:</strong> {car.registrationNumber || "N/A"}</p>
          <p><strong>Location:</strong> {car.location || "N/A"}</p>
          <p><strong>Mileage:</strong> {car.mileage || "N/A"}</p>
          <p><strong>Color:</strong> {car.color || "N/A"}</p>

          {showOwner && (
            <>
              <p><strong>Owner Name:</strong> {car.ownerId?.name || "N/A"}</p>
              <p><strong>Email:</strong> {car.ownerId?.email || "N/A"}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
