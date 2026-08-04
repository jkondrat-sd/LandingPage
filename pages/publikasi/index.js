import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";
import { debounce } from "lodash";
import useMediaQuery from "@/hooks/useMediaQuery";

// MUI
import { Box, Button, Grid, Typography } from "@mui/material";

// atoms
const Container = dynamic(() => import("@/components/atoms/container"));

// molecules
const Footer = dynamic(() => import("@/components/molecules/footer"));

// organisms
const Header = dynamic(() => import("@/components/molecules/header"));

// _legacy
import {
  CustomCheckbox,
  CustomInput,
  CustomSelect,
  FilterAccordion,
  Subtitle,
  Title,
  Pagination,
} from "@/components/_legacy";
import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

const DataLoader = () => (
  <div className="w-full p-5">
    <div className="animate-pulse">
      <div className="flex justify-center">
        <div className="rounded-full bg-gray-400 h-24 w-24"></div>
      </div>
      <div className="flex-1 space-y-6 py-3">
        <div className="h-3 bg-gray-400 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-3 bg-gray-400 rounded"></div>
            <div className="h-3 bg-gray-400 rounded"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-3 bg-gray-400 rounded"></div>
            <div className="h-3 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function Publikasi({ BASE_URL_API_V4 }) {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const router = useRouter();
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async (params = {}) => {
    setIsLoading(true);
    try {
      const res = await axios.get(BASE_URL_API_V4 + "/publications/list");
      setData(res?.data?.data || []);
    } catch (error) {
      console.log("error : ", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Dataset | Simawas Pagi</title>
        <meta
          name="description"
          content="Sistem Informasi Kewaspadaan Pangan dan Gizi "
        />
        <link rel="icon" href="/simawas_pagi_icon.svg" />
      </Head>
      <Header BASE_URL_API_V4={BASE_URL_API_V4} />
      <main>
        <Container maxWidth="xl" sx={{ marginTop: "50px" }}>
          <Title text="Publikasi Ketahanan Pangan dan Gizi Jawa Barat" />
          <Subtitle
            text="Publikasi data dan informasi yang berkaitan dengan ketahanan pangan dan gizi.
Berasal dari berbagai Organisasi Perangkat Daerah di Jawa Barat dan Kementerian Republik Indonesia"
          />

          {isLoading ? (
            <Grid container direction="row" spacing={2} sx={{ my: "50px" }}>
              <Grid item xl={4} md={4} sm={12} xs={12}>
                <Box className="shadow-lg rounded-xl border-2 border-green-50">
                  <DataLoader />
                </Box>
              </Grid>
              <Grid item xl={4} md={4} sm={12} xs={12}>
                <Box className="shadow-lg rounded-xl border-2 border-green-50">
                  <DataLoader />
                </Box>
              </Grid>
              <Grid item xl={4} md={4} sm={12} xs={12}>
                <Box className="shadow-lg rounded-xl border-2 border-green-50">
                  <DataLoader />
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Grid container direction="row" spacing={2} sx={{ my: "50px" }}>
              {data.length > 0 ? (
                data.map((item) => (
                  <Grid item xl={4} md={4} sm={12} xs={12} key={item._id}>
                    <Box className="shadow-lg rounded-xl border-2 border-green-50 p-5">
                      <Box className="w-full flex justify-center">
                        <Box
                          style={{
                            width: "100px",
                            height: "100px",
                            position: "relative",
                          }}
                        >
                          <Image
                            src="/logos/dkpp-circle.svg"
                            layout="fill"
                            alt="icon"
                          />
                        </Box>
                      </Box>
                      <Typography className="font-lato mt-5 w-full text-center h-20">
                        {item.title}
                      </Typography>
                      <Box className="w-full flex justify-center">
                        <Button
                          size="small"
                          type=""
                          className="flex gap-3 items-center px-2 hover:bg-green-400 mt-5"
                          sx={{
                            color: "#ffffff",
                            background: "#008444",
                            textTransform: "none",
                            minWidth: "90px",
                            boxShadow:
                              "-10px 18px 6px 0px rgba(0, 0, 0, 0.00), -7px 11px 5px 0px rgba(0, 0, 0, 0.02), -4px 6px 4px 0px rgba(0, 0, 0, 0.08), -2px 3px 3px 0px rgba(0, 0, 0, 0.13), 0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
                          }}
                          onClick={() => window.open(BASE_URL_API_V4+"/publications/download/"+item._id, '_blank')}
                        >
                          <Typography className="font-lato mt-1">
                            Download
                          </Typography>
                          <ArrowTopRightOnSquareIcon
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                ))
              ) : (
                <Typography>Tidak ada data</Typography>
              )}
            </Grid>
          )}
        </Container>
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  return {
    props: {
      BASE_URL_API_V4: process.env.BASE_URL_API_V4,
    },
  };
};
