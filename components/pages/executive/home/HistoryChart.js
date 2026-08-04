import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Box, Checkbox, Divider, Grid, Typography } from "@mui/material";
import { FiberManualRecord } from "@mui/icons-material";
import ChartFilterTabs from "../ChartFilterTabs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartLegend = ({ data, showLine, setShowLine, mobileTab }) => {
  const handleChange = () => {
    setShowLine({
      ...showLine,
      [data.slug]: !showLine[data.slug],
    });
  };
  return (
    <Box
      className="flex items-center"
      sx={{
        border: "1px solid #757575",
        borderRadius: "8px",
      }}
    >
      <Checkbox
        defaultChecked={showLine[data.slug]}
        size="small"
        sx={{
          color: "#008444",
          "&.Mui-checked": {
            color: "#008444",
          },
          padding: mobileTab ? "0.3em" : "0.6em"
        }}
        onChange={handleChange}
      />
      <FiberManualRecord sx={{ fontSize: mobileTab ? 10 : 15, color: data.color }} />
      <Typography className="px-1" fontSize="0.7em">
        {data.title}
      </Typography>
    </Box>
  );
};

const chartLegends = [
  {
    title: "Ketersediaan",
    color: "#1BACE3",
    slug: "ketersediaan",
  },
  {
    title: "Keterjangkauan",
    color: "#FFC0CB",
    slug: "keterjangkauan",
  },
  {
    title: "Pemanfaatan",
    color: "#800080",
    slug: "pemanfaatan",
  },
];

export default function HistoryChart({ chartData, params, handleChangeTabs }) {
  const [showLine, setShowLine] = React.useState({
    ketersediaan: true,
    keterjangkauan: true,
    pemanfaatan: true,
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
            return params?.dataset?.label + ": " + params?.raw;
          },
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    elements: {
      point:{
          radius: 1.5
      }
    },
    scales: {
      x: {
        grid: {
          tickColor: "transparent",
          borderColor: "#C2C2C2",
          color: "transparent",
        },
        ticks: {
          color: "#757575",
          font: {
            size: 9
          }
        },
      },
      y: {
        grid: {
          tickColor: "transparent",
          borderColor: "transparent",
          color: "#C2C2C2",
          borderDash: [7, 5],
        },
        ticks: {
          color: "#757575",
          font: {
            size: 9
          }
        },
        // grace: '50%'
      },
    },
    layout: {
      padding: "1em",
    },
    onClick: function (evt, element) {
      // if (clicked?.month) setSelectedMonth(clicked?.month);
      // scrollSmoothHandler();
    },
  };

  const data = {
    labels: chartData?.ketersediaan?.map((item) => item.periode),
    datasets: [
      {
        label: chartLegends[0]?.title,
        data: showLine?.ketersediaan
          ? chartData?.ketersediaan?.map((item) => item.persentase?.toFixed(2))
          : [],
        borderColor: chartLegends[0]?.color,
        backgroundColor: chartLegends[0]?.color,
        pointStyle: false,
        tension: 0.5,
      },
      {
        label: chartLegends[1]?.title,
        data: showLine?.keterjangkauan
          ? chartData?.keterjangkauan?.map((item) =>
              item.persentase?.toFixed(2)
            )
          : [],
        borderColor: chartLegends[1]?.color,
        backgroundColor: chartLegends[1]?.color,
        pointStyle: false,
        tension: 0.5,
      },
      {
        label: chartLegends[2]?.title,
        data: showLine?.pemanfaatan
          ? chartData?.pemanfaatan?.map((item) => item.persentase?.toFixed(2))
          : [],
        borderColor: chartLegends[2]?.color,
        backgroundColor: chartLegends[2]?.color,
        pointStyle: false,
        tension: 0.5,
        // borderDash:  [15, 10],
      },
    ],
  };

  return (
    <Box sx={{ borderRadius: "20px", background: "#F8FCFB", my: 5, fontSize: mobileTab ? "12px" : "16px", boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.10)' }}>
      <Grid
        container
        direction="row"
        spacing={1}
        className="p-5"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xl={4} lg={12} md={12} sm={12}>
          <Typography className="font-lato-500" fontSize="1.8em" color='#008444'>
            Perkembangan Ketahanan Pangan
          </Typography>
        </Grid>
        <Grid item xl={8} lg={12} md={12} sm={12} className={!mobileTab ? "flex gap-3 justify-end items-center" : ""}>
          <Box className={`flex gap-1 ${mobileTab && "w-full mb-3 justify-between"}`}>
            <ChartLegend
              mobileTab={mobileTab}
              setShowLine={setShowLine}
              showLine={showLine}
              data={chartLegends[0]}
            />
            <ChartLegend
              mobileTab={mobileTab}
              setShowLine={setShowLine}
              showLine={showLine}
              data={chartLegends[1]}
            />
            <ChartLegend
              mobileTab={mobileTab}
              setShowLine={setShowLine}
              showLine={showLine}
              data={chartLegends[2]}
            />
          </Box>
          <ChartFilterTabs
            handleChangeTabs={handleChangeTabs}
            params={params}
          />
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: "#757575" }} />

      <Box className="w-full p-5">
        <Line options={options} data={data} style={{ minHeight: mobileTab ? "300px" : "500px" }} />
      </Box>
    </Box>
  );
}
