// src/pages/Admin/Overviews/Overview.jsx
import React, { useEffect, useCallback, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingCars,
  fetchApprovedCars,
  fetchRejectedCars,
} from "../../../../features/cars/adminCarSlice";
import { fetchAllUsers } from "../../../../features/users/userSlice";
import StatCard from "../../../../components/StatCard";
import PendingCars from "../Cars/PendingCars";

// Lazy loaded charts
const UserOverviewChart = React.lazy(() => import("./UserOverviewChart"));
const CarOverviewChart = React.lazy(() => import("./CarOverviewChart"));

const Overview = () => {
  const dispatch = useDispatch();

  const {
    pending = [],
    approved = [],
    rejected = [],
    loading: carLoading,
  } = useSelector((state) => state.adminCar || {});

  const {
    users = [],
    loading: userLoading,
  } = useSelector((state) => state.users || {});

  // Fetch overview data once on mount
  const fetchOverviewData = useCallback(() => {
    dispatch(fetchPendingCars());
    dispatch(fetchApprovedCars());
    dispatch(fetchRejectedCars());
    dispatch(fetchAllUsers({ page: 1, limit: 100 }));
  }, [dispatch]);

  useEffect(() => {
    fetchOverviewData();
  }, [fetchOverviewData]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="All Cars" value={approved.length} color="green" />
       <StatCard title="All Users" value={users.length} color="green" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Chart */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-4">User Summary</h2>
          <Suspense fallback={<p>Loading user chart...</p>}>
            <UserOverviewChart users={users} loading={userLoading} />
          </Suspense>
        </div>

        {/* Car Chart */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-4">Car Approval Summary</h2>
          <Suspense fallback={<p>Loading car chart...</p>}>
            <CarOverviewChart
              pending={pending}
              approved={approved}
              rejected={rejected}
              loading={carLoading}
            />
          </Suspense>
        </div>
      </div>

      {/* Pending Cars */}
      <div className="bg-white p-4 rounded-xl shadow border">
        <h2 className="text-xl font-semibold mb-4">Recently Submitted Cars for Approval</h2>
        <PendingCars cars={pending.slice(0, 5)} loading={carLoading} />
      </div>
    </div>
  );
};

export default Overview;
