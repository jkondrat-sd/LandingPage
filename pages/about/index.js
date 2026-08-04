import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Container from "@/components/atoms/container";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { Title } from "@/components/_legacy";
import Image from "next/image";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ExpandMoreRounded } from "@mui/icons-material";
import { faq } from "@/utils/constant/faq";

// molecules
const Header = dynamic(() => import("@/components/molecules/header"));
const Footer = dynamic(() => import("@/components/molecules/footer"));

export default function Home({ BASE_URL_API_V2_CLIENT }) {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );
  return (
    <>
      <Head>
        <title>Simawas Pagi</title>
        <meta
          name="description"
          content="Tentang Sistem Informasi Kewaspadaan Pangan dan Gizi "
        />
        <link rel="icon" href="/simawas_pagi_icon.svg" />
      </Head>
      <Header BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT} />
      <main
        style={{
          backgroundColor: "#F8FCFB",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ minHeight: "90vh" }}>
            <Box className="p-5">
              <Title text="Tentang" style={{ fontFamily: "Inter" }} />
            </Box>
            <Grid
              container
              direction="row"
              justifyContent="center"
              className="mb-10"
            >
              <Grid item xl={4} md={4} sm={12}>
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    height: mobileTab ? "200px" : "300px",
                    width: mobileTab ? "250px" : "413px",
                  }}
                >
                  <Image src="/media/rafiki.svg" alt="Jabar" layout="fill" />
                </Box>
              </Grid>
              <Grid item xl={8} md={8} sm={12}>
                {faq.map((item) => (
                  <Accordion
                    sx={{
                      boxShadow: "none",
                      background: "transparent",
                      borderBottom: "solid 1px #757575",
                      "&.Mui-expanded": {
                        marginBottom: "0px",
                        paddingBottom: "1rem",
                      },
                      "&.Paper-root": {
                        borderRadius: "0px",
                      },
                    }}
                    key={item.title}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreRounded
                          sx={{ color: "#008444", fontSize: "2.5rem" }}
                        />
                      }
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography
                        sx={{
                          color: "#008444",
                          fontSize: "1.2rem",
                          fontFamily: "Lato",
                          paddingY: 1.5,
                        }}
                      >
                        {item.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography
                        fontFamily="Lato"
                        fontSize="1rem"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      BASE_URL_API_V2_CLIENT: process.env.BASE_URL_API_V2_CLIENT,
    },
  };
};
