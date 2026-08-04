import React from "react";

// MUI
import { styled } from "@mui/material/styles";
import {
  Typography,
  Button,
  Grid,
  Box,
  ScopedCssBaseline,
} from "@mui/material";

// NEXT
import Image from "next/image";

// atoms
import Container from "@/components/atoms/container";

// CustomHooks
import useMediaQuery from "@/hooks/useMediaQuery";
import { Title } from "@/components/_legacy";
import { fontSize } from "@mui/system";
import Router from "next/router";

const Penghargaan = () => {
  const { isMobile, isTablet } = useMediaQuery();
  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );
  return (
    <ScopedCssBaseline>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#F8FCFB",
          marginBottom: 5,
          height: "100%",
          minHeight: isMobile ? 0 : 700,
          paddingY: 3,
          position: "relative",
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              marginTop: "-170px",
              paddingTop: "70px",
            }}
          >
            <Box
              className="p-5 mb-5 text-center"
              style={{
                border: "1px solid var(--neutral-20, #F5F5F5)",
                borderRadius: "100px",
                background: "#ffffff",
              }}
            >
              <Title
                text="Penghargaan"
                style={{
                  textAlign: "center",
                  fontFamily: "Inter",
                  width: "unset",
                  fontSize: "32px",
                }}
              />
              <Image
                src="/icons/prize.svg"
                alt="Jabar"
                height="100px"
                width="100px"
              />
              <div
                style={{
                  color: "#008444",
                  fontSize: "14px",
                  fontFamily: "Lato",
                }}
              >
                BAPANAS AWARDS - 2024
              </div>
              <div
                style={{
                  color: "#008444",
                  fontSize: "14px",
                  fontFamily: "Lato",
                }}
              >
                Integrasi Data Pangan Inovatif
              </div>
            </Box>
          </Box>
          <Title
            text="Fitur SIMAWASPAGI"
            style={{
              textAlign: "center",
              fontFamily: "Inter",
              width: "unset",
              fontSize: "32px",
              marginTop: "100px"
            }}
          />
          <Box className="flex flex-wrap sm:align-middle py-10">
            {/* Dashboard */}
            <Box className="xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full w-full px-5 mb-5">
              <Box className="h-full">
                <Box
                  className="shadow-lg relative"
                  style={{
                    borderRadius: "20px",
                    background: "#CCE6DA",
                  }}
                >
                  <Box className="w-full flex justify-center">
                    <Box
                      style={{
                        width: "300px",
                        height: "250px",
                        position: "relative",
                      }}
                    >
                      <Image src="/media/charts.svg" layout="fill" alt="icon" />
                    </Box>
                  </Box>
                  <Box
                    className="p-5"
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "0px 0px 20px 20px",
                    }}
                  >
                    <Box
                      className="w-full flex cursor-pointer justify-between"
                      onClick={() => {
                        Router.push("/executive");
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          "&:before": {
                            content: "''",
                            position: "absolute",
                            width: "100%",
                            height: "4px",
                            borderRadius: "4px",
                            backgroundColor: "#008444",
                            bottom: "15px",
                            left: "0",
                            transformOrigin: "right",
                            transform: "scaleX(0)",
                            transition: "transform .3s ease-in-out",
                          },
                          "&:hover:before": {
                            transformOrigin: "left",
                            transform: "scaleX(1)",
                          },
                        }}
                      >
                        <Title
                          text="Dashboard"
                          style={{
                            textAlign: "left",
                            fontSize: mobileTab && "18px",
                          }}
                        />
                      </Box>
                      <Image
                        src="/icons/arrow_right.svg"
                        alt="arrow"
                        width={mobileTab ? 40 : 50}
                        height={mobileTab ? 40 : 50}
                      />
                    </Box>
                    <Typography className="subtitle" >
                      Informasi ketahanan pangan dan status gizi di Provinsi Jawa Barat langsung dari para analis ketahanan pangan dan gizi.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* Dataset */}
            <Box className="xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full w-full px-5 mb-5">
              <Box className="h-full">
                <Box
                  className="shadow-lg relative"
                  style={{
                    borderRadius: "20px",
                    background: "#CCE6DA",
                  }}
                >
                  <Box className="w-full flex justify-center">
                    <Box
                      style={{
                        width: "300px",
                        height: "250px",
                        position: "relative",
                      }}
                    >
                      <Image src="/media/documents.svg" layout="fill" alt="icon" />
                    </Box>
                  </Box>
                  <Box
                    className="p-5"
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "0px 0px 20px 20px",
                    }}
                  >
                    <Box
                      className="w-full flex cursor-pointer justify-between"
                      onClick={() => {
                        Router.push("/dataset");
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          "&:before": {
                            content: "''",
                            position: "absolute",
                            width: "100%",
                            height: "4px",
                            borderRadius: "4px",
                            backgroundColor: "#008444",
                            bottom: "15px",
                            left: "0",
                            transformOrigin: "right",
                            transform: "scaleX(0)",
                            transition: "transform .3s ease-in-out",
                          },
                          "&:hover:before": {
                            transformOrigin: "left",
                            transform: "scaleX(1)",
                          },
                        }}
                      >
                        <Title
                          text="Dataset"
                          style={{
                            textAlign: "left",
                            fontSize: mobileTab && "18px",
                          }}
                        />
                      </Box>
                      <Image
                        src="/icons/arrow_right.svg"
                        alt="arrow"
                        width={mobileTab ? 40 : 50}
                        height={mobileTab ? 40 : 50}
                      />
                    </Box>
                    <Typography className="subtitle" >
                    Koleksi data ketahanan pangan dan gizi di Provinsi Jawa Barat yang berasal dari berbagai OPD dan kementerian.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* Publikasi */}
            <Box className="xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full w-full px-5 mb-5">
              <Box className="h-full">
                <Box
                  className="shadow-lg relative"
                  style={{
                    borderRadius: "20px",
                    background: "#CCE6DA",
                  }}
                >
                  <Box className="w-full flex justify-center">
                    <Box
                      style={{
                        width: "300px",
                        height: "250px",
                        position: "relative",
                      }}
                    >
                      <Image src="/media/documents-rafiki.svg" layout="fill" alt="icon" />
                    </Box>
                  </Box>
                  <Box
                    className="p-5"
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "0px 0px 20px 20px",
                    }}
                  >
                    <Box
                      className="w-full flex cursor-pointer justify-between"
                      onClick={() => {
                        Router.push("/publikasi");
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          "&:before": {
                            content: "''",
                            position: "absolute",
                            width: "100%",
                            height: "4px",
                            borderRadius: "4px",
                            backgroundColor: "#008444",
                            bottom: "15px",
                            left: "0",
                            transformOrigin: "right",
                            transform: "scaleX(0)",
                            transition: "transform .3s ease-in-out",
                          },
                          "&:hover:before": {
                            transformOrigin: "left",
                            transform: "scaleX(1)",
                          },
                        }}
                      >
                        <Title
                          text="Publikasi"
                          style={{
                            textAlign: "left",
                            fontSize: mobileTab && "18px",
                          }}
                        />
                      </Box>
                      <Image
                        src="/icons/arrow_right.svg"
                        alt="arrow"
                        width={mobileTab ? 40 : 50}
                        height={mobileTab ? 40 : 50}
                      />
                    </Box>
                    <Typography className="subtitle" >
                    Informasi ketahanan pangan dan status gizi di Provinsi Jawa Barat langsung dari para analis ketahanan pangan dan gizi.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </ScopedCssBaseline>
  );
};

export default Penghargaan;
