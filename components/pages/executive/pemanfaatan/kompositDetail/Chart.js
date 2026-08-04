import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useMediaQuery from "@/hooks/useMediaQuery";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { FiberManualRecord } from "@mui/icons-material";
import ChartFilterTabs from "../../ChartFilterTabs";
import { convertKeyToLabel } from "@/utils/common";
import { colors } from "@/utils/constant";
import { BarElement } from "chart.js";

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function Chart({
  chartData,
  chartLegends,
  handleChangeTabs,
  params,
  legends,
}) {
  const { isMobile, isTablet } = useMediaQuery();
  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );
  const [showLine, setShowLine] = React.useState("konsumsi_pangan");

  const [datasets, setDatasets] = React.useState([]);
  React.useEffect(() => {
    const chartBar = [];
    if (chartData) {
      chartData.forEach((chart) => {
        for (var key in chart) {
          if (chart.hasOwnProperty(key) && key == showLine) {
            chartBar.push({ ...chart[key], tahun: chart.tahun });
          }
        }
      });

      const datasets = legends.map((legend, idx) => ({
        label: legend,
        data: chartBar?.map((item) => item[legend]),
        barPercentage: 0.35,
        borderRadius: 15,
        borderSkipped: false,
        backgroundColor: colors[idx],
      }));
      setDatasets(datasets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartLegends, showLine, chartData]);

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
            size: 9,
          },
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
            size: 9,
          },
        },
        // grace: '50%'
      },
    },
    layout: {
      padding: "20px",
    },
    onClick: function (evt, element) {
      // if (clicked?.month) setSelectedMonth(clicked?.month);
      // scrollSmoothHandler();
    },
  };

  const data = {
    labels: chartData?.map((item) => item.tahun),
    datasets,
  };

  return (
    <Box sx={{ borderRadius: "20px", background: "#F8FCFB", my: 5 }}>
      <Grid
        container
        direction="row"
        spacing={1}
        className="p-5 pt-1"
        alignItems="center"
      >
        <Grid item md={12} sm={12} xs={12}>
          <Box
            className={`${mobileTab ? "" : "flex gap-3 items-top justify-end"}`}
          >
            <ChartFilterTabs
              handleChangeTabs={handleChangeTabs}
              params={params}
              tabsFilter="2"
            />
          </Box>
        </Grid>
        <Grid item md={12} sm={12} xs={12} className="flex justify-center">
          <Box className="flex gap-3">
            {legends.map((element, i) => (
              <Box className={`${mobileTab && "flex-1"} flex items-center p-2`} key={i}>
                <FiberManualRecord sx={{ color: colors[i] }} />
                <Typography color="#1E1B39" className="capitalize">
                  {convertKeyToLabel(element)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item md={12} sm={12} xs={12} className="flex justify-center">
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={showLine}
              onChange={(e) => setShowLine(e.target.value)}
            >
              {chartLegends.map((item, i) => (
                <FormControlLabel
                  value={item.slug}
                  control={<Radio color="success" />}
                  label={item.title}
                  key={i}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: "#757575", mt: 5 }} />

      <Box className="w-full py-10">
        <Bar
          options={options}
          data={data}
          style={{ minHeight: mobileTab ? "300px" : "500px" }}
        />
      </Box>
      <Typography color="#1E1B39" fontSize="0.8em" fontFamily="Inter">
        Sumber: Dinas Ketahanan Pangan dan Peternakan (2024)
      </Typography>
    </Box>
  );
}
