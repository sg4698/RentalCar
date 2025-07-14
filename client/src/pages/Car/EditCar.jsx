// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import { getCarById, updateCar } from "../../features/cars/carSlice";
// import { toast } from "react-toastify";

// const EditCar = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { car, loading } = useSelector((state) => state.car);

//   const [form, setForm] = useState({
//     car_name: "",
//     brand: "",
//     registrationNumber: "",
//     color: "",
//     type: "",
//     seats: "",
//     fuelType: "",
//     transmission: "",
//     mileage: "",
//     rentalPricePerDay: "",
//     location: "",
//   });

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);

//   // Fetch car by ID
//   useEffect(() => {
//     dispatch(getCarById(id));
//   }, [dispatch, id]);

//   // Populate form when car is loaded
//   useEffect(() => {
//     if (car && car._id === id) {
//       setForm({
//         car_name: car.car_name || "",
//         brand: car.brand || "",
//         registrationNumber: car.registrationNumber || "",
//         color: car.color || "",
//         type: car.type || "",
//         seats: car.seats || "",
//         fuelType: car.fuelType || "",
//         transmission: car.transmission || "",
//         mileage: car.mileage || "",
//         rentalPricePerDay: car.rentalPricePerDay || "",
//         location: car.location || "",
//       });
//       setPreview(car.image?.url || null);
//     }
//   }, [car, id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     if (image) {
//       formData.append("image", image);
//     }

//     try {
//       await dispatch(updateCar({ id, formData })).unwrap();
//       toast.success("Car updated successfully");
//       navigate("/dashboard/owner/my-cars");
//     } catch (err) {
//       toast.error("Failed to update car",err);
//     }
//   };

//   if (loading || !car || car._id !== id) {
//     return <div className="text-center mt-10 text-gray-500 text-lg">Loading car data...</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-semibold mb-4">Edit Car</h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <input
//           type="text"
//           name="car_name"
//           value={form.car_name}
//           onChange={handleChange}
//           placeholder="Car Name"
//           className="border px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="brand"
//           value={form.brand}
//           onChange={handleChange}
//           placeholder="Brand"
//           className="border px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="registrationNumber"
//           value={form.registrationNumber}
//           onChange={handleChange}
//           placeholder="Registration Number"
//           className="border px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="color"
//           value={form.color}
//           onChange={handleChange}
//           placeholder="Color"
//           className="border px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="type"
//           value={form.type}
//           onChange={handleChange}
//           placeholder="Type (e.g. SUV)"
//           className="border px-3 py-2 rounded"
//         />
//         <input
//           type="number"
//           name="seats"
//           value={form.seats}
//           onChange={handleChange}
//           placeholder="Seats"
//           className="border px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="fuelType"
//           value={form.fuelType}
//           onChange={handleChange}
//           placeholder="Fuel Type"
//           className="border px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="transmission"
//           value={form.transmission}
//           onChange={handleChange}
//           placeholder="Transmission"
//           className="border px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="mileage"
//           value={form.mileage}
//           onChange={handleChange}
//           placeholder="Mileage"
//           className="border px-3 py-2 rounded"
//         />
//         <input
//           type="number"
//           name="rentalPricePerDay"
//           value={form.rentalPricePerDay}
//           onChange={handleChange}
//           placeholder="Price Per Day"
//           className="border px-3 py-2 rounded"
//         />
//         <input
//           type="text"
//           name="location"
//           value={form.location}
//           onChange={handleChange}
//           placeholder="Location"
//           className="border px-3 py-2 rounded"
//         />

//         <div className="col-span-1 sm:col-span-2 mt-4">
//           <label className="block mb-1 font-medium">Upload New Image (optional)</label>
//           <input type="file" onChange={handleImage} accept="image/*" />
//           {preview && (
//             <img
//               src={preview}
//               alt="Preview"
//               className="mt-3 w-48 h-32 object-cover rounded border"
//             />
//           )}
//         </div>

//         <div className="col-span-1 sm:col-span-2">
//           <button
//             type="submit"
//             className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4"
//           >
//             Update Car
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditCar;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById, updateCar } from "../../features/cars/carSlice";
import { toast } from "react-toastify";
import CarForm from "../../components/CarForm";

const EditCar = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { car, loading } = useSelector((state) => state.car);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getCarById(id));
  }, [dispatch, id]);

  const handleUpdate = async (formData) => {
    try {
      setSubmitting(true);
      await dispatch(updateCar({ id, formData })).unwrap();
      toast.success("Car updated successfully");
      navigate("/dashboard/owner/my-cars");
    } catch (err) {
      toast.error("Failed to update car",err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !car || car._id !== id) {
    return <div className="text-center mt-10 text-gray-500 text-lg">Loading car data...</div>;
  }

  return (
    <CarForm
      initialData={car}
      onSubmit={handleUpdate}
      submitLabel="Update"
      loading={submitting}
      title="Edit Car"
      cancelPath="/dashboard/owner/my-cars"
    />
  );
};

export default EditCar;

