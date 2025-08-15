import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCars } from "../../../features/cars/carSlice";
import PieCharts from "../../../components/PieCharts"; // Adjust path if needed

// Static color mapping for statuses
const COLORS = ["#22c55e", "#eab308", "#ef4444"]; // Approved, Pending, Rejected

const Overview = () => {
  const dispatch = useDispatch();
  const { myCars, loading } = useSelector((state) => state.car);

  useEffect(() => {
    dispatch(getMyCars());
  }, [dispatch]);

  // Prepare chart data from status
  const { chartData, total } = useMemo(() => {
    if (!Array.isArray(myCars) || myCars.length === 0) {
      return { chartData: [], total: 0 };
    }

    const approved = myCars.filter((car) => car.status === "approved").length;
    const pending = myCars.filter((car) => car.status === "pending").length;
    const rejected = myCars.filter((car) => car.status === "rejected").length;

    const chartData = [
      { name: "Approved", value: approved },
      { name: "Pending", value: pending },
      { name: "Rejected", value: rejected },
    ];

    return { chartData, total: myCars.length };
  }, [myCars]);

  return (
    <div className="p-6 min-h-screen flex flex-col items-center bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        📊 Dashboard Overview
      </h1>

      {total === 0 && !loading ? (
        <p className="text-center text-gray-500 font-medium">
          No cars available.
        </p>
      ) : (
        <PieCharts
          title="Car Status Overview"
          data={chartData}
          colors={COLORS}
          loading={loading}
          unit="cars"
        />
      )}
    </div>
  );
};

export default Overview;
