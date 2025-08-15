// components/CarTable.jsx
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";

const CarTable = ({
  cars = [],
  type,
  onApprove,
  onReject,
  onEdit,
  onDelete,
  role = "user",
  showStatus = false,
}) => {
  const navigate = useNavigate();
  const isAdmin = role === "admin";

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRefs = useRef({}); // store refs for each row

  const toggleDropdown = (id) =>
    setDropdownOpen((prev) => (prev === id ? null : id));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen) {
        const ref = dropdownRefs.current[dropdownOpen];
        if (ref && !ref.contains(event.target)) {
          setDropdownOpen(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const renderStatus = (car) => {
    if (car.status === "approved") return <span className="text-green-600 font-semibold">Approved</span>;
    if (car.status === "rejected") return <span className="text-red-500 font-semibold">Rejected</span>;
    return <span className="text-yellow-500 font-semibold">Pending</span>;
  };

  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4">Image</th>
            <th className="py-3 px-4 text-left">Car Name</th>
            {isAdmin && <th className="py-3 px-4 text-left">Owner</th>}
            {isAdmin && <th className="py-3 px-4 text-left">Email</th>}
            {type === "pending" && isAdmin && <th className="py-3 px-4 text-center">Actions</th>}
            {showStatus && <th className="py-3 px-4 text-left">Status</th>}
            <th className="py-3 px-4 text-center">Details</th>
            {role === "carOwner" && <th className="py-3 px-4 text-center">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {cars.map((car) => (
            <tr key={car._id} className="border-b hover:bg-gray-50 transition relative">
              <td className="py-2 px-4">
                <img
                  src={car.image?.url || car.image}
                  alt={car.car_name}
                  className="h-16 w-24 object-cover rounded"
                />
              </td>
              <td className="py-2 px-4">{car.car_name}</td>

              {isAdmin && (
                <>
                  <td className="py-2 px-4">{car.ownerId?.name || "N/A"}</td>
                  <td className="py-2 px-4">{car.ownerId?.email || "N/A"}</td>
                </>
              )}

              {type === "pending" && isAdmin && onApprove && onReject && (
                <td className="py-2 px-4">
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => onApprove(car._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-24"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onReject(car._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-24"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              )}

              {showStatus && <td className="py-2 px-4">{renderStatus(car)}</td>}

              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => navigate(`/car/${car._id}`)}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
                >
                  View Details
                </button>
              </td>

              {role === "carOwner" && (
                <td className="py-2 px-4 text-center relative">
                  <div ref={(el) => (dropdownRefs.current[car._id] = el)}>
                    <button
                      onClick={() => toggleDropdown(car._id)}
                      className="text-gray-600 hover:text-gray-800 p-2 rounded-full"
                    >
                      <FaEllipsisV />
                    </button>
                    {dropdownOpen === car._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                        <button
                          onClick={() => { onEdit?.(car); setDropdownOpen(null); }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => { onDelete?.(car._id); setDropdownOpen(null); }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarTable;
