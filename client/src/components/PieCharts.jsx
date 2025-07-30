import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Tooltip shows actual count (e.g., "4 cars", "10 users")
const CustomTooltip = ({ active, payload, unit }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white p-2 rounded shadow text-sm border">
        <p className="font-semibold">{payload[0].name}</p>
        <p>
          {payload[0].value} {unit}
        </p>
      </div>
    );
  }
  return null;
};

// Legend shows name + percent (e.g., "Pending - 40%")
const CustomLegend = ({ data, colors }) => {
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  return (
    <ul className="space-y-2 text-sm">
      {data.map((entry, index) => {
        const percent = total ? ((entry.value / total) * 100).toFixed(0) : 0;
        return (
          <li key={index} className="flex items-center space-x-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span>{entry.name} - {percent}%</span>
          </li>
        );
      })}
    </ul>
  );
};

const PieCharts = ({ title, data = [], colors = [], loading, unit = "items" }) => {
  if (loading) return <p>Loading {title} chart...</p>;

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <div className="flex flex-row items-center">
        {/* Pie Chart */}
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip unit={unit} />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend with % */}
        <div className="w-48 pl-6">
          <CustomLegend data={data} colors={colors} />
        </div>
      </div>
    </div>
  );
};

export default PieCharts;
