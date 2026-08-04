import * as React from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";
import _ from "lodash";
import moment from "moment";
import {
  comodityIconList,
  comodityList,
  districtOrCityList,
} from "@/utils/constant";
import { CustomSelect, TextWithIcon } from "@/components/_legacy";
import { convertKeyToLabel } from "@/utils/common";
import { useRouter } from "next/router";
import { LinearProgress } from "@mui/material";
import getDashboardData from "@/utils/executive-dashboard/getDataDashboard";
import { checkIsLoggedIn } from "@/server/auth";
import { useDashboard, useDashboardDispatch } from "context/dashboardContext";
import Custom403 from "@/components/pages/executive/403";

const DashboardLayout = dynamic(() =>
  import("@/components/pages/executive/DashboardLayout")
);
const Container = dynamic(() => import("@/components/atoms/container"));
const DashboardBreadcrumbs = dynamic(() =>
  import("@/components/pages/executive/DashboardBreadcrumbs")
);
const Chart = dynamic(() =>
  import("@/components/pages/executive/ketersediaan/neracaPanganDetail/Chart")
);
const DetailTable = dynamic(() =>
  import("@/components/pages/executive/ketersediaan/neracaPanganDetail/Table")
);

const NeracaPanganDetail = ({ BASE_URL_API_V2_CLIENT, BASE_URL_API_V4_CLIENT }) => {
  const { dashboardParams } = useDashboard();
  const dashboardDispatch = useDashboardDispatch();
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
    date: router.query?.date || dayjs().subtract(1, "month").startOf("month").format("YYYY-MM"),
    range: 12,
    selectedTab: 0,
    commodity: router.query?.commodity || "3001",
    show_extra: true,
  });
  const [commodities, setCommodities] = React.useState([]);
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
  const placeholder = commodities.find(
    (item) => item?.value?.toString() === params.commodity?.toString()
  )?.label;

  const [chartData, setChartData] = React.useState(null);
  const getData = async () => {
    setLoading(true);
    const data = await getDashboardData({
      BASE_URL: BASE_URL_API_V4_CLIENT,
      url: `/dashboard/ketersediaan/neraca/detail`,
      params,
      last_page: `/executive/ketersediaan/neraca/detail?commodity=${params.commodity}&kode_kabupaten=${params.city}`,
    });

    setDashboardResponse(data);
    setChartData(data?.data?.data);

    setLoading(false);
  };

  React.useEffect(() => {
    if (params.city) {
      dashboardDispatch({ params: {...dashboardParams, commodity: params.commodity} });
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (dashboardResponse === 403) return <Custom403 />
  return (
    <DashboardLayout selectedMenu={2} pilar="ketersediaan" loading={loading} BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT}>
      <Box>
        <Container maxWidth="xl">
          <Box
            className={`${
              !isMobile
                ? "flex items-center justify-between py-5"
                : "text-center pt-5"
            }`}
          >
            <DashboardBreadcrumbs pilar="ketersediaan" currentPage="Neraca" />
            <Box
              sx={{ maxWidth: "600px" }}
              className={`${mobileTab ? "" : "flex-1 flex gap-2 items-center"}`}
            >
              <CustomSelect
                style={{ paddingBottom: "1em" }}
                value={params.city}
                placeholder={
                  cityOptions.find(
                    (city) => city.value?.toString() === params.city?.toString()
                  )?.label
                }
                options={cityOptions}
                onChange={(value) => setParams({ ...params, city: value })}
              />
              <CustomSelect
                style={{ paddingBottom: "1em" }}
                value={params.commodity}
                placeholder={placeholder}
                options={commodities}
                onChange={(value) => {
                  setParams({ ...params, commodity: value });
                }}
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
      BASE_URL_API_V4_CLIENT: process.env.BASE_URL_API_V4_CLIENT,
    },
  };
};

export default NeracaPanganDetail;
