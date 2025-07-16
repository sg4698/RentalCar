// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCars } from '../../features/cars/carSlice';
// import CarCard from '../../components/CarCard';

// export default function CarList() {
//   const dispatch = useDispatch();
//   const { cars, loading } = useSelector(state => state.car);
//   const [filter, setFilter] = useState("All");

//   useEffect(() => {
//     dispatch(fetchCars());
//   }, [dispatch]);

//   const filteredCars = filter === "All"
//     ? cars
//     : cars.filter(car => car.fuelType.toLowerCase() === filter.toLowerCase());

//   if (loading) return <p className="text-center mt-8">Loading cars...</p>;

//   return (
//     <div className="px-6 py-10">
//       <div className="flex justify-end gap-4 mb-6 flex-wrap">
//         {['All','Petrol', 'Diesel', 'Electric', 'Hybrid','CNG'].map(type => (
//           <button
//             key={type}
//             onClick={() => setFilter(type)}
//             className={`px-4 py-2 rounded-full text-sm border ${
//               filter === type
//                 ? 'bg-black text-white'
//                 : 'bg-white text-black hover:bg-gray-200'
//             }`}
//           >
//             {type}
//           </button>
//         ))}
//       </div>

//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
//         {filteredCars.map(car => (
//           <CarCard key={car._id} car={car} />
//         ))}
//       </div>

//       <div className="text-center mt-10">
//         <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-900">
//           View More
//         </button>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../features/cars/carSlice';
import CarCardPublic from '../../components/CarCarPublic'; // ✅ updated import

export default function CarList() {
  const dispatch = useDispatch();
  const { cars, loading } = useSelector(state => state.car);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const filteredCars = filter === "All"
    ? cars
    : cars.filter(car => car.fuelType.toLowerCase() === filter.toLowerCase());

  if (loading) return <p className="text-center mt-8">Loading cars...</p>;

  return (
    <div className="px-6 py-10">
      {/* Filter Buttons */}
      <div className="flex justify-end gap-4 mb-6 flex-wrap">
        {['All','Petrol', 'Diesel', 'Electric', 'Hybrid','CNG'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm border ${
              filter === type
                ? 'bg-black text-white'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Car Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredCars.map(car => (
          <CarCardPublic key={car._id} car={car} /> // ✅ using CarCardPublic
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-10">
        <button className="px-6 py-2 bg-black text-white rounded hover:bg-gray-900">
          View More
        </button>
      </div>
    </div>
  );
}
