

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getMyCars } from "../../../features/cars/carSlice";
// import CarCard from "../../../components/CarCard";

// const MyCars = () => {
//   const dispatch = useDispatch();
//   const { myCars, loading, error } = useSelector(state => state.car);

//   useEffect(() => {
//     dispatch(getMyCars());
//   }, [dispatch]);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">My Cars</h1>

//       {loading && <p className="text-blue-500">Loading...</p>}
//       {error && <p className="text-red-500">Error: {error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {myCars?.length > 0 ? (
//           myCars.map(car => <CarCard key={car._id} car={car} context="carOwner" />)
//         ) : (
//           <p>No cars found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyCars;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCars, deleteCar } from "../../../features/cars/carSlice";
import CarCard from "../../../components/CarCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyCars = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myCars, loading, error } = useSelector((state) => state.car);

  const [filter, setFilter] = useState("All");

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

  // Filter logic
  const filteredCars = myCars?.filter((car) => {
    if (filter === "All") return true;
    if (filter === "Approved") return car.isApproved;
    if (filter === "Pending") return !car.isApproved && !car.rejectionReason;
    if (filter === "Rejected") return !car.isApproved && car.rejectionReason;
    return true;
  });

  return (
    <div className="p-6 bg-white-50 min-h-screen">
      {/* Header with Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">🚗 My Cars</h1>

        <div className="flex items-center gap-4">
          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white text-gray-700 shadow-sm focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* States */}
      {loading && <div className="text-center text-blue-600 font-medium">Loading cars...</div>}
      {error && <div className="text-center text-red-600 font-medium">Error: {error}</div>}

      {/* Car Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars?.length > 0 ? (
          filteredCars.map((car) => (
            <CarCard
              key={car._id}
              car={car}
              context="carOwner"
              onEdit={() => handleEdit(car)}
              onDelete={() => handleDelete(car._id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center mt-20">
            <p className="text-gray-500 text-lg">No cars found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCars;


