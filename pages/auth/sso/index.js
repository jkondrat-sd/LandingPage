import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

// constant

import useMediaQuery from "@/hooks/useMediaQuery";
import { Title } from "@/components/_legacy";
import { LinearProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { userLogin } from "@/utils/auth";

// MUI
const Box = dynamic(() => import("@mui/material/Box"));

// atoms
const Container = dynamic(() => import("@/components/atoms/container"));

// organisms
const Header = dynamic(() => import("@/components/molecules/header"));

const SSO = ({ BASE_URL_API_V2_CLIENT }) => {
  const router = useRouter();

  const { isMobile } = useMediaQuery();
  const [loading, setLoading] = React.useState(false);

  const [timesRun, setTimesRun] = React.useState(0);
  const counter = React.useRef(0);
  const effectCalled = React.useRef(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const getToken = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await userLogin({
        BASE_URL_API_V2_CLIENT,
        credentials: {
          session_state: router.query?.session_state,
          code: router.query?.code,
        },
        method: "smart_jabar",
        redirect: "/executive",
      });
    } catch (error) {
      console.log("error : ", error);
      setErrorMessage(error?.response?.status + " " + error?.response?.message);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (effectCalled.current) return;
    counter.current += 1;
    setTimesRun(counter.current);
    effectCalled.current = true;
    console.log(router.query);
    if (router.query?.code) {
      getToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BASE_URL_API_V2_CLIENT, router.query?.code]);

  return (
    <>
      <Head>
        <title> SSO Signin | Simawas Pagi </title>
        <meta
          name="description"
          content="Masuk dengan SSO ke Sistem Informasi Kewaspadaan Pangan dan Gizi "
        />
      </Head>
      <Box
        component="main"
        sx={{
          height: "100vh",
          width: "100%",
          backgroundColor: "#F8FCFB",
          overflow: "auto",
        }}
      >
        <Header />
        <Container maxWidth="xl" sx={{ height: "85vh" }}>
          <Box className="flex h-full">
            <Box className="m-auto">
              {loading ? (
                <>
                  <Title text="Memproses Login SSO Jabar" />
                  <LinearProgress color="success" />
                </>
              ) : (
                <Typography>
                  {errorMessage || "Mengalihkan ke halaman Dashboard"}
                </Typography>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      BASE_URL_API_V2_CLIENT: process.env.BASE_URL_API_V2_CLIENT,
    },
  };
};

export default SSO;
