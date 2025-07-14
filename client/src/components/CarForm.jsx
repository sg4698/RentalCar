// import { useCallback, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { RenderInput, RenderSelect } from "./FormElement";

// const labelMap = {
//   car_name: "Car Name",
//   brand: "Brand",
//   registrationNumber: "Car Number",
//   color: "Color",
//   type: "Type",
//   seats: "Seating Capacity",
//   fuelType: "Fuel Type",
//   transmission: "Transmission",
//   mileage: "Mileage (km/l)",
//   rentalPricePerDay: "Price/Day (₹)",
//   location: "Location",
// };

// const dropdownOptions = {
//   type: ["car", "2 wheeler"],
//   fuelType: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"],
//   transmission: ["Manual", "Auto"],
// };

// export default function CarForm({
//   initialData = {},
//   onSubmit,
//   submitLabel = "Submit",
//   loading = false,
//   title = "Add New Car",
//   cancelPath = "/dashboard/owner/my-cars",
// }) {
//   const navigate = useNavigate();

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
//     ...initialData,
//   });

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(initialData?.image?.url || null);

//   // Reset form on unmount/mount
//   useEffect(() => {
//     return () => {
//       setForm({});
//       setFile(null);
//       setPreview(null);
//     };
//   }, []);

//   const handleChange = useCallback((e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   }, []);

//   const handleFileChange = useCallback((e) => {
//     const img = e.target.files[0];
//     setFile(img);
//     setPreview(URL.createObjectURL(img));
//   }, []);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) =>
//       formData.append(key, value)
//     );
//     if (file) formData.append("image", file);

//     await onSubmit(formData);
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white shadow-xl rounded-xl mt-10">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
//         {title}
//       </h1>

//       <form
//         onSubmit={handleFormSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-6"
//       >
//         {Object.keys(form)
//           .filter((key) => !["type", "fuelType", "transmission"].includes(key))
//           .map((key) => (
//             <RenderInput
//               key={key}
//               name={key}
//               value={form[key]}
//               onChange={handleChange}
//               type={
//                 ["seats", "mileage", "rentalPricePerDay"].includes(key)
//                   ? "number"
//                   : "text"
//               }
//               label={labelMap[key]}
//             />
//           ))}

//         {["type", "fuelType", "transmission"].map((key) => (
//           <RenderSelect
//             key={key}
//             name={key}
//             value={form[key]}
//             onChange={handleChange}
//             options={dropdownOptions[key]}
//             label={labelMap[key]}
//           />
//         ))}

//         {/* File Upload */}
//         <div className="flex flex-col col-span-1 md:col-span-2">
//           <label className="text-sm font-medium text-gray-700 mb-1">
//             Upload Car Image
//           </label>
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="border border-gray-300 rounded-md py-2 px-4"
//             accept="image/*"
//             required={!initialData}
//           />
//         </div>

//         {/* Image Preview */}
//         {preview && (
//           <div className="col-span-2 text-center">
//             <img
//               src={preview}
//               alt="Preview"
//               className="mx-auto h-40 rounded-md shadow-md"
//             />
//           </div>
//         )}

//         {/* Buttons */}
//         <div className="col-span-1 md:col-span-2 flex justify-center gap-4 mt-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className={`px-6 py-3 rounded-md font-semibold text-white transition duration-200 ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading
//               ? submitLabel === "Submit"
//                 ? "Submitting..."
//                 : "Updating..."
//               : submitLabel}
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate(cancelPath)}
//             className="px-6 py-3 rounded-md font-semibold text-red-600 border border-red-300 hover:bg-red-50"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RenderInput, RenderSelect } from "./FormElement";

const formFields = [
  "car_name",
  "brand",
  "registrationNumber",
  "color",
  "type",
  "seats",
  "fuelType",
  "transmission",
  "mileage",
  "rentalPricePerDay",
  "location",
];

const labelMap = {
  car_name: "Car Name",
  brand: "Brand",
  registrationNumber: "Car Number",
  color: "Color",
  type: "Type",
  seats: "Seating Capacity",
  fuelType: "Fuel Type",
  transmission: "Transmission",
  mileage: "Mileage (km/l)",
  rentalPricePerDay: "Price/Day (₹)",
  location: "Location",
};

const dropdownOptions = {
  type: ["car", "2 wheeler"],
  fuelType: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"],
  transmission: ["Manual", "Auto"],
};

// Utility to sanitize form data
const sanitizeFormData = (data = {}) => {
  const sanitized = {};
  formFields.forEach((field) => {
    sanitized[field] = data[field] ?? "";
  });
  return sanitized;
};

export default function CarForm({
  initialData = {},
  onSubmit,
  submitLabel = "Submit",
//   loading = false,
  title = "Add New Car",
  cancelPath = "/dashboard/owner/my-cars",
}) {
  const navigate = useNavigate();
  const isEditMode = Boolean(initialData && Object.keys(initialData).length);

  const [form, setForm] = useState(() => sanitizeFormData(initialData));
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initialData?.image?.url || null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      setForm({});
      setFile(null);
      setPreview(null);
    };
  }, []);

  const handleChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const img = e.target.files[0];
    setFile(img);
    setPreview(URL.createObjectURL(img));
  }, []);

  const simulateDelay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (file) formData.append("image", file);

    await simulateDelay(4000); // Artificial delay of 4 seconds
    await onSubmit(formData);

    setSubmitting(false);
  };

  const displayLabel = submitting
    ? isEditMode
      ? "Updating..."
      : "Submitting..."
    : submitLabel;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-xl rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        {title}
      </h1>

      <form
        onSubmit={handleFormSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {Object.keys(form)
          .filter((key) => !["type", "fuelType", "transmission"].includes(key))
          .map((key) => (
            <RenderInput
              key={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
              type={
                ["seats", "mileage", "rentalPricePerDay"].includes(key)
                  ? "number"
                  : "text"
              }
              label={labelMap[key]}
            />
          ))}

        {["type", "fuelType", "transmission"].map((key) => (
          <RenderSelect
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            options={dropdownOptions[key]}
            label={labelMap[key]}
          />
        ))}

        {/* File Upload */}
        <div className="flex flex-col col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Upload Car Image
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md py-2 px-4"
            accept="image/*"
            required={!initialData?.image?.url}
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="col-span-2 text-center">
            <img
              src={preview}
              alt="Preview"
              className="mx-auto h-40 rounded-md shadow-md object-cover"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="col-span-1 md:col-span-2 flex justify-center gap-4 mt-4">
          <button
            type="submit"
            disabled={submitting}
            className={`px-6 py-3 rounded-md font-semibold text-white transition duration-200 ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {displayLabel}
          </button>

          <button
            type="button"
            onClick={() => navigate(cancelPath)}
            className="px-6 py-3 rounded-md font-semibold text-red-600 border border-red-300 hover:bg-red-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
