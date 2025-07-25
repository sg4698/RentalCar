// src/components/dashboard/StatCard.jsx
const colorMap = {
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
  yellow: "bg-yellow-100 text-yellow-700",
};

const StatCard = ({ title, value, color = "gray" }) => {
  return (
    <div className={`p-4 rounded-lg shadow border ${colorMap[color] || "bg-gray-100 text-gray-800"}`}>
      <h4 className="text-sm font-medium">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;
