import React from "react";
import dynamic from "next/dynamic";
import useMediaQuery from "@/hooks/useMediaQuery";

import { Box, LinearProgress } from "@mui/material";

import { convertKeyToLabel } from "@/utils/common";
import getDashboardData from "@/utils/executive-dashboard/getDataDashboard";
import { useDashboard, useDashboardDispatch } from "context/dashboardContext";
import { checkIsLoggedIn } from "@/server/auth";
import Custom403 from "@/components/pages/executive/403";
import MonthPicker from "@/components/_legacy/MonthPicker";
import dayjs from "dayjs";

const Container = dynamic(() => import("@/components/atoms/container"));
const DashboardLayout = dynamic(() =>
  import("@/components/pages/executive/DashboardLayout")
);
const DashboardBreadcrumbs = dynamic(() =>
  import("@/components/pages/executive/DashboardBreadcrumbs")
);
const StatusReference = dynamic(() =>
  import("@/components/pages/executive/statusReference")
);
const Cards = dynamic(() =>
  import("@/components/pages/executive/komposit/Cards")
);
const MapsAndCards = dynamic(() =>
  import("@/components/pages/executive/komposit/MapsAndCards")
);
const Summary = dynamic(() =>
  import("@/components/pages/executive/komposit/Summary")
);
const HistoryTable = dynamic(() =>
  import("@/components/pages/executive/komposit/HistoryTable")
);
const HistoryChart = dynamic(() =>
  import("@/components/pages/executive/komposit/HistoryChart")
);

const chartTitle = "Perkembangan Komposit Pemanfaatan Provinsi Jawa Barat";

const Pemanfaatan = ({ BASE_URL_API_V2_CLIENT, BASE_URL_API_V4_CLIENT }) => {
  const { dashboardParams } = useDashboard();
  const dashboardDispatch = useDashboardDispatch();
  const { isMobile, isTablet } = useMediaQuery();
  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const [dashboardResponse, setDashboardResponse] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [analysis, setAnalysis] = React.useState({});
  const [chartData, setChartData] = React.useState([]);
  const [cardData, setCardData] = React.useState([]);
  const [mapData, setMapData] = React.useState([]);
  const [mapCardData, setMapCardData] = React.useState([]);
  const [params, setParams] = React.useState({
    date:
      dayjs(dashboardParams?.date).subtract(1, "year").format("YYYY-MM") || dayjs().subtract(1, "year").format("YYYY-MM"),
    range: 12,
    selectedTab: 0,
    show_extra: true,
  });

  const handleChangeTabs = (selected) => {
    setParams({ ...params, ...selected });
  };

  const getData = async () => {
    setLoading(true);
    const data = await getDashboardData({
      BASE_URL: BASE_URL_API_V4_CLIENT,
      url: `/dashboard/pemanfaatan/composite`,
      last_page: "/executive/pemanfaatan",
      params: {
        ...params,
        range: params.range === 0 ? undefined : params.range,
        selectedTab: undefined
      },
    });

    setDashboardResponse(data);
    setAnalysis(data?.data?.data?.analysis);
    setCardData(data?.data?.data?.card_data);
    setChartData(data?.data?.data?.chart_and_table);

    const status_label = ["", "Rentan", "Waspada", "Aman"];

    const maps = data?.data?.data?.map_data;
    const modifiedMaps = maps?.map((row) => {
      const tooltip = `<h2 style="font-weight: bold; text-transform: capitalize;">${convertKeyToLabel(
        row?.nama_kabupaten_kota
      )}</h2>
          <p>Skor Pemanfaatan: ${row?.pemanfaatan?.toFixed(0)}%</p>
          <p>Status: ${status_label[row?.status_number]}</p>
        `;
      return {
        ...row,
        tooltip,
      };
    });
    setMapData(modifiedMaps);

    const mapCards = data?.data?.data?.map_card_data;
    const titles = [
      "Skor Komposit Provinsi",
      "Skor Komposit Tertinggi",
      "Skor Komposit Terendah",
    ];
    const modifiedMapCards = mapCards?.map((row, idx) => {
      const title = titles[idx];
      return {
        ...row,
        title,
      };
    });
    setMapCardData(modifiedMapCards);
    setLoading(false);
  };

  React.useEffect(() => {
    if (params.date && params.range) {
      // dashboardDispatch({ params });
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (dashboardResponse === 403) return <Custom403 />
  return (
    <DashboardLayout selectedMenu={1} pilar="pemanfaatan" loading={loading} BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT}>
      <Box>
        <Container maxWidth="xl">
          <Box
            className={`${
              !isMobile
                ? "flex items-center justify-between py-5"
                : "text-center py-5"
            }`}
          >
            <DashboardBreadcrumbs pilar="pemanfaatan" currentPage="Komposit Pola Pangan Harapan (PPH)" />
            <Box sx={{ width: mobileTab ? "100%" : "270px" }}>
              <MonthPicker
                disableFuture
                minDate={dayjs("2022-01-01")}
                value={params?.date}
                setValue={(val) =>
                  setParams({
                    ...params,
                    date: dayjs(val).format("YYYY-MM-DD"),
                  })
                }
              />
            </Box>
          </Box>
          {!mobileTab && loading && <LinearProgress color="success" />}
          <Cards cardData={cardData} />
          <MapsAndCards
            mapData={mapData}
            mapCardData={mapCardData}
            url="/executive/pemanfaatan/detail"
            loading={loading}
            pilar="pemanfaatan"
          />
          <StatusReference />
          <Summary
            analysis={analysis}
            params={params}
            url={`${BASE_URL_API_V4_CLIENT}/dashboard/analysis/utilization`}
            getData={getData}
          />
          <HistoryChart
            chartData={chartData}
            handleChangeTabs={handleChangeTabs}
            params={params}
            loading={loading}
            chartTitle={chartTitle}
          />
          <HistoryTable data={chartData} />
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  if (!checkIsLoggedIn(ctx.req)) {
    return {
      redirect: {
        destination: "/auth/login",
      },
    };
  }
  return {
    props: {
      BASE_URL_API_V2_CLIENT: process.env.BASE_URL_API_V2_CLIENT,
      BASE_URL_API_V4_CLIENT: process.env.BASE_URL_API_V4_CLIENT,
    },
  };
};

export default Pemanfaatan;
