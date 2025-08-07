// components/CarTable.jsx
import { useNavigate } from "react-router-dom";

const CarTable = ({
  cars = [],
  type,
  onApprove,
  onReject,
  role = "user",
  showStatus = false, // <== NEW!
}) => {
  const navigate = useNavigate();
  const showOwner = role === "admin";

  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4">Image</th>
            <th className="py-3 px-4 text-left">Car Name</th>
            {showOwner && <th className="py-3 px-4 text-left">Owner</th>}
            {showOwner && <th className="py-3 px-4 text-left">Email</th>}
            {type === "pending" && onApprove && onReject && (
              <th className="py-3 px-4 text-center">Actions</th>
            )}
         
            {(type === "status" || showStatus) && (
              <th className="py-3 px-4 text-left">Status</th>
            )}
            <th className="py-3 px-4 text-center">Details</th>
          </tr>
        </thead>

        <tbody>
          {cars.map((car) => (
            <tr key={car._id} className="border-b hover:bg-gray-50 transition">
              <td className="py-2 px-4">
                <img
                  src={car.image?.url || car.image}
                  alt={car.car_name}
                  className="h-16 w-24 object-cover rounded"
                />
              </td>
              <td className="py-2 px-4">{car.car_name}</td>

              {showOwner && (
                <>
                  <td className="py-2 px-4">{car.ownerId?.name}</td>
                  <td className="py-2 px-4">{car.ownerId?.email}</td>
                </>
              )}

              {type === "pending" && onApprove && onReject && (
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

        

              {(type === "status" || showStatus) && (
                <td className="py-2 px-4">
                  {car.isApproved ? (
                    <span className="text-green-600 font-semibold">Approved</span>
                  ) : car.rejectionReason ? (
                    <span className="text-red-500 font-semibold">Rejected</span>
                  ) : (
                    <span className="text-yellow-500 font-semibold">Pending</span>
                  )}
                </td>
              )}

              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => navigate(`/car/${car._id}`)}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarTable;
