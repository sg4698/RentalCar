// import { useState, useCallback } from 'react';
// import { useDispatch } from 'react-redux';
// import { createCar, fetchCars } from '../../features/cars/carSlice';
// import { useNavigate } from 'react-router-dom';
// import { showToast } from '../../utils/toast';
// import { RenderInput, RenderSelect } from '../../components/FormElement';

// export default function CreateCar() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const labelMap = {
//     car_name: "Car Name",
//     brand: "Brand",
//     registrationNumber: "Car Number",
//     color: "Color",
//     type: "Type",
//     seats: "Seating Capacity",
//     fuelType: "Fuel Type",
//     transmission: "Transmission",
//     mileage: "Mileage (km/l)",
//     rentalPricePerDay: "Price/Day (₹)",
//     location: "Location",
//   };

//   const dropdownOptions = {
//     type: ['car', '2 wheeler'],
//     fuelType: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'],
//     transmission: ['Manual', 'Auto'],
//   };

//   const [form, setForm] = useState({
//     car_name: '',
//     brand: '',
//     registrationNumber: '',
//     color: '',
//     type: '',
//     seats: '',
//     fuelType: '',
//     transmission: '',
//     mileage: '',
//     rentalPricePerDay: '',
//     location: '',
//   });

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = useCallback(e => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   }, []);

//   const handleFileChange = useCallback(e => {
//     const img = e.target.files[0];
//     setFile(img);
//     setPreview(URL.createObjectURL(img));
//   }, []);

//   const resetForm = () => {
//     setForm({
//       car_name: '',
//       brand: '',
//       registrationNumber: '',
//       color: '',
//       type: '',
//       seats: '',
//       fuelType: '',
//       transmission: '',
//       mileage: '',
//       rentalPricePerDay: '',
//       location: '',
//     });
//     setFile(null);
//     setPreview(null);
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => formData.append(key, value));
//     if (file) formData.append('image', file);

//     const result = await dispatch(createCar(formData));
//     setLoading(false);

//     if (result.meta.requestStatus === 'fulfilled') {
//       showToast("Car added successfully!");
//       resetForm();
//       await dispatch(fetchCars());
//       navigate("/cars");
//     } else {
//       showToast("Failed to add car", "error");
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white shadow-xl rounded-xl mt-10">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Add New Car</h1>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {Object.keys(form).filter(key => !['type', 'fuelType', 'transmission'].includes(key)).map(key => (
//           <RenderInput
//             key={key}
//             name={key}
//             value={form[key]}
//             onChange={handleChange}
//             type={['seats', 'mileage', 'rentalPricePerDay'].includes(key) ? 'number' : 'text'}
//             label={labelMap[key]}
//           />
//         ))}

//         {['type', 'fuelType', 'transmission'].map(key => (
//           <RenderSelect
//             key={key}
//             name={key}
//             value={form[key]}
//             onChange={handleChange}
//             options={dropdownOptions[key]}
//             label={labelMap[key]}
//           />
//         ))}

//         <div className="flex flex-col col-span-1 md:col-span-2">
//           <label className="text-sm font-medium text-gray-700 mb-1">Upload Car Image</label>
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="border border-gray-300 rounded-md py-2 px-4"
//             required
//           />
//         </div>

//         {preview && (
//           <div className="col-span-2 text-center">
//             <img src={preview} alt="Preview" className="mx-auto h-40 rounded-md shadow-md" />
//           </div>
//         )}

//         <div className="col-span-1 md:col-span-2 text-center mt-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className={`px-6 py-3 rounded-md font-semibold text-white transition duration-200 ${
//               loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//           >
//             {loading ? 'Submitting...' : 'Submit Car'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCar, fetchCars } from "../../features/cars/carSlice";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toast";
import CarForm from "../../components/CarForm";

export default function CreateCar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData) => {
    setLoading(true);
    const result = await dispatch(createCar(formData));
    setLoading(false);

    if (result.meta.requestStatus === "fulfilled") {
      showToast("Car added successfully!");
      await dispatch(fetchCars());
      navigate("/cars");
    } else {
      showToast("Failed to add car", "error");
    }
  };

  return (
    <CarForm
      onSubmit={handleCreate}
      submitLabel="Submit"
      loading={loading}
      title="Add New Car"
      cancelPath="/cars"
    />
  );
}
