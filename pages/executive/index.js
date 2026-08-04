import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  ScopedCssBaseline,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Subtitle, Title } from "@/components/_legacy";
import Container from "@/components/atoms/container";
import useMediaQuery from "@/hooks/useMediaQuery";
import StatusReference from "@/components/pages/executive/statusReference";
import getDashboardData from "@/utils/executive-dashboard/getDataDashboard";
import { useDashboardDispatch } from "context/dashboardContext";
import { checkIsLoggedIn } from "@/server/auth";
import Custom403 from "@/components/pages/executive/403";
import dayjs from "dayjs";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import MonthPicker from "@/components/_legacy/MonthPicker";
import StatusReferenceInline from "@/components/pages/executive/statusReferenceInline";
import { convertKeyToLabel } from "@/utils/common";
import { styled } from '@mui/material/styles';

const AntTabs = styled(Tabs)({
  '& .Tabs-indicator': {
    height: "0px",
  },
  minHeight: "1em",
  padding: 'auto',
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  borderBottom: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: '400',
  fontSize: "0.8em",
  color: '#757575',
  padding: "0.5em 1em",
  minHeight: "2em",
  flex: '1',
  whiteSpace: 'nowrap',
  fontFamily: [
    'Lato',
  ].join(','),
  '&:hover': {
    color: '#008444',
    opacity: 0.8,
  },
  '&.Mui-selected': {
    color: '#ffffff',
    backgroundColor: '#008444',
    fontWeight: '400',
    borderRadius: "0.5em",
  }
}));

const tabsContent = [
  {
    label: "Dashboard Pilar Ketahanan Pangan",
    value: 0,
  },
  {
    label: "Dashboard Status Gizi",
    value: 1,
  },
];

// molecules
const Header = dynamic(() => import("@/components/molecules/header"));
const Footer = dynamic(() => import("@/components/molecules/footer"));

//child components
const DashboardCard = dynamic(() =>
  import("@/components/pages/executive/home/pilar/DashboardCard")
);
const HistoryChart = dynamic(() =>
  import("@/components/pages/executive/home/HistoryChart")
);
const HistoryTable = dynamic(() =>
  import("@/components/pages/executive/home/HistoryTable")
);
const Summary = dynamic(() =>
  import("@/components/pages/executive/komposit/Summary")
);

const statuses = ["", "Rentan", "Waspada", "Aman"];
const colors = ["", "#F44336", "#FFB900", "#008444"];
const backgrounds = ["", "#FFEBEE", "#FFF9E1", "#E6F6EC"];
const getStatusColor = (status) => {
  const index = statuses.indexOf(status[0]?.toUpperCase() + status?.slice(1));
  return colors[index];
};
const getStatusBg = (status) => {
  const index = statuses.indexOf(status[0]?.toUpperCase() + status?.slice(1));
  return backgrounds[index];
};

