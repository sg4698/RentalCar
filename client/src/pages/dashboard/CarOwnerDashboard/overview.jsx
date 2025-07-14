import { useEffect, useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { getMyCars } from "../../../features/cars/carSlice";

// Static color mapping
const COLORS = {
  Approved: "#22c55e",
  Pending: "#eab308",
  Rejected: "#ef4444",
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white border rounded shadow px-3 py-2 text-sm text-gray-800">
        <p>
          <span className="font-semibold">{name}:</span> {value}
        </p>
      </div>
    );
  }
  return null;
};

// Active sector styling for better interaction
const renderActiveShape = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
}) => (
  <Sector
    cx={cx}
    cy={cy}
    innerRadius={innerRadius}
    outerRadius={outerRadius + 6}
    startAngle={startAngle}
    endAngle={endAngle}
    fill={fill}
    stroke="#fff"
    strokeWidth={2}
  />
);

const Overview = () => {
  const dispatch = useDispatch();
  const { myCars, loading } = useSelector((state) => state.car);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(getMyCars());
  }, [dispatch]);

  const { chartData, total } = useMemo(() => {
    if (!Array.isArray(myCars) || myCars.length === 0)
      return { chartData: [], total: 0 };

    const approved = myCars.filter((car) => car.isApproved).length;
    const pending = myCars.filter(
      (car) => !car.isApproved && !car.rejectionReason
    ).length;
    const rejected = myCars.filter(
      (car) => !car.isApproved && car.rejectionReason
    ).length;

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

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 relative hover:shadow-2xl transition-all">
        {loading ? (
          <p className="text-center text-blue-600 font-medium">Loading...</p>
        ) : total === 0 ? (
          <p className="text-center text-gray-500 font-medium">
            No cars available.
          </p>
        ) : (
          <>
            {/* Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={3}
                  isAnimationActive={true}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Total count in center */}
            <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold text-blue-700">{total}</p>
            </div>

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white border rounded-lg shadow px-4 py-2 text-sm space-y-2">
              {chartData.map(({ name }) => (
                <div key={name} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ backgroundColor: COLORS[name] }}
                  />
                  <span className="text-gray-700">{name}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Overview;
