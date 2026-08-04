import React from "react";

// MUI
import { styled } from "@mui/material/styles";
import { Typography, Button, Grid, Box, ScopedCssBaseline } from "@mui/material";

// NEXT
import Image from "next/image";

// atoms
import Container from "@/components/atoms/container";

// CustomHooks
import useMediaQuery from "@/hooks/useMediaQuery";
import { Title } from "@/components/_legacy";
import Router from "next/router";

const Dataset = () => {
  const { isMobile, isTablet, isDesktop } = useMediaQuery();

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
          height: "100%",
          minHeight: mobileTab ? 0 : 600,
          paddingY: 3,
        }}
      >
        <Container maxWidth="xl" >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xl={6} md={6} sm={12}>
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  height: mobileTab ? "200px" : "460px",
                  width: mobileTab ? "250px" : "551px",
                }}
              >
                <Image
                  src="/media/documents.svg"
                  alt="Jabar"
                  layout="fill"
                />
              </Box>
            </Grid>
            <Grid item xl={6} md={6} sm={12} className="m-auto">
              <Box>
                <Title text="Apa itu Dataset?" style={{textAlign: 'left', color: '#000000'}} />
                <Typography className="subtitle mt-8" sx={{marginBottom: '25px'}}>
                  Dapatkan berbagai
                  <span className="font-lato-700" style={{color: '#008444'}}> koleksi data tentang </span>
                  ketahanan pangan yang bisa anda unduh dan olah kembali lewat Dataset. Koleksi dataset ini berasal dari berbagai Organisasi Perangkat Daerah Jawa Barat.
                </Typography>
                <Box className="flex cursor-pointer" onClick={() => {Router.push('/dataset')}}>
                  <Box sx={{
                    position: 'relative',
                    marginRight: '30px',
                    '&:before': {
                      content: "''",
                      position: 'absolute',
                      width: '100%',
                      height: '4px',
                      borderRadius: '4px',
                      backgroundColor: '#008444',
                      bottom: '0',
                      left: '0',
                      transformOrigin: 'right',
                      transform: 'scaleX(0)',
                      transition: 'transform .3s ease-in-out',
                    },
                    '&:hover:before': {
                        transformOrigin: 'left',
                        transform: 'scaleX(1)',
                    }
                  }}>
                    <Title text="Cek Data Lengkapnya Disini" style={{textAlign: 'left', fontSize: mobileTab && '18px'}} />
                  </Box>
                  <Image src="/icons/arrow_right.svg" alt="arrow" width={mobileTab ? 40 : 60} height={mobileTab ? 40 : 60} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ScopedCssBaseline>
  );
};

export default Dataset;
