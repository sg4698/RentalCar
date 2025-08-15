

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApprovedCars,
  fetchPendingCars,
  fetchRejectedCars,
  approveCar,
  rejectCar,
} from "../../../../features/cars/adminCarSlice";
import CarTable from "../../../../components/CarTable";
import { toast } from "react-toastify";
import Modal from "../../../../components/Modal"; // import your modal

const FILTERS = [
  { key: "all", label: "All" },
  { key: "approved", label: "Approved" },
  { key: "pending", label: "Pending" },
  { key: "rejected", label: "Rejected" },
];

const AllCars = () => {
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState("all");
  const [localLoading, setLocalLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalReason, setModalReason] = useState("");

  const { approved = [], pending = [], rejected = [], loading } =
    useSelector((state) => state.adminCar || {});

  const loadCars = useCallback(async () => {
    setLocalLoading(true);
    try {
      if (filterType === "approved") {
        await dispatch(fetchApprovedCars()).unwrap();
      } else if (filterType === "pending") {
        await dispatch(fetchPendingCars()).unwrap();
      } else if (filterType === "rejected") {
        await dispatch(fetchRejectedCars()).unwrap();
      } else {
        await Promise.all([
          dispatch(fetchApprovedCars()).unwrap(),
          dispatch(fetchPendingCars()).unwrap(),
          dispatch(fetchRejectedCars()).unwrap(),
        ]);
      }
    } catch (err) {
      toast.error("Failed to fetch cars. Please try again.",err);
    } finally {
      setLocalLoading(false);
    }
  }, [dispatch, filterType]);

  useEffect(() => {
    loadCars();
  }, [filterType, loadCars]);

  const handleApprove = async (id) => {
    try {
      await dispatch(approveCar(id)).unwrap();
      toast.success("Car approved successfully.");
      if (filterType === "pending" || filterType === "all") {
        await dispatch(fetchPendingCars());
        if (filterType === "all") {
          await dispatch(fetchApprovedCars());
        }
      }
    } catch (err) {
      toast.error("Approval failed.",err);
    }
  };

  const handleReject = async (id) => {
    const reason = prompt("Enter rejection reason:");
    if (!reason || reason.trim() === "") {
      toast.warning("Rejection reason is required.");
      return;
    }

    try {
      await dispatch(rejectCar({ id, reason })).unwrap();
      toast.success("Car rejected successfully.");
      if (filterType === "pending" || filterType === "all") {
        await dispatch(fetchPendingCars());
        if (filterType === "all") {
          await dispatch(fetchRejectedCars());
        }
      }
    } catch (err) {
      toast.error("Rejection failed.",err);
    }
  };

  // 💡 Handle status click (for showing rejection reason)
  const handleStatusClick = (car) => {
    if (car.status === "rejected" && car.rejectionReason) {
      setModalReason(car.rejectionReason);
      setModalOpen(true);
    }
  };

  const getCars = () => {
    switch (filterType) {
      case "approved":
        return approved;
      case "pending":
        return pending;
      case "rejected":
        return rejected;
      case "all":
      default:
        return [...approved, ...pending, ...rejected];
    }
  };

  const cars = getCars();
  const isLoading = loading || localLoading;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">All Cars</h1>
        <select
          className="border px-3 py-2 rounded text-sm"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          {FILTERS.map((filter) => (
            <option key={filter.key} value={filter.key}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <p className="text-blue-500 font-medium">Loading cars...</p>
      ) : cars.length === 0 ? (
        <p className="text-gray-500">No cars found for this filter.</p>
      ) : (
        <CarTable
          cars={cars}
          type={filterType}
          showStatus={filterType === "all" || filterType === "rejected" || filterType === "approved" }
          onApprove={
            filterType === "pending" || filterType === "all" 
              ? handleApprove
              : undefined
          }
          onReject={
            filterType === "pending" || filterType === "all"
              ? handleReject
              : undefined
          }
          onStatusClick={handleStatusClick}
          role="admin"
        />
      )}

      {/* Modal for rejection reason */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Rejection Reason"
      >
        <p className="text-gray-700">{modalReason}</p>
      </Modal>
    </div>
  );
};

export default AllCars;
