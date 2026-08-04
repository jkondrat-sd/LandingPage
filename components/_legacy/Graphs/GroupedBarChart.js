import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const GroupedBarChart = ({ barData }) => {
  const data = {
    labels: barData.map((item) => `Minggu ${item.minggu}`),
    datasets: [
      {
        label: "Ketersediaan",
        data: barData?.map((item) => item.ketersediaan),
        backgroundColor: "rgb(37, 182, 234)",
        borderRadius: 5,
      },
      {
        label: "Kebutuhan",
        data: barData?.map((item) => item.kebutuhan),
        backgroundColor: "rgb(239, 83, 80)",
        borderRadius: 5,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },

    plugins: {
      legend: {
        align: "end",
      },
    },
  };
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GroupedBarChart;
