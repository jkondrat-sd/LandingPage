import * as React from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";
import _ from "lodash";
import { LinearProgress, Typography } from "@mui/material";
import { convertKeyToLabel } from "@/utils/common";
import getDashboardData from "@/utils/executive-dashboard/getDataDashboard";
import { useDashboard, useDashboardDispatch } from "context/dashboardContext";
import { checkIsLoggedIn } from "@/server/auth";
import StatusReference from "@/components/pages/executive/statusReference";
import Custom403 from "@/components/pages/executive/403";
import dayjs from "dayjs";
import MonthPicker from "@/components/_legacy/MonthPicker";

const Container = dynamic(() => import("@/components/atoms/container"));
const DashboardLayout = dynamic(() =>
  import("@/components/pages/executive/DashboardLayout")
);
const DashboardBreadcrumbs = dynamic(() =>
  import("@/components/pages/executive/DashboardBreadcrumbs")
);
const Cards = dynamic(() =>
  import("@/components/pages/executive/komposit/Cards")
);
const MapsAndCards = dynamic(() =>
  import("@/components/pages/executive/pemanfaatan/skorPPH/MapsAndCards")
);
const HistoryTable = dynamic(() =>
  import("@/components/pages/executive/pemanfaatan/skorPPH/HistoryTable")
);
const HistoryChart = dynamic(() =>
  import("@/components/pages/executive/pemanfaatan/skorPPH/HistoryChart")
);

const SkorPPH = ({ BASE_URL_API_V2_CLIENT }) => {
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
  const [cardData, setCardData] = React.useState([]);
  const [mapData, setMapData] = React.useState([]);
  const [mapCardData, setMapCardData] = React.useState([]);
  const [params, setParams] = React.useState({
    date:
      dashboardParams?.date ||
      dayjs().subtract(1, "month").startOf("month").format("YYYY-MM-DD"),
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
      url: `/dashboard/pemanfaatan/gizi?date=${params.date}&range=${params.range}`,
      last_page: `/executive/pemanfaatan/gizi`,
    });

    setDashboardResponse(data);
    setCardData(data?.data?.data?.card_data);
    setChartData(data?.data?.data?.chart_and_table);

    const maps = data?.data?.data?.map_data;
    const labels = ["", "Rentan", "Waspada", "Aman"];
    const modifiedMaps = maps?.map((row) => {
      const tooltip = `<h2 style="font-weight: bold; text-transform: capitalize;">${convertKeyToLabel(
        row?.nama_kabupaten_kota
      )}</h2>
            <p>Skor pemanfaatan: ${row?.score?.toFixed(0)}</p>
            <p>Status: ${labels[row?.status_number]}</p>
          `;
      return {
        ...row,
        tooltip,
      };
    });
    setMapData(modifiedMaps);

    const mapCards = data?.data?.data?.map_card_data;
    const titles = ["Skor PPH Provinsi", "Skor PPH Tertinggi", "Skor PPH Terendah"];
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
      dashboardDispatch({ params });
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (dashboardResponse === 403) return <Custom403 />
  return (
    <DashboardLayout selectedMenu={2} pilar="pemanfaatan" loading={loading} BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT}>
      <Box>
        <Container maxWidth="xl">
          <Box
            className={`${
              !isMobile
                ? "flex items-center justify-between py-5"
                : "text-center py-5"
            }`}
          >
            <DashboardBreadcrumbs
              pilar="pemanfaatan"
              currentPage="Skor PPH"
            />
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
            url="/executive/pemanfaatan/skor-pph/detail"
            loading={loading}
          />
          <StatusReference note="*Penentuan skor maksimal tiap kelompok pangan berdasarkan pada Aplikasi Harmonisasi PPH Susenas (2023)" />
          <Typography fontFamily="Inter" fontSize="0.8rem" color="#1E1B39">
            Sumber Data: Dinas Ketahanan Pangan dan Peternakan Provinsi Jawa Barat
          </Typography>
          <HistoryChart
            chartData={chartData}
            handleChangeTabs={handleChangeTabs}
            params={params}
            loading={loading}
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

export default SkorPPH;
