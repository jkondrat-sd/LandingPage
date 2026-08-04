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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useMediaQuery from "@/hooks/useMediaQuery";
import { Box, Checkbox, Divider, Grid, Typography } from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material';
import ChartFilterTabs from './ChartFilterTabs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const ChartLegend = ({data, showLine, setShowLine, mobileTab}) => {
  const handleChange = () => {
    setShowLine(
      {
        ...showLine,
        [data.slug]: !showLine[data.slug]
      }
    )
  }
  return (
    <Box
      className="flex items-center"
      sx={{
        border: "1px solid #757575",
        borderRadius: "8px"
      }}
    >
      <Checkbox
        checked = {showLine[data.slug]}
        size="small"
        sx={{
          color: "#008444",
          '&.Mui-checked': {
            color: "#008444",
            padding: mobileTab ? "0.3em" : "0.6em"
          },
        }}
        onChange={handleChange}
      />
      <FiberManualRecord sx={{ fontSize: mobileTab ? 10 : 15, color: data.color }} />
      <Typography className='px-2' fontSize="0.8em">{data.title}</Typography>
    </Box>
  )
}

export default function Chart({chartData, params, setParams, title, chartLegends}) {
  const [showLine, setShowLine] = React.useState({
    bb_sangat_kurang: true,
    bb_kurang: true,
    bb_normal: true,
    bb_lebih: true,
    total_bb: true,
    pendek: true,
    sangat_pendek: true,
    stunting: true,
    gizi_buruk: true,
    gizi_kurang: true,
    wasting: true,
  });

  const [datasets, setDatasets] = React.useState([]);
  React.useEffect(() => {
    if (chartData) {
      const datasets = chartLegends.map((legend) => ({
        label: legend?.title,
        data: showLine[legend.slug] ? chartData.map((item) => parseInt(item[legend.slug])) : [],
        borderColor: legend?.color,
        pointStyle: false,
        tension: 0.5,
      }))
      setDatasets(datasets)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartLegends, showLine, chartData])
  
  const data = {
    labels: chartData?.map((item) => item.periode),
    datasets
  };

  const handleChangeTabs = (selected) => {
    setParams({...params, ...selected})
  }
  
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

  return (
    <Box sx={{borderRadius: '20px', background: "#F8FCFB", mb:5}}>
      <Grid
        container
        direction="row"
        spacing={1}
        className="p-5"
        alignItems="center"
      >
        <Grid item md={12} sm={12} xs={12}>
          <Typography className="font-lato-500" fontSize="1.8em">
            Perkembangan Tingkat/Angka {title}
          </Typography>
        </Grid>
        <Grid item md={12} sm={12} xs={12} className={`${mobileTab ? "" : 'flex gap-2 justify-end'}`}>
          <Box className={`${mobileTab ? "w-full mb-3" : "flex gap-1"}`}>
            {
              chartLegends.map((item, idx) => (
                <ChartLegend
                  setShowLine={setShowLine}
                  showLine={showLine}
                  data={item}
                  mobileTab={mobileTab}
                  key={idx}
                />
              ))
            }
          </Box>
          <ChartFilterTabs params={params} handleChangeTabs={handleChangeTabs} />
        </Grid>
      </Grid>
      
      <Divider sx={{borderColor: "#757575"}} />

      <Box className="w-full p-5">
        <Line options={options} data={data} style={{minHeight: mobileTab ? "300px" : '500px'}} />
      </Box>
    </Box>
    
  );
}
