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

export default function BarChartGizi({ value, title }) {
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
        barPercentage: 1,
        backgroundColor: "#008444",
        categoryPercentage: 0.8,
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
        barPercentage: 1,
        backgroundColor: "#EDEDED",
        categoryPercentage: 0.8,
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
    <Box className="mt-3">
      <Box sx={{
        height: "40px",
        marginTop: "-10px",
        marginBottom: "-10px",
        marginLeft: "-13px"
      }}>
        <Bar options={options} data={data} />
      </Box>
      <Box className="flex justify-between">
        <Typography
          fontFamily="Lato"
          fontWeight={500}
          fontSize="0.9em"
        >
          {title}
        </Typography>
        <Typography
          fontFamily="Lato"
          fontWeight={500}
          fontSize="0.9em"
        >
          {value}%
        </Typography>
      </Box>
    </Box>
  );
}
