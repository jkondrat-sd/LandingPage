import React from "react";
import { Box, ScopedCssBaseline, Typography } from "@mui/material";
import { CustomTabs, Title } from "@/components/_legacy";
import useMediaQuery from "@/hooks/useMediaQuery";
import ComodityCard from "@/components/pages/home/comodityCard";
import Container from "@/components/atoms/container";
import axios from "axios";
import moment from "moment";
import { formatDateId } from "@/utils/common";

const TabContent = ({ flag, setFlag, mobileTab, prices, params }) => (
  <Box className="flex flex-wrap sm:align-middle py-10">
    {prices.map((sc) => {
      if (sc.silindaId !== 38) {
        return (
          <ComodityCard
            comodity={sc}
            mobileTab={mobileTab}
            key={sc.komoditas_id}
            flag={flag}
          />
        );
      }
    })}
    <Box className="xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full w-full px-5 mb-5">
      <Box className="h-full">
        <Box
          className="flex flex-col h-full items-center hover:shadow-lg justify-center"
          style={{
            border: `solid 1px ${flag === "konsumen" ? "#AAD6C1" : "#FFA600"}`,
            borderRadius: "20px",
          }}
        >
          <Typography
            className="font-lato-500 text-center"
            sx={{ color: flag === "konsumen" ? "#008444" : "#FFA600" }}
          >
            Sumber: Badan Pangan Nasional ({moment().format("YYYY")})
          </Typography>
          <Typography
            className="font-lato-500 text-center"
            sx={{ color: flag === "konsumen" ? "#008444" : "#FFA600" }}
          >
            Last Updated: {formatDateId(params?.date)}
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

const Harga = ({ BASE_URL_API_V3_CLIENT, priceReff }) => {
  const { isMobile, isTablet, isDesktop } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  let dayBefore = moment();
  dayBefore = dayBefore.subtract(1, "days");

  const [flag, setFlag] = React.useState("produsen");
  const [prices, setPrices] = React.useState([]);
  const [params, setParams] = React.useState({});
  React.useEffect(() => {
    setParams({
      level: flag === "produsen" ? "1" : "3",
      date:
        moment().format("HH") < 14
          ? dayBefore.format("YYYY-MM-DD")
          : moment().format("YYYY-MM-DD"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);

  const getPrices = async () => {
    try {
      const res = await axios.get(
        BASE_URL_API_V3_CLIENT +
          `/public/landing/price?level=${params.level}&date=${params.date}`
      );
      setPrices(res?.data?.data || []);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  React.useEffect(() => {
    if (params.level && params.date) {
      getPrices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <ScopedCssBaseline>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#F8FCFB",
          paddingY: 3,
          position: "relative",
        }}
      >
        <Container maxWidth="xl">
          <Box ref={priceReff}>
            <Box
              className="flex items-center justify-center p-5 mb-5"
              style={{
                border: "1px solid var(--neutral-20, #F5F5F5)",
                borderRadius: "100px",
                background: "#ffffff",
              }}
            >
              <Title
                text="Harga Rata-rata Provinsi Jawa Barat Hari Ini"
                style={{
                  textAlign: "center",
                  fontFamily: "Inter",
                  width: "unset",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "-50px",
            }}
          >
            <CustomTabs
              alignCenter={true}
              flag={flag}
              tabsContent={[
                {
                  label: "Harga Produsen",
                  onClick: () => setFlag("produsen"),
                  content: (
                    <TabContent
                      mobileTab={mobileTab}
                      setFlag={setFlag}
                      flag="produsen"
                      prices={prices}
                      params={params}
                    />
                  ),
                },
                {
                  label: "Harga Konsumen",
                  onClick: () => setFlag("konsumen"),
                  content: (
                    <TabContent
                      mobileTab={mobileTab}
                      setFlag={setFlag}
                      flag="konsumen"
                      prices={prices}
                      params={params}
                    />
                  ),
                },
              ]}
            />
          </Box>
        </Container>
      </Box>
    </ScopedCssBaseline>
  );
};

export default Harga;
