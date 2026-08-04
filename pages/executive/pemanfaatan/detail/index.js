import * as React from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";
import _ from "lodash";
import { CustomSelect } from "@/components/_legacy";
import { LinearProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { districtOrCityList, kelompok_pangan_list } from "@/utils/constant";
import getDashboardData from "@/utils/executive-dashboard/getDataDashboard";
import { useDashboard, useDashboardDispatch } from "context/dashboardContext";
import { checkIsLoggedIn } from "@/server/auth";
import Custom403 from "@/components/pages/executive/403";
import dayjs from "dayjs";
import MonthPicker from "@/components/_legacy/MonthPicker";
import { convertKeyToLabel } from "@/utils/common";

const Container = dynamic(() => import("@/components/atoms/container"));
const DashboardLayout = dynamic(() =>
  import("@/components/pages/executive/DashboardLayout")
);
const DashboardBreadcrumbs = dynamic(() =>
  import("@/components/pages/executive/DashboardBreadcrumbs")
);
const Chart = dynamic(() =>
  import("@/components/pages/executive/pemanfaatan/kompositDetail/Chart")
);
const DetailTable = dynamic(() =>
  import("@/components/pages/executive/pemanfaatan/kompositDetail/Table")
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
    year: dayjs(dashboardParams?.date).subtract(1, "year").format("YYYY"),
    range: 3,
    selectedTab: 0,
    show_extra: true,
    kelompok_pangan: "padi_padian",
  });

  const [dashboardResponse, setDashboardResponse] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [chartData, setChartData] = React.useState(null);
  const [listData, setListData] = React.useState([]);
  const [legends, setLegends] = React.useState([]);
  const [cityOptions, setCityOptions] = React.useState([]);
  const [kelompokPanganOptions, setKelompokPanganOptions] = React.useState([]);
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
    let list = [];
    if (kelompok_pangan_list) {
      kelompok_pangan_list.forEach((element) => {
        list.push({
          value: element,
          label: convertKeyToLabel(element),
        });
      });
    }
    setKelompokPanganOptions(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kelompok_pangan_list]);

  const chartLegends = [
    {
      title: "Konsumsi Pangan",
      slug: "konsumsi_pangan",
    },
    {
      title: "Konsumsi Energi",
      slug: "konsumsi_energi",
    },
    {
      title: "Konsumsi Protein",
      slug: "konsumsi_protein",
    },
  ];

  const handleChangeTabs = (selected) => {
    setParams({ ...params, ...selected });
  };

  const getData = async () => {
    setLoading(true);
    const data = await getDashboardData({
      BASE_URL: BASE_URL_API_V4_CLIENT,
      url: `/dashboard/pemanfaatan/composite/detail`,
      last_page: `/executive/pemanfaatan/detail?kode_kabupaten=${params.city}`,
      params: {
        ...params,
        range: params.range === 0 ? undefined : params.range,
        selectedTab: undefined,
      },
    });

    setDashboardResponse(data);
    setChartData(data?.data?.data);
    setListData(data?.data?.data);

    const legend = [];
    if (data?.data?.data[0] && data?.data?.data[0].konsumsi_pangan) {
      for (var key in data?.data?.data[0].konsumsi_pangan) {
        if (data?.data?.data[0].konsumsi_pangan.hasOwnProperty(key) && key != 'total') {
          legend.push(key);
        }
      }
    }
    setLegends(legend);
    setLoading(false);
  };

  React.useEffect(() => {
    if (params.city) {
      dashboardDispatch({ params });
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  if (dashboardResponse === 403) return <Custom403 />;
  return (
    <DashboardLayout
      selectedMenu={1}
      pilar="pemanfaatan"
      BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT}
    >
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
            <Box
              sx={{ width: mobileTab ? "100%" : "550px" }}
              className={`${mobileTab ? "" : "flex gap-2 justify-end"}`}
            >
              {/* <Box sx={{ width: mobileTab ? "100%" : "250px", pb: 2 }}>
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
              </Box> */}
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
              <Box sx={{ width: mobileTab ? "100%" : "250px" }}>
                {kelompokPanganOptions.length > 0 && (
                  <CustomSelect
                    value={params.kelompok_pangan}
                    placeholder={
                      kelompokPanganOptions.find(
                        (kelompok_pangan) =>
                          kelompok_pangan.value?.toString() ===
                          params.kelompok_pangan?.toString()
                      )?.label
                    }
                    options={kelompokPanganOptions}
                    onChange={(value) =>
                      setParams({ ...params, kelompok_pangan: value })
                    }
                  />
                )}
              </Box>
            </Box>
          </Box>
          {!mobileTab && loading && <LinearProgress color="success" />}
          <Typography className="font-lato-500 pt-3" fontSize="1.8em">
            Perkembangan Pemanfaatan Berdasarkan Pola Pangan Harapan
          </Typography>
          <Chart
            chartData={chartData}
            chartLegends={chartLegends}
            params={params}
            handleChangeTabs={handleChangeTabs}
            legends={legends}
          />
          <DetailTable
            data={listData}
            chartLegends={chartLegends}
            params={params}
            legends={legends}
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
