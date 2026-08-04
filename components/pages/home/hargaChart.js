import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';
import { formatDateId } from '@/utils/common';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function HargaChart({chartData, flag}) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function (params) {
            return 'Rp.'+ params?.raw;
          }
        }
      },
      legend: {
        display: false,
      },
      title: {
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
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels: chartData?.map((item) => formatDateId(item.date_string)),
    datasets: [
      {
        data: chartData?.map((item) => item.average?.toFixed(0)),
        borderColor: flag === "konsumen" ? "#FFFFFF" : "#404040",
        borderWidth: 1.5,
        tension: 0.5,
        pointBorderWidth: 0,
        pointBackgroundColor: flag === "konsumen" ? '#FFFFFF' : '#000000'
      },
    ],
  };

  return (
    <Box className="w-full">
      <Line options={options} data={data} className='w-full py-2' style={{maxHeight: '5rem'}} />
    </Box>
  );
}
