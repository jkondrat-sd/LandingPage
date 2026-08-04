import * as React from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";
import _ from "lodash";
import moment from "moment";
import { colors, districtOrCityList } from "@/utils/constant";
import { CustomSelect } from "@/components/_legacy";
import { useRouter } from "next/router";
import { LinearProgress } from "@mui/material";
import getDashboardData from "@/utils/executive-dashboard/getDataDashboard";
import { checkIsLoggedIn } from "@/server/auth";
import Custom403 from "@/components/pages/executive/403";
import dayjs from "dayjs";
import { useDashboard } from "context/dashboardContext";
import { convertKeyToLabel } from "@/utils/common";

const Container = dynamic(() => import("@/components/atoms/container"));
const DashboardLayout = dynamic(() =>
  import("@/components/pages/executive/DashboardLayout")
);
const DashboardBreadcrumbs = dynamic(() =>
  import("@/components/pages/executive/DashboardBreadcrumbs")
);
const Chart = dynamic(() =>
  import("@/components/pages/executive/gizi/statusGiziDetail/Chart")
);
const DetailTable = dynamic(() =>
  import("@/components/pages/executive/gizi/statusGiziDetail/Table")
);

const StatusGiziDetail = ({ BASE_URL_API_V2_CLIENT, BASE_URL_API_V4_CLIENT }) => {
  const { dashboardParams } = useDashboard();
  const router = useRouter();
  const { isMobile, isTablet } = useMediaQuery();
  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const [dashboardResponse, setDashboardResponse] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [params, setParams] = React.useState({
    city: router.query?.kode_kabupaten || "3201",
    group_by: "month",
    date:
      dashboardParams?.date ||
      dayjs().subtract(1, "month").startOf("month").format("YYYY-MM-DD"),
    selectedTab: 1,
    show_extra: true,
  });
  const [cityOptions, setCityOptions] = React.useState([]);
  React.useEffect(() => {
    let list = [];
    if (districtOrCityList) {
      for (var key in districtOrCityList) {
        if (districtOrCityList.hasOwnProperty(key) && key != 3200) {
          list.push({
            value: key,
            label: districtOrCityList[key]?.replaceAll("_", " "),
          });
        }
      }
    }
    setCityOptions(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtOrCityList]);

  const [chartData, setChartData] = React.useState(null);
  const getData = async () => {
    setLoading(true);
    const data = await getDashboardData({
      BASE_URL: BASE_URL_API_V4_CLIENT,
      url: `/dashboard/status-wasting/detail`,
      params: {
        ...params,
        selectedTab: undefined
      },
      last_page: `/executive/wasting/detail?kode_kabupaten=${params.city}`,
    });

    setDashboardResponse(data);
    setChartData(params.group_by === 'week' ? data?.data?.data?.weekly : (params.group_by === 'month' ? data?.data?.data?.monthly : data?.data?.data?.yearly));

    setLoading(false);
  };

  React.useEffect(() => {
    if (params.city) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const [chartLegends, setChartLegends] = React.useState([]);
  React.useEffect(() => {
    if (chartData && chartData.length > 0) {
      let legends = [];
      const data = chartData[0];
      let i = 0;
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key) && key !== 'bulan' && key !== 'tahun' && key !== 'periode' && key !== 'minggu' && key !== 'status') {
          legends.push({
            title: convertKeyToLabel(key),
            color: colors[i++],
            slug: key,
          });
        }
      }
      setChartLegends(legends);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

  if (dashboardResponse === 403) return <Custom403 />
  return (
    <DashboardLayout selectedMenu={3} pilar="gizi" loading={loading} BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT}>
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
              pilar="gizi"
              currentPage="Wasting"
            />
            <Box sx={{ width: mobileTab ? "100%" : "270px" }}>
              <CustomSelect
                value={params.city}
                placeholder={
                  cityOptions.find(
                    (city) => city.value?.toString() === params.city?.toString()
                  )?.label
                }
                options={cityOptions}
                onChange={(value) => setParams({ ...params, city: value })}
              />
            </Box>
          </Box>
          {!mobileTab && loading && <LinearProgress color="success" />}
          <Chart chartData={chartData} params={params} setParams={setParams} title="Wasting" chartLegends={chartLegends} />
          <DetailTable data={chartData} params={params} />
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

export default StatusGiziDetail;
