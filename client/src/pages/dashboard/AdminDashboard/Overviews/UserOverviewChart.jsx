import React from "react";
import PieCharts from "../../../../components/PieCharts";

const COLORS = ["#4f46e5", "#16a34a", "#f59e0b"];

const UserOverviewChart = ({ users = [], loading }) => {
  // const totalUsers = users.length;
  const totalCarOwners = users.filter((user) => user.role === "carOwner").length;
  const totalOnlyUsers = users.filter((user) => user.role === "user").length;

  const data = [
    { name: "Car Owners", value: totalCarOwners },
    { name: "Users", value: totalOnlyUsers },
    // { name: "All Users", value: totalUsers },
  ];

  return (
    <PieCharts
      title="User Overview"
      data={data}
      colors={COLORS}
      loading={loading}
    />
  );
};

export default UserOverviewChart;
