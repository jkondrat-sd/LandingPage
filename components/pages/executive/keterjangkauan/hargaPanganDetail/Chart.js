import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LinearScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import useMediaQuery from "@/hooks/useMediaQuery";
import { Box, Checkbox, Divider, Grid, Typography } from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material';
import ChartFilterTabs from './ChartFilterTabs';

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
);

const chartLegends = [
  {
    title: "Harga Sebelumnya",
    color: "#FFB900",
    slug: "harga_pembanding",
  },
  {
    title: "Harga",
    color: "#1BACE3",
    slug: "harga",
  },
]

export default function Chart({chartData, handleChangeTabs, params, setParams}) {
  const [showLine, setShowLine] = React.useState({
    harga_pembanding: true,
    harga: true,
  });

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
        callbacks: {
          label: function (params) {
            return params?.dataset?.label +': '+ params?.raw;
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
            size: 9,
          }
        }
      },
      y: {
        grid: {
          tickColor: 'transparent',
          borderColor: 'transparent',
          color: '#C2C2C2',
          borderDash: [7, 5],
        },
        ticks: {
          color: '#757575',
          font: {
            size: 9,
          }
        },
        // grace: '50%'
      }
    },
    layout: {
      padding: '20px'
    },
    onClick: function(evt, element) {
      // if (clicked?.month) setSelectedMonth(clicked?.month);
      // scrollSmoothHandler();
    },
  };

  const data = {
    labels: chartData?.map((item) => item.periode),
    datasets: [
      // {
      //   label: "Harga Sebelumnya",
      //   data: showLine[chartLegends[0]?.slug] ? chartData?.map((item) => item[chartLegends[0]?.slug]) : [],
      //   barPercentage: 0.35,
      //   borderRadius: 15,
      //   borderSkipped: false,
      //   backgroundColor: chartLegends[0]?.color,
      // },
      {
        label: "Harga",
        data: showLine[chartLegends[1]?.slug] ? chartData?.map((item) => item[chartLegends[1]?.slug]) : [],
        barPercentage: 0.35,
        borderRadius: 15,
        borderSkipped: false,
        backgroundColor: chartLegends[1]?.color,
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
        <Grid item md={12} sm={12} xs={12}>
          <Typography className="font-lato-500" fontSize="1.8em">
            Perkembangan Harga Pangan
          </Typography>
        </Grid>
        <Grid item md={12} sm={12} xs={12} className={`${mobileTab ? "" : 'flex gap-2 justify-end'}`}>
          <ChartFilterTabs handleChangeTabs={handleChangeTabs} params={params} />
        </Grid>
      </Grid>
      
      <Divider sx={{borderColor: "#757575"}} />

      <Box className="w-full p-5">
        <Bar options={options} data={data} style={{ minHeight: mobileTab ? "300px" : "500px" }} />
      </Box>
    </Box>
    
  );
}
