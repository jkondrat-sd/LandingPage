import * as React from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";
import _ from "lodash";
import moment from "moment";
import { districtOrCityList } from "@/utils/constant";
import { CustomSelect } from "@/components/_legacy";
import { LinearProgress } from "@mui/material";
import getDashboardData from "@/utils/executive-dashboard/getDataDashboard";
import { checkIsLoggedIn } from "@/server/auth";
import Custom403 from "@/components/pages/executive/403";
import { useRouter } from "next/router";

const Container = dynamic(() => import("@/components/atoms/container"));
const DashboardLayout = dynamic(() =>
  import("@/components/pages/executive/DashboardLayout")
);
const DashboardBreadcrumbs = dynamic(() =>
  import("@/components/pages/executive/DashboardBreadcrumbs")
);
const Chart = dynamic(() =>
  import("@/components/pages/executive/pemanfaatan/skorPPHDetail/Chart")
);
const DetailTable = dynamic(() =>
  import("@/components/pages/executive/pemanfaatan/skorPPHDetail/Table")
);

const SkorPPHDetail = ({ BASE_URL_API_V2_CLIENT }) => {
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
    group_by: "week",
    selectedTab: 2,
    date_start: moment().startOf("year").format("YYYY-MM-DD"),
    date_end: moment().format("YYYY-MM-DD"),
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
      BASE_URL: BASE_URL_API_V2_CLIENT,
      url: `/dashboard/pemanfaatan/gizi/detail?city=${
        params.city
      }&date_start=${moment(params.date_start).format(
        "YYYY-MM"
      )}&date_end=${moment(params.date_end).format("YYYY-MM")}&group_by=${
        params.group_by
      }`,
      last_page: `/executive/pemanfaatan/gizi/detail?kode_kabupaten=${params.city}`,
    });

    setDashboardResponse(data);
    setChartData(data?.data?.data);

    setLoading(false);
  };

  React.useEffect(() => {
    if (params.city) {
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
          <Chart chartData={chartData} params={params} setParams={setParams} />
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
    },
  };
};

export default SkorPPHDetail;
