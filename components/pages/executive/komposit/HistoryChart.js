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
import { Box, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import ChartFilterTabs from '@/components/pages/executive/ChartFilterTabs';
import { formatDateId } from '@/utils/common';
import useMediaQuery from "@/hooks/useMediaQuery";

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

export default function HistoryChart({chartData, handleChangeTabs, params, loading, chartTitle}) {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function (params) {
            return params?.dataset?.label +': '+ params?.raw +'%';
          },
          footer: function (TooltipItem) {
            return 'Status: '+ chartData[TooltipItem[0].dataIndex]?.status;
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
          tickColor: 'transparent',
          borderColor: '#C2C2C2',
          color: 'transparent',
        },
        ticks: {
          color: '#757575',
          font: {
            size: 9
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          tickColor: 'transparent',
          borderColor: 'transparent',
          color: '#C2C2C2',
        },
        ticks: {
          color: '#757575',
          font: {
            size: 9
          }
        },
        // grace: '50%'
      }
      
    },
    layout: {
      padding: '20px'
    },
    onClick: function() {
      // if (clicked?.month) setSelectedMonth(clicked?.month);
      // scrollSmoothHandler();
    },
  };

  let width, height, gradient;
  const getGradient = (ctx, chartArea) => {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      // Create the gradient because this is either the first render
      // or the size of the chart has changed
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      gradient.addColorStop(1, "#9BDBB3");
      gradient.addColorStop(0, "#FFFFFF");
    }
  
    return gradient;
  }

  const data = {
    labels: chartData?.map((item) => formatDateId(item.periode, 'MMMM YYYY')),
    datasets: [
      {
        fill: true,
        label: 'Skor Ketersediaan',
        data: chartData?.map((item) => item.skor_komposit?.toFixed(0) || item.skor?.toFixed(0)),
        borderColor: '#008444',
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
  
          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }
          return getGradient(ctx, chartArea);
        },
        tension: 0.5,
      },
    ],
  };

  return (
    <Box sx={{borderRadius: '20px', background: "#F8FCFB", my:5}}>
      <Grid
        container
        direction="row"
        spacing={1}
        className="p-5"
        alignItems="center"
      >
        <Grid item xl={7} lg={12} md={12} sm={12} xs={12}>
          <Typography className="font-lato-500" fontSize="1.8em">
            {chartTitle}
          </Typography>
        </Grid>
        <Grid item xl={5} lg={12} md={12} sm={12} xs={12} className={`${mobileTab ? "" : 'flex justify-end'}`}>
          <ChartFilterTabs handleChangeTabs={handleChangeTabs} params={params} />
        </Grid>
      </Grid>
      {loading && <LinearProgress color="success" />}
      
      <Divider sx={{borderColor: "#757575"}} />

      <Box className="w-full py-10">
        <Line options={options} data={data} style={{ minHeight: mobileTab ? "300px" : "500px" }} />
      </Box>
    </Box>
  );
}