const Dashboard = ({ BASE_URL_API_V2_CLIENT, BASE_URL_API_V4_CLIENT }) => {
  const router = useRouter();

  const { isMobile, isTablet } = useMediaQuery();

  const dashboardDispatch = useDashboardDispatch();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const [dashboardResponse, setDashboardResponse] = React.useState(null);
  const [cardData, setCardData] = React.useState({});
  const [cardDetail, setCardDetail] = React.useState({});
  const [chartData, setChartData] = React.useState([]);
  const [listData, setListData] = React.useState([]);
  const [analysis, setAnalysis] = React.useState({});
  const [cardShow, setCardShow] = React.useState(0);
  const [isFirst, setIsFirst] = React.useState(true);

  const [params, setParams] = React.useState({
    city: 0,
    date: dayjs().format("YYYY-MM"),
    range: 12,
    selectedTab: 0,
  });
  const [loading, setLoading] = React.useState(false);

  const getData = async () => {
    setLoading(true);
    const data = await getDashboardData({
      BASE_URL: BASE_URL_API_V4_CLIENT,
      url: `/dashboard/home`,
      params: {
        ...params,
        range: params.range === 0 ? undefined : params.range,
        selectedTab: undefined,
      },
      last_page: "/executive",
    });
    setDashboardResponse(data);
    // setCardData(data?.data?.data?.stats || {});
    // setCardDetail(data?.data?.data?.stats_detail || {});
    setChartData(data?.data?.data?.line || []);
    let list = [];
    data?.data?.data?.line?.ketersediaan?.forEach((item) => {
      let keterjangkauan = data?.data?.data?.line?.keterjangkauan?.find(
        (el) => el.periode === item.periode
      );
      let pemanfaatan = data?.data?.data?.line?.pemanfaatan?.find(
        (el) => el.periode === item.periode
      );
      list.push({
        periode: item.periode,
        ketersediaan: item.persentase?.toFixed(0),
        keterjangkauan: keterjangkauan?.persentase?.toFixed(0),
        pemanfaatan: pemanfaatan?.persentase?.toFixed(0),
      });
    });
    data?.data?.data?.line?.keterjangkauan?.forEach((item) => {});
    setListData(list || []);
    setAnalysis(data?.data?.data?.analysis || {});
    const datapemanfaatan = await getDashboardData({
      BASE_URL: BASE_URL_API_V4_CLIENT,
      url: `/dashboard/home`,
      params: {
        ...params,
        range: params.range === 0 ? undefined : params.range,
        selectedTab: undefined,
        date: dayjs(params.date).subtract(1, "year").format("YYYY-MM")
      },
      last_page: "/executive",
    });

    const card = {
      ...data?.data?.data?.stats,
      pemanfaatan: datapemanfaatan?.data?.data?.stats?.pemanfaatan || {}
    };
    const detail = {
      ...data?.data?.data?.stats_detail,
      pemanfaatan: datapemanfaatan?.data?.data?.stats_detail?.pemanfaatan || {}
    };
    setCardData(card);
    setCardDetail(detail);
    setLoading(false);
  };

  React.useEffect(() => {
    if (cardShow === 0) {
      if (cardData.ketersediaan && isFirst) {
        setParams({
          ...params,
          date: cardData.ketersediaan?.updated_at ? dayjs(cardData.ketersediaan?.updated_at).subtract(2, "month").format("YYYY-MM") : dayjs().format("YYYY-MM")
        })
        setIsFirst(false);
      }
    } else {
      if (cardData.gizi && isFirst) {
        setParams({
          ...params,
          date: cardData.gizi?.updated_at ? dayjs(cardData.gizi?.updated_at).subtract(2, "month").format("YYYY-MM") : dayjs().format("YYYY-MM")
        })
        setIsFirst(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardData, cardShow]);

  React.useEffect(() => {
    if (params.date) {
      dashboardDispatch({ params });
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const handleChangeTabs = (selected) => {
    setParams({ ...params, ...selected });
  };

  if (dashboardResponse === 403) return <Custom403 />;
  return (
    <>
      <Head>
        <title>Dashboard | Simawas Pagi</title>
        <meta
          name="description"
          content="Dashboard Sistem Informasi Kewaspadaan Pangan dan Gizi "
        />
        <link rel="icon" href="/simawas_pagi_icon.svg" />
      </Head>
      <Header BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT} />
      <main>
        <ScopedCssBaseline sx={{ background: "#FFFFFF", pb: 5 }}>
          {loading && <LinearProgress color="success" />}
          <Container maxWidth="xl">
            <Box className="p-5">
              <Title
                text="Dashboard Ketahanan Pangan Jawa Barat"
                style={{ fontFamily: "Inter" }}
              />
              <Subtitle text="Ketahanan Pangan Provinsi dan Kota/Kabupaten di Jawa Barat diukur dengan menggunakan nilai komposit dari masing-masing pilar Ketersediaan, pilar Keterjangkauan, dan pilar Pemanfaatan. Skor komposit ini dapat dijadikan acuan untuk pemantauan Ketahanan Pangan." />
            </Box>
            <Box
              className="p-5"
              sx={{ background: "#ffffff", borderRadius: "20px" }}
            >
              <Box className={!mobileTab && "flex gap-3"}>
                <Box sx={{ width: mobileTab ? "100%" : "270px", mb: 2 }}>
                  <MonthPicker
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
              </Box>
              <Box>
                <Box className="flex justify-center mb-5">
                  <Box
                    sx={{
                      background: "#CCE6DA",
                      borderRadius: "0.7em",
                      p:1,
                      minWidth: '600px'
                    }}
                    >
                    <AntTabs
                      value={cardShow}
                      onChange={(event, newValue) => {
                        setCardShow(newValue);
                        setIsFirst(true);
                      }}
                      aria-label="ant tabs"
                      style={{fontSize: "1em"}}
                    >
                      {tabsContent.map((item, index) =>
                        (<AntTab value={index} label={item.label} key={index} style={{fontSize: "1em"}} />)
                      )}
                    </AntTabs>
                  </Box>
                </Box>
                <Grid
                  container
                  direction="row"
                  columnSpacing={5}
                  rowSpacing={2}
                  justifyContent="center"
                >
                  {cardShow === 1 ? (
                    <>
                      <Grid item md={4} sm={12}>
                        <DashboardCard
                          params={params}
                          cardData={cardData.gizi}
                          cardDetail={cardDetail.gizi}
                          title="underweight"
                          aman="<=10%"
                          waspada="10% < IU <=15%"
                          rentan=">15%"
                        />
                      </Grid>
                      <Grid item md={4} sm={12}>
                        <DashboardCard
                          params={params}
                          cardData={cardData.stunting}
                          cardDetail={cardDetail.stunting}
                          title="stunting"
                          aman="<10%"
                          waspada="10% < IS <=20%"
                          rentan=">20%"
                        />
                      </Grid>
                      <Grid item md={4} sm={12}>
                        <DashboardCard
                          params={params}
                          cardData={cardData.wasting}
                          cardDetail={cardDetail.wasting}
                          title="wasting"
                          aman="<5%"
                          waspada="5% < IW <=10%"
                          rentan=">20%"
                        />
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item md={4} sm={12}>
                        <DashboardCard
                          params={params}
                          cardData={cardData.ketersediaan}
                          cardDetail={cardDetail.ketersediaan}
                          title="ketersediaan"
                          aman="81% - 100%"
                          waspada="47% - 80%"
                          rentan="0% - 46%"
                        />
                      </Grid>
                      <Grid item md={4} sm={12}>
                        <DashboardCard
                          params={params}
                          cardData={cardData.keterjangkauan}
                          cardDetail={cardDetail.keterjangkauan}
                          title="keterjangkauan"
                          aman="81% - 100%"
                          waspada="47% - 80%"
                          rentan="0% - 46%"
                        />
                      </Grid>
                      <Grid item md={4} sm={12}>
                        <DashboardCard
                          params={params}
                          cardData={cardData.pemanfaatan}
                          cardDetail={cardDetail.pemanfaatan}
                          title="pemanfaatan"
                          aman=">87%"
                          waspada="78% - 87%"
                          rentan="<78%"
                        />
                      </Grid>
                    </>
                  )}

                </Grid>
              </Box>
              <Summary
                analysis={analysis}
                params={params}
                url={`${BASE_URL_API_V4_CLIENT}/dashboard/analysis/home`}
                getData={getData}
              />
              <HistoryChart
                chartData={chartData}
                params={params}
                handleChangeTabs={handleChangeTabs}
              />
              <HistoryTable data={listData} />
            </Box>
          </Container>
        </ScopedCssBaseline>
        <Footer />
      </main>
    </>
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

export default Dashboard;
