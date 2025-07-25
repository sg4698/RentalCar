// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchPendingCars,
//   approveCar,
//   rejectCar,
// } from "../../../../features/cars/adminCarSlice";
// import AdminCarCard from "../../../../components/AdminCarCard";

// const PendingCars = () => {
//   const dispatch = useDispatch();
//   const { pending, loading, error } = useSelector((state) => state.adminCar);

//   useEffect(() => {
//     dispatch(fetchPendingCars());
//   }, [dispatch]);

//   const handleApprove = (id) => {
//     dispatch(approveCar(id));
//   };

//   const handleReject = (id, reason) => {
//     dispatch(rejectCar({ id, reason }));
//   };

//   return (
//     <div className="p-4 sm:p-6 md:p-8">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">🚗 Pending Cars</h2>

//       {loading && <p className="text-blue-600 text-center font-medium">Loading pending cars...</p>}
//       {error && <p className="text-red-500 text-center font-medium">Error: {error}</p>}

//       {!pending || pending.length === 0 ? (
//         <p className="text-gray-500 text-center mt-10 text-lg">No pending cars available.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//           {pending.map((car) => (
//             <AdminCarCard
//               key={car._id}
//               car={car}
//               onApprove={handleApprove}
//               onReject={handleReject}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PendingCars;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingCars,
  approveCar,
  rejectCar,
} from "../../../../features/cars/adminCarSlice";
import CarTable from "../../../../components/CarTable";
import { toast } from "react-toastify";

const PendingCars = () => {

  const dispatch = useDispatch();
  const { pending, loading } = useSelector((state) => state.adminCar);
console.log(pending)
  useEffect(() => {
    dispatch(fetchPendingCars());
  }, [dispatch]);

  const handleApprove = async (id) => {
    await dispatch(approveCar(id));
    toast.success("Car approved");
    dispatch(fetchPendingCars());
  };

  const handleReject = async (id) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;
    await dispatch(rejectCar({ id, reason }));
    toast.error("Car rejected");
    dispatch(fetchPendingCars());
  };

  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Cars</h1>
      {loading ? <p>Loading...</p> : (
        <CarTable
          cars={pending}
          type="pending"
          onApprove={handleApprove}
          onReject={handleReject}
          role ="admin"
        />
      )}
    </div>
  );
};

export default PendingCars;
