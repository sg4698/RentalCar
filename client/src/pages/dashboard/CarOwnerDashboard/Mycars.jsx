import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCars, deleteCar } from "../../../features/cars/carSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CarTable from "../../../components/CarTable"; // ✅ Reusable Car Table

const MyCars = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myCars, loading, error } = useSelector((state) => state.car);

  const [filter, setFilter] = useState("Approved"); // ✅ Default filter

  useEffect(() => {
    dispatch(getMyCars());
  }, [dispatch]);

  const handleEdit = (car) => {
    navigate(`/dashboard/owner/update-car/${car._id}`);
  };

  const handleDelete = async (carId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await dispatch(deleteCar(carId)).unwrap();
        toast.success("Car deleted successfully");
        dispatch(getMyCars());
      } catch (err) {
        toast.error("Failed to delete car: " + err);
      }
    }
  };

  // ✅ Filter logic based on status
  const filteredCars = myCars?.filter((car) => {
    if (filter === "Approved") return car.status === "approved";
    if (filter === "Pending") return car.status === "pending";
    if (filter === "Rejected") return car.status === "rejected";
    return true;
  });

  return (
    <div className="p-6 bg-white-50 min-h-screen">
      {/* Header with Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">🚗 My Cars</h1>

        <div className="flex items-center gap-4">
          {/* ✅ Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white text-gray-700 shadow-sm focus:outline-none"
          >
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="text-center text-blue-600 font-medium">
          Loading cars...
        </div>
      )}
      {error && (
        <div className="text-center text-red-600 font-medium">
          Error: {error}
        </div>
      )}

      {/* ✅ Car Table Integration */}
      {filteredCars?.length > 0 ? (
        <CarTable
          cars={filteredCars}
          role="carOwner"
          onEdit={handleEdit}
          onDelete={handleDelete}
          showStatus
        />
      ) : (
        <div className="col-span-full text-center mt-20">
          <p className="text-gray-500 text-lg">
            No cars found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyCars;
