import React from "react";
import PieCharts from "../../../../components/PieCharts";

const COLORS = ["#f59e0b", "#16a34a", "#dc2626"];

const CarOverviewChart = ({ pending = [], approved = [], rejected = [], loading }) => {
  const data = [
    { name: "Pending", value: pending.length },
    { name: "Approved", value: approved.length },
    { name: "Rejected", value: rejected.length },
  ];

  return (
    <PieCharts
      title="Car Approval Overview"
      data={data}
      colors={COLORS}
      loading={loading}
    />
  );
};

export default CarOverviewChart;
