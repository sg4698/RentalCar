// import React from 'react'

// export default function Mycars() {
//   return (
//     <div>
//       <h1>MycARS</h1>
//     </div>
//   )
// }

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCars } from "../../../features/cars/carSlice";
import CarCard from "../../../components/CarCard";

const MyCars = () => {
  const dispatch = useDispatch();
  const { myCars, loading, error } = useSelector(state => state.car);

  useEffect(() => {
    dispatch(getMyCars());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Cars</h1>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCars?.length > 0 ? (
          myCars.map(car => <CarCard key={car._id} car={car} context="carOwner" />)
        ) : (
          <p>No cars found.</p>
        )}
      </div>
    </div>
  );
};

export default MyCars;
