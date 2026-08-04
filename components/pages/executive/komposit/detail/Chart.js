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
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Divider, FormControlLabel, Grid, Popover, Typography } from '@mui/material';
import { ExpandMore, FiberManualRecord } from '@mui/icons-material';
import ChartFilterTabs from '../../ChartFilterTabs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const ChartLegend = ({data, showLine, setShowLine, params, mobileTab}) => {
  if (!data) return
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
    >
      <Checkbox
        checked = {showLine[data.slug]}
        size="small"
        sx={{
          color: "#008444",
          '&.Mui-checked': {
            color: "#008444",
          },
          padding: mobileTab ? "0.3em" : "0.6em"
        }}
        onChange={handleChange}
      />
      <FiberManualRecord sx={{ fontSize: mobileTab ? 10 : 15, color: data.color }} />
      <Typography className='px-2 capitalize' fontSize="0.8em">{data.title}</Typography>
    </Box>
  )
}

export default function Chart({chartData, chartLegends, handleChangeTabs, params, sumber_data, pilar}) {
  const { isMobile, isTablet } = useMediaQuery();
  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );
  const [showLine, setShowLine] = React.useState({
    bawang_merah: true,
  });

  React.useEffect(() => {
    if (chartLegends.length > 0) {
      const show = {};
      for (let i = 1; i < chartLegends.length; i++) {
        show[chartLegends[i].slug] = true
      }
      setShowLine(
        {
          ...showLine,
          ...show
        }
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartLegends])

  const [datasets, setDatasets] = React.useState([]);
  React.useEffect(() => {
    if (chartData) {
      const datasets = chartLegends.map((legend) => ({
        label: legend?.title,
        data: showLine[legend.slug] ? chartData.map((item) => parseInt(item[legend.slug])) : [],
        barPercentage: 0.9,
        borderRadius: 10,
        borderSkipped: false,
        backgroundColor: legend?.color,
      }))
      setDatasets(datasets)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartLegends, showLine, chartData])

  const data = {
    labels: chartData?.map((item) => item.period),
    datasets
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (params) {
            return pilar === 'ketersediaan' ?
             params?.dataset?.label +': '+ params?.raw+' Hari'
             : params?.dataset?.label +': Rp.'+ params?.raw;
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
            size: 9
          },
          callback: function(value, index, values) {
            return pilar === 'ketersediaan' ? value+' Hari' : 'Rp.'+value
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
    <Box sx={{borderRadius: '20px', background: "#F8FCFB", my:5}}>
      <Grid
        container
        direction="row"
        spacing={1}
        className="p-5 pt-1"
        alignItems="center"
      >
        <Grid item md={12} sm={12} xs={12}>
          <Box className={`${mobileTab ? "":"flex gap-3 items-top justify-end"}`}>
            <Box className='relative'>
              <Box
                size='small'
                variant="outlined"
                className={`${mobileTab ? 'absolute w-full top-12' :'absolute right-0 p-0'}`}
                sx={{textTransform: 'none', borderColor: '#AAD6C1', color: '#404040', borderRadius: '8px'}}
              >
                <Accordion
                  disableGutters
                  TransitionProps={{ unmountOnExit: true }} 
                  style={{borderRadius: '10px', border: "solid 1px #AAD6C1", boxShadow: 'none', minWidth: '170px', padding: "1px"}}
                >
                  <AccordionSummary
                    expandIcon={ chartLegends?.length > 1 && <ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      padding: 0,
                      minHeight: "unset"
                    }}
                  >
                    <Box sx={{margin: "-12px 0"}}>
                      <ChartLegend
                        setShowLine={setShowLine}
                        showLine={showLine}
                        data={chartLegends[0]}
                        mobileTab={mobileTab}
                      />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      padding: 0
                    }}
                  >
                  {
                    chartLegends.map((item, idx) => idx !== 0 && (
                      <ChartLegend
                        key={idx}
                        setShowLine={setShowLine}
                        showLine={showLine}
                        data={item}
                        mobileTab={mobileTab}
                      />
                    ))
                  }
                  </AccordionDetails>
                </Accordion>
              </Box>
              
            </Box>
            <ChartFilterTabs handleChangeTabs={handleChangeTabs} params={params} />
          </Box>
        </Grid>
      </Grid>
      
      <Divider sx={{borderColor: "#757575", mt: 5}} />

      <Box className="w-full py-10">
        <Bar options={options} data={data} style={{ minHeight: mobileTab ? "300px" : "500px" }} />
      </Box>
      <Typography color="#1E1B39" fontSize="0.8em" fontFamily="Inter">
        *Penggunaan acuan aman, waspada, dan rentan mengacu pada Petunjuk Teknis Sistem Pasokan dan Harga Pangan BAPANAS (2022). 
      </Typography>
      <Typography color="#1E1B39" fontSize="0.8em" fontFamily="Inter">
        {sumber_data}
      </Typography>
    </Box>
    
  );
}
