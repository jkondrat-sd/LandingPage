import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import useMediaQuery from "@/hooks/useMediaQuery";

import { Box } from "@mui/material";

const Footer = dynamic(() => import("@/components/molecules/footer"));
const SideMenu = dynamic(() => import("@/components/pages/executive/sideMenu"));

const DashboardLayout = ({ children, pilar, selectedMenu, loading, BASE_URL_API_V2_CLIENT }) => {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  return (
    <>
      <Head>
        <title>Dashboard | Simawas Pagi</title>
        <meta
          name="description"
          content="Dashboard Sistem informasi kewaspadaan pangan dan gizi"
        />
        <link rel="icon" href="/simawas_pagi_icon.svg" />
      </Head>
      <main style={{ backgroundColor: "#F8FCFB" }}>
        <Box
          sx={{
            display: mobileTab ? "block" : "flex",
            fontSize: mobileTab ? "12px" : "16px",
          }}
        >
          <SideMenu
            selectedMenu={selectedMenu}
            pilar={pilar}
            loading={loading}
            BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT}
          />
          <Box
            sx={{
              flex: 5,
              minHeight: "100vh",
              maxWidth: mobileTab ? "100vw" : "80vw",
              paddingTop: mobileTab ? "60px" : "",
            }}
          >
            {children}
          </Box>
        </Box>
        <Footer />
      </main>
    </>
  );
};

export default DashboardLayout;
