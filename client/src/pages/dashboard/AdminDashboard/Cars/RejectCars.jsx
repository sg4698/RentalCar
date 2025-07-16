import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRejectedCars } from "../../../../features/cars/adminCarSlice";
import AdminCarCard from "../../../../components/AdminCarCard";
import RejectionReasonModal from "../../../../components/RejectReasonModel";

const RejectedCars = () => {
  const dispatch = useDispatch();
  const { rejected, loading, error } = useSelector((state) => state.adminCar);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");

  useEffect(() => {
    dispatch(fetchRejectedCars());
  }, [dispatch]);

  const handleViewReason = (reason) => {
    setSelectedReason(reason);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">❌ Rejected Cars</h2>

      {loading && <p className="text-blue-600 text-center font-medium">Loading rejected cars...</p>}
      {error && <p className="text-red-500 text-center font-medium">Error: {error}</p>}

      {!rejected || rejected.length === 0 ? (
        <p className="text-gray-500 text-center mt-10 text-lg">No rejected cars available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rejected.map((car) => (
            <AdminCarCard key={car._id} car={car} onViewReason={handleViewReason} />
          ))}
        </div>
      )}

      <RejectionReasonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reason={selectedReason}
      />
    </div>
  );
};

export default RejectedCars;
