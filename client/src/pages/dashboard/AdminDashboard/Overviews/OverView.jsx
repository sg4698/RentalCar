// src/pages/Admin/Overviews/Overview.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingCars,
  fetchApprovedCars,
  fetchRejectedCars,
} from "../../../../features/cars/adminCarSlice";
import StatCard from "../../../../components/StatCard";
import PendingCars from "../Cars/PendingCars";

const Overview = () => {
  const dispatch = useDispatch();

  // ✅ Safe defaults to avoid TypeError
  const {
    pending= [],
    approved = [],
    rejected = [],
    loading = false,
  } = useSelector((state) => state.adminCar || {});

  useEffect(() => {
    dispatch(fetchPendingCars());
    dispatch(fetchApprovedCars());
    dispatch(fetchRejectedCars());
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Pending Cars" value={pending.length} color="yellow" />
        <StatCard title="Approved Cars" value={approved.length} color="green" />
        <StatCard title="Rejected Cars" value={rejected.length} color="red" />
      </div>

      {/* Pending Cars Table */}
      <div className="bg-white p-4 rounded-xl shadow border">
        <h2 className="text-xl font-semibold mb-4">Recently Submitted Cars for Approval</h2>
        <PendingCars cars={pending.slice(0, 5)} loading={loading} />
      </div>
    </div>
  );
};

export default Overview;
