import React from "react";
import { Bar } from "react-chartjs-2";

const ChartContainer = ({ data, options }) => {
  return (
    <div className="w-full mx-auto">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartContainer;
