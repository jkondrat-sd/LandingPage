import * as React from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";
import _ from "lodash";
import {
  comodityColorList,
  comodityList,
  districtOrCityList,
} from "@/utils/constant";
import { CustomSelect } from "@/components/_legacy";
import { convertKeyToLabel } from "@/utils/common";
import WeekPicker from "@/components/_legacy/WeekPicker";
import { LinearProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import getDashboardData from "@/utils/executive-dashboard/getDataDashboard";
import { useDashboard, useDashboardDispatch } from "context/dashboardContext";
import { checkIsLoggedIn } from "@/server/auth";
import Custom403 from "@/components/pages/executive/403";
import MonthPicker from "@/components/_legacy/MonthPicker";
import dayjs from "dayjs";

const DashboardLayout = dynamic(() =>
  import("@/components/pages/executive/DashboardLayout")
);
const Container = dynamic(() => import("@/components/atoms/container"));
const Chart = dynamic(() =>
  import("@/components/pages/executive/komposit/detail/Chart")
);
const DetailTable = dynamic(() =>
  import("@/components/pages/executive/komposit/detail/Table")
);
const DashboardBreadcrumbs = dynamic(() =>
  import("@/components/pages/executive/DashboardBreadcrumbs")
);

const KompositDetail = ({ BASE_URL_API_V2_CLIENT, BASE_URL_API_V4_CLIENT }) => {
  const { dashboardParams } = useDashboard();
  const dashboardDispatch = useDashboardDispatch();
  const router = useRouter();
  const { isMobile, isTablet } = useMediaQuery();
  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const [params, setParams] = React.useState({
    city: router.query?.kode_kabupaten || "3201",
    date:
      dashboardParams?.date ||
      router.query?.date ||
      dayjs().subtract(1, "month").startOf("month").format("YYYY-MM"),
    range: 12,
    selectedTab: 0,
    show_extra: true,
  });

  const [dashboardResponse, setDashboardResponse] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [chartData, setChartData] = React.useState(null);
  const [listData, setListData] = React.useState([]);
  const [cityOptions, setCityOptions] = React.useState([]);
  const [chartLegends, setChartLegends] = React.useState([]);

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
    let legends = [];
    for (const key in comodityList) {
      if (Object.hasOwnProperty.call(comodityList, key)) {
        legends.push({
          title: convertKeyToLabel(comodityList[key]),
          color: comodityColorList[key],
          slug: comodityList[key],
        });
      }
    }
    setChartLegends(legends);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comodityList]);

  const handleChangeTabs = (selected) => {
    setParams({ ...params, ...selected });
  };

  const getData = async () => {
    setLoading(true);
    const data = await getDashboardData({
      BASE_URL: BASE_URL_API_V4_CLIENT,
      url: `/dashboard/keterjangkauan/composite/detail`,
      last_page: `/executive/keterjangkauan/detail?kode_kabupaten=${params.city}`,
      params: {
        ...params,
        range: params.range === 0 ? undefined : params.range,
        selectedTab: undefined
      },
    });

    setDashboardResponse(data);
    setChartData(data?.data?.data?.bar || []);
    setListData(data?.data?.data?.list || []);
    setLoading(false);
  };

  React.useEffect(() => {
    if (params.city) {
      dashboardDispatch({ params });
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (dashboardResponse === 403) return <Custom403 />
  return (
    <DashboardLayout selectedMenu={1} pilar="keterjangkauan" BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT}>
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
              currentPage="Komposit"
            />
            <Box
              sx={{ width: mobileTab ? "100%" : "550px" }}
              className={`${mobileTab ? "" : "flex gap-2 justify-end"}`}
            >
              <Box sx={{ width: mobileTab ? "100%" : "250px", pb: 2 }}>
                <MonthPicker
                  value={dayjs(params?.date)}
                  setValue={(val) =>
                    setParams({
                      ...params,
                      date: dayjs(val).format("YYYY-MM"),
                    })
                  }
                />
              </Box>
              <Box sx={{ width: mobileTab ? "100%" : "250px" }}>
                {cityOptions.length > 0 && (
                  <CustomSelect
                    value={params.city}
                    placeholder={
                      cityOptions.find(
                        (city) =>
                          city.value?.toString() === params.city?.toString()
                      )?.label
                    }
                    options={cityOptions}
                    onChange={(value) => setParams({ ...params, city: value })}
                  />
                )}
              </Box>
            </Box>
          </Box>
          {!mobileTab && loading && <LinearProgress color="success" />}
          <Typography className="font-lato-500 pt-3" fontSize="1.8em">
            Rincian Keterjangkauan Berdasarkan Harga Komoditas per KG dalam
            Rupiah
          </Typography>
          <Chart
            chartData={chartData}
            chartLegends={chartLegends}
            params={params}
            handleChangeTabs={handleChangeTabs}
            sumber_data="Sumber: SILINDA (2024)"
            pilar="keterjangkauan"
          />
          <DetailTable
            data={listData}
            chartLegends={chartLegends}
            params={params}
          />
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

export default KompositDetail;
