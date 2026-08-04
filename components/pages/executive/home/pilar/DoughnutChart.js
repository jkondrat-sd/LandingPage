import React from "react";
import {
  Chart as ChartJS,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Box } from "@mui/material";
import "chartjs-plugin-doughnut-innertext";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, ChartTooltip, Legend);

export default function DoughnutChart({ cardData, color, title }) {
  const options = {
    responsive: true,
    elements: {},
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        filter: function (params) {
          return params?.raw === cardData?.persentase && params?.raw;
        },
      },
    },
    layout: {
      padding: "20px",
    },
    rotation: -135,
    circumference: 270,
    legend: {
      display: false,
    },
    cutout: "80%",
    borderSkipped: false,
    borderRadius: 10,
    spacing: 1,
  };

  const data = {
    labels: [title],
    datasets: [
      {
        data: [cardData?.persentase, 100 - cardData?.persentase],
        backgroundColor: [color, "#E0E0E0"],
      },
    ],
  };
  return (
    <Box style={{ maxWidth: "150px" }}>
      <Doughnut options={options} data={data} />
    </Box>
  );
}
