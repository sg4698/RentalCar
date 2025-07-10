// import carImage from '../assets/hero-car.jpg';

// export default function Hero() {
//   return (
//     <div
//       className="relative h-[90vh] bg-cover bg-center text-white flex items-center justify-center"
//       style={{ backgroundImage: `url(${carImage})` }}
//     >
//       <div className="absolute inset-0 bg-black opacity-50" />

//       <div className="relative z-10 text-center max-w-3xl">
//         <div className="flex justify-center gap-4 mb-4">
//           <button className="bg-gray-700 px-4 py-1 rounded">ELECTRICAL</button>
//           <button className="bg-gray-700 px-4 py-1 rounded">LUXURY</button>
//         </div>
//         <h1 className="text-4xl md:text-5xl font-bold mb-2">VOLVO SUPER MODEL 310</h1>
//         <p className="mb-6 text-lg text-gray-200">Explore premium electric cars ready for your next ride.</p>
//         <div className="flex justify-center gap-6 items-center text-lg font-medium">
//           <span className="text-green-400 text-2xl">$345</span>
//           <span className="text-white">/ day</span>
//           <span className="text-sm">| USA | <span className="text-green-400">Available</span></span>
//         </div>

//         <div className="mt-6 flex gap-4 justify-center">
//           <span className="bg-green-600 px-4 py-2 rounded text-sm">Discount 15%</span>
//           <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-100 text-sm">
//             Add to Wishlist
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useSelector } from 'react-redux';

export default function Hero() {
  const { cars, loading } = useSelector((state) => state.car);

  const featuredCar = cars[0]; // Display first available car

  if (loading || !featuredCar) {
    return (
      <div className="h-[90vh] flex justify-center items-center text-white bg-gray-900 text-2xl">
        Loading car details...
      </div>
    );
  }

  const {
    car_name,
    brand,
    fuelType,
    type,
    seats,
    rentalPricePerDay,
    location,
    image,
  } = featuredCar;

  return (
    <div
      className="relative h-[90vh] bg-cover bg-center text-white flex items-center justify-center"
      style={{ backgroundImage: `url(${image?.url})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />

      <div className="relative z-10 text-center max-w-3xl">
        <div className="flex justify-center gap-4 mb-4">
          <button className="bg-gray-700 px-4 py-1 rounded">{fuelType}</button>
          <button className="bg-gray-700 px-4 py-1 rounded">{type}</button>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-2">{car_name}</h1>
        <p className="mb-6 text-lg text-gray-200">
          {brand} • {seats} Seater • {fuelType} Vehicle
        </p>

        <div className="flex justify-center gap-6 items-center text-lg font-medium">
          <span className="text-green-400 text-2xl">${rentalPricePerDay}/day</span>
 
          <span className="text-sm text-green-400">
            | {location || 'Location'} | <span className="text-green-400">Available</span>
          </span>
        </div>

        <div className="mt-6 flex gap-4 justify-center">
          {/* <span className="bg-green-600 px-4 py-2 rounded text-sm">Discount 15%</span> */}
          <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-100 text-sm">
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
