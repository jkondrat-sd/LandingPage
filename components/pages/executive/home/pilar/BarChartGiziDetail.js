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
import { Box, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

export default function BarChartGiziDetail({ value, color }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    elements: {},
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        filter: function (tooltipItem) {
          return tooltipItem.datasetIndex === 0;
        },
        callbacks: {
          label: function(tooltipItem) {
            return value+'%';
          }
        }
      }
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
    onClick: (e, activeEls) => {},
  };

  const data = {
    datasets: [
      {
        label: "value",
        data: [
          {
            y: "",
            x: value,
          },
        ],
        barPercentage: 2,
        backgroundColor: color,
        categoryPercentage: 0.2,
        borderWidth: 0,
        borderRadius: {
          bottomLeft: 10,
          topLeft: 10,
          bottomRight: 0,
          topRight: 0,
        },
        borderSkipped: false,
      },
      {
        data: [
          {
            y: "",
            x: 100 - value,
          },
        ],
        barPercentage: 2,
        backgroundColor: "#EDEDED",
        categoryPercentage: 0.2,
        borderWidth: 0,
        borderRadius: {
          bottomLeft: 0,
          topLeft: 0,
          bottomRight: 10,
          topRight: 10,
        },
        borderSkipped: false,
      },
    ],
  };
  return (
    <Box sx={{
      marginLeft: "-13px",
      marginBottom: "-20px",
      height: "60px"
    }}>
      <Bar options={options} data={data} />
    </Box>
  );
}
