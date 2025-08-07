// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchApprovedCars } from "../../../../features/cars/adminCarSlice";
// import AdminCarCard from "../../../../components/AdminCarCard";

// const ApprovedCars = () => {
//   const dispatch = useDispatch();
//   const { approved, loading, error } = useSelector((state) => state.adminCar);

//   useEffect(() => {
//     dispatch(fetchApprovedCars())
//       .unwrap()
//       .then(data => console.log("✅ Fetched approved cars:", data))
//       .catch(err => console.error("❌ Error fetching approved cars:", err));
//   }, [dispatch]);

//   return (
//     <div className="p-4 sm:p-6 md:p-8">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">✅ Approved Cars</h2>

//       {loading && <p className="text-blue-600 text-center font-medium">Loading approved cars...</p>}
//       {error && <p className="text-red-500 text-center font-medium">Error: {error}</p>}

//       {!approved || approved.length === 0 ? (
//         <p className="text-gray-500 text-center mt-10 text-lg">No approved cars available.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {approved.map((car) => (
//             <AdminCarCard key={car._id} car={car} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ApprovedCars;


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApprovedCars } from "../../../../features/cars/adminCarSlice";
import CarTable from "../../../../components/CarTable";

const ApprovedCars = () => {
  const dispatch = useDispatch();
  const { approved, loading, error } = useSelector((state) => state.adminCar);

  useEffect(() => {
    dispatch(fetchApprovedCars())
      .unwrap()
      .then((data) => console.log("✅ Fetched approved cars:", data))
      .catch((err) => console.error("❌ Error fetching approved cars:", err));
  }, [dispatch]);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        ✅ Approved Cars
      </h2>

      {loading && (
        <p className="text-blue-600 text-center font-medium">
          Loading approved cars...
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center font-medium">Error: {error}</p>
      )}

      {!approved || approved.length === 0 ? (
        <p className="text-gray-500 text-center mt-10 text-lg">
          No approved cars available.
        </p>
      ) : (
        <CarTable cars={approved}  role="admin" />
      )}
    </div>
  );
};

export default ApprovedCars;
