import * as React from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";
import _ from "lodash";
import { CustomSelect, TextWithIcon } from "@/components/_legacy";
import { convertKeyToLabel } from "@/utils/common";
import { comodityIconList, comodityList } from "@/utils/constant";
import { LinearProgress } from "@mui/material";
import getDashboardData from "@/utils/executive-dashboard/getDataDashboard";
import { useDashboard, useDashboardDispatch } from "context/dashboardContext";
import { checkIsLoggedIn } from "@/server/auth";
import StatusReference from "@/components/pages/executive/statusReference";
import Custom403 from "@/components/pages/executive/403";
import dayjs from "dayjs";
import CustomDatePicker from "@/components/_legacy/CustomDatePicker";

const Container = dynamic(() => import("@/components/atoms/container"));
const DashboardLayout = dynamic(() =>
  import("@/components/pages/executive/DashboardLayout")
);
const DashboardBreadcrumbs = dynamic(() =>
  import("@/components/pages/executive/DashboardBreadcrumbs")
);
const Cards = dynamic(() =>
  import("@/components/pages/executive/keterjangkauan/hargaPangan/Cards")
);
const MapsAndCards = dynamic(() =>
  import("@/components/pages/executive/keterjangkauan/hargaPangan/MapsAndCards")
);
const HistoryTable = dynamic(() =>
  import("@/components/pages/executive/keterjangkauan/hargaPangan/HistoryTable")
);
const HistoryChart = dynamic(() =>
  import("@/components/pages/executive/keterjangkauan/hargaPangan/HistoryChart")
);

const HargaPangan = ({ BASE_URL_API_V2_CLIENT, BASE_URL_API_V4_CLIENT }) => {
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
  const [tableData, setTableData] = React.useState([]);
  const [cardData, setCardData] = React.useState([]);
  const [mapData, setMapData] = React.useState([]);
  const [mapCardData, setMapCardData] = React.useState([]);
  const [params, setParams] = React.useState({
    date:
      dashboardParams?.date || dayjs().subtract(1, "days").format("YYYY-MM-DD"),
    range: '2week',
    selectedTab: 0,
    commodity: dashboardParams?.commodity || "3001",
    show_extra: true,
  });

  const handleChangeTabs = (selected) => {
    setParams({ ...params, ...selected });
  };

  const getData = async () => {
    setLoading(true);
    const data = await getDashboardData({
      BASE_URL: BASE_URL_API_V4_CLIENT,
      url: `/dashboard/keterjangkauan/silinda-price`,
      params,
      last_page: `/executive/keterjangkauan/harga`,
    });

    setDashboardResponse(data);
    setCardData(data?.data?.data?.card_data);
    setChartData(data?.data?.data?.chart);
    setTableData(data?.data?.data?.table);

    const maps = data?.data?.data?.map_data;
    const modifiedMaps = maps?.map((row) => {
      const tooltip = `<h2 style="font-weight: bold; text-transform: capitalize;">${convertKeyToLabel(
        row?.nama_kabupaten_kota
      )}</h2>
            <p>Harga: ${row?.harga?.toFixed(0)}</p>
            <p>Status: ${row?.status}</p>
          `;
      return {
        ...row,
        tooltip,
      };
    });
    setMapData(modifiedMaps);

    const mapCards = data?.data?.data?.map_card_data;
    const titles = [
      "Harga Rata-rata Provinsi",
      "Harga Tertinggi",
      "Harga Terendah",
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
      dashboardDispatch({ params });
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const [commodities, setCommodities] = React.useState([]);
  React.useEffect(() => {
    let arr = [];
    for (const key in comodityList) {
      if (Object.hasOwnProperty.call(comodityList, key)) {
        arr.push({
          value: key,
          label: (
            <TextWithIcon
              text={convertKeyToLabel(comodityList[key])}
              icon={comodityIconList[key]}
            />
          ),
        });
      }
    }
    setCommodities(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comodityList]);

  if (dashboardResponse === 403) return <Custom403 />
  return (
    <DashboardLayout selectedMenu={2} pilar="keterjangkauan" loading={loading} BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT}>
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
              pilar="keterjangkauan"
              currentPage="Harga Pangan"
            />
            <Box
              sx={{ width: mobileTab ? "100%" : "550px" }}
              className={`${mobileTab ? "" : "flex gap-2 justify-end"}`}
            >
              <Box
                className={`${mobileTab ? "py-2" : ""}`}
                sx={{ width: mobileTab ? "100%" : "270px" }}
              >
                <CustomDatePicker
                  disableFuture
                  minDate={dayjs("2022-01-01")}
                  value={params?.date}
                  setValue={(val) =>
                    setParams({
                      ...params,
                      date: dayjs(val).format("YYYY-MM"),
                    })
                  }
                />
              </Box>
              <Box
                className={`${mobileTab ? "py-2" : ""}`}
                sx={{ width: mobileTab ? "100%" : "270px" }}
              >
                <CustomSelect
                  value={params.commodity}
                  placeholder={
                    commodities.find(
                      (commodity) =>
                        commodity.value?.toString() ===
                        params.commodity?.toString()
                    )?.label
                  }
                  options={commodities}
                  onChange={(value) => {
                    setParams({ ...params, commodity: value });
                  }}
                  buttonStyle={{
                    paddingTop: "5.5px",
                    paddingBottom: "5.5px",
                  }}
                />
              </Box>
            </Box>
          </Box>
          {!mobileTab && loading && <LinearProgress color="success" />}
          <Cards cardData={cardData} />
          <MapsAndCards
            mapData={mapData}
            mapCardData={mapCardData}
            url="/executive/keterjangkauan/harga/detail"
            queryParams={{ commodity: params.commodity, date: params.date }}
            loading={loading}
          />
          <StatusReference />
          <HistoryChart
            chartData={chartData}
            handleChangeTabs={handleChangeTabs}
            params={params}
            loading={loading}
          />
          <HistoryTable data={tableData} />
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

export default HargaPangan;
