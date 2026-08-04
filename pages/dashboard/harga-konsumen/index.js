import React from "react";
import dynamic from "next/dynamic";
import useMediaQuery from "@/hooks/useMediaQuery";

import { Box, LinearProgress } from "@mui/material";

import WeekPicker from "@/components/_legacy/WeekPicker";
import { convertKeyToLabel } from "@/utils/common";
import moment from "moment";
import getDashboardData from "@/utils/executive-dashboard/getDataDashboard";
import { useDashboard, useDashboardDispatch } from "context/dashboardContext";
import { checkIsLoggedIn } from "@/server/auth";
import Custom403 from "@/components/pages/executive/403";

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

const chartTitle = "Perkembangan Komposit Ketersediaan Provinsi Jawa Barat";

const Ketersediaan = ({ BASE_URL_API_V2_CLIENT }) => {
  const { dashboardParams } = useDashboard();
  const dashboardDispatch = useDashboardDispatch();

  const { isMobile, isTablet } = useMediaQuery();
  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const [dashboardResponse, setDashboardResponse] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [chartData, setChartData] = React.useState([]);
  const [analysis, setAnalysis] = React.useState({});
  const [cardData, setCardData] = React.useState([]);
  const [mapData, setMapData] = React.useState([]);
  const [mapCardData, setMapCardData] = React.useState([]);
  const [params, setParams] = React.useState({
    date:
      dashboardParams?.date ||
      moment().subtract(7, "days").weekday(0).format("YYYY-MM-DD"),
    range: 12,
    selectedTab: 2,
  });

  const handleChangeTabs = (selected) => {
    setParams({ ...params, ...selected });
  };

  const getData = async () => {
    setLoading(true);
    const data = await getDashboardData({
      BASE_URL: BASE_URL_API_V2_CLIENT,
      url: `/dashboard/ketersediaan/composite?date=${params.date}&range=${params.range}`,
      last_page: "/executive/ketersediaan",
    });

    setDashboardResponse(data);
    setAnalysis(data?.data?.data?.analysis || {});
    setCardData(data?.data?.data?.card_data || []);
    setChartData(data?.data?.data?.chart_and_table || []);

    const maps = data?.data?.data?.map_data;
    const modifiedMaps = maps?.map((row) => {
      const tooltip = `<h2 style="font-weight: bold; text-transform: capitalize;">${convertKeyToLabel(
        row?.nama_kabupaten_kota
      )}</h2>
          <p>Skor Ketersediaan: ${row?.skor_ketersediaan?.toFixed(0)}%</p>
          <p>Status: ${row?.status}</p>
        `;
      return {
        ...row,
        tooltip,
      };
    });
    setMapData(modifiedMaps || []);

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
    setMapCardData(modifiedMapCards || []);
    setLoading(false);
  };

  React.useEffect(() => {
    if (params.date && params.range) {
      dashboardDispatch({ params });
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (dashboardResponse === 403) return <Custom403 />
  return (
    <DashboardLayout selectedMenu={1} pilar="ketersediaan" loading={loading} BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT}>
      <Box>
        <Container maxWidth="xl">
          <Box
            className={`${
              !isMobile
                ? "flex items-center justify-between py-5"
                : "text-center py-5"
            }`}
          >
            <DashboardBreadcrumbs pilar="ketersediaan" currentPage="Komposit" />
            <Box sx={{ width: mobileTab ? "100%" : "270px" }}>
              <WeekPicker
                disableFuture
                minDate={moment("2022-01-01")}
                value={params?.date}
                setValue={(val) =>
                  setParams({
                    ...params,
                    date: moment(val).format("YYYY-MM-DD"),
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
            url="/executive/ketersediaan/detail"
            loading={loading}
          />
          <StatusReference />
          <Summary
            analysis={analysis}
            params={params}
            url={`${BASE_URL_API_V2_CLIENT}/dashboard/analisis/ketersediaan`}
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
    },
  };
};

export default Ketersediaan;
