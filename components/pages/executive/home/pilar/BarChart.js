import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

export default function BarChart({
  chartData,
  setSelectedStatus,
}) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    elements: {},
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
        stacked: true,
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false,
        },
        stacked: true,
        ticks: {
          callback: (label, index, labels) => {
            return "";
          },
        },
      },
    },
    layout: {
      padding: 0,
    },
    onClick: (e, activeEls) => {
      if (activeEls[0]) {
        let datasetIndex = activeEls[0]?.datasetIndex;
        let datasetLabel = e.chart.data.datasets[datasetIndex]?.label;
        setSelectedStatus(datasetLabel);
      }
    },
  };

  const data = {
    datasets: [
      {
        label: "aman",
        data: [
          {
            y: "",
            x: chartData.aman,
          },
        ],
        barPercentage: 1,
        backgroundColor: "#008444",
        categoryPercentage: 0.8,
        borderWidth: 0,
        borderRadius: {
          bottomLeft: 10,
          topLeft: 10,
          bottomRight: chartData.rentan <= 0 && chartData.waspada <= 0 ? 10 : 0,
          topRight: chartData.rentan <= 0 && chartData.waspada <= 0 ? 10 : 0,
        },
        borderSkipped: false,
      },
      {
        label: "waspada",
        data: [
          {
            y: "",
            x: chartData.waspada,
          },
        ],
        barPercentage: 1,
        backgroundColor: "#FFA600",
        categoryPercentage: 0.8,
        borderWidth: 0,
        borderRadius: {
          bottomLeft: chartData.aman > 0 ? 0 : 10,
          topLeft: chartData.aman > 0 ? 0 : 10,
          bottomRight: chartData.rentan > 0 ? 0 : 10,
          topRight: chartData.rentan > 0 ? 0 : 10,
        },
        borderSkipped: false,
      },
      {
        label: "rentan",
        data: [
          {
            y: "",
            x: chartData.rentan,
          },
        ],
        barPercentage: 1,
        backgroundColor: "#F44336",
        categoryPercentage: 0.8,
        borderWidth: 0,
        borderRadius: {
          bottomLeft: chartData.aman <= 0 && chartData.waspada <= 0 ? 10 : 0,
          topLeft: chartData.aman <= 0 && chartData.waspada <= 0 ? 10 : 0,
          bottomRight: 10,
          topRight: 10,
        },
        borderSkipped: false,
      },
    ],
  };
  return (
    <Box
      sx={{
        marginLeft: "-13px",
        height: "40px"
      }}
    >
      <Bar options={options} data={data} />
    </Box>
  );
}
