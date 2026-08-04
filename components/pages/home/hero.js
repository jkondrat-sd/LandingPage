import React from "react";

// MUI
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// NEXT
import Image from "next/image";
import Router from "next/router";

// atoms
import Container from "@/components/atoms/container";

// CustomHooks
import useMediaQuery from "@/hooks/useMediaQuery";

// _legacy
import { Subtitle, Title } from "@/components/_legacy";
import { EastRounded } from "@mui/icons-material";

const Hero = ({executePriceScroll}) => {
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
          backgroundImage: "url('/legacy_images/hero_bg.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
          marginBottom: 2,
          minHeight: mobileTab ? 0 : 500,
          paddingY: 3,
          marginTop: mobileTab ? "-15px" : "-10px"
        }}
      >
        <Container maxWidth="xl" sx={{height: "88vh"}}>
          <Grid
            container
            sx={{height: "88vh"}}
            direction="row"
            justifyContent={mobileTab ? "flex-start" : "space-between"}
            alignItems= "center"
          >
            <Grid item xl={8} md={8} sm={12} className="z-40">
              <Grid
                container
                sx={{height: "70vh"}}
                direction="column"
                justifyContent={mobileTab ? "flex-end" : "center"}
                alignItems="center"
              >
                <Grid item sx={{ textAlign: mobileTab ? "center" : "unset" }}>
                  <Grid
                    container
                  >
                    <Grid item>
                      <div
                        className="title"
                        style={{
                          color: "#008444",
                          fontSize: mobileTab ? '55px' : '64px',
                          lineHeight: mobileTab ? '30px' : '48px',
                          fontFamily: "Inter",
                          textAlign: 'left'
                        }}>
                          <span style={{color: "#00D1FF"}}>SI</span>MAWAS<span style={{color: "#FFC62B"}}>PAGI</span>
                      </div>
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                      <Subtitle
                        style={{textAlign: 'left'}}
                        text="Sistem Informasi Kewaspadaan Pangan dan Gizi Jawa Barat" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  sx={{
                    width: "100%",
                    display: "flex",
                    marginTop: mobileTab ? "0px" : "50px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      gap: 5,
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "30px"
                    }}
                  >
                    <Button
                      variant="contained"
                      className="flex gap-2 font-lato"
                      style={{
                        background: "#008444",
                        fontSize: "1rem",
                        borderRadius: '12px',
                        color:'#FFFFFF',
                        boxShadow: 'none',
                        textTransform: 'none'
                        }}
                      onClick={() => {Router.push('/executive')}}
                    >
                      Cek Kondisi Ketahanan Pangan <EastRounded />
                    </Button> 
                    <Button
                      variant="contained"
                      className="flex gap-2 font-lato"
                      style={{
                        background: "#FFFFFF",
                        fontSize: "1rem",
                        borderRadius: '12px',
                        border: '1px solid #AAD6C1',
                        color:'#008444',
                        boxShadow: 'none',
                        textTransform: 'none'
                      }}
                      onClick={executePriceScroll}
                    >
                      Cek Harga Pangan <EastRounded />
                    </Button> 
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: mobileTab ? "0px" : "50px",
              }}
              md={4}
              sm={12}
            >
              <Box
                sx={{
                  position: "absolute",
                  right: "0px",
                  top: mobileTab ? "8%" : "20%",
                  overflow: "hidden",
                  height: mobileTab ? "350px" : "449px",
                  width: mobileTab ? "180px" : "350px",
                }}
              >
                <Image
                  src="/legacy_images/sate.svg"
                  alt="Jabar"
                  layout="fill"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ScopedCssBaseline>
  );
};

export default Hero;
