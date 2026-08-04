import React from "react";

// MUI
import {
  Box,
  Button,
  Container,
  Grid,
  ScopedCssBaseline,
  Typography,
} from "@mui/material";

// CustomHooks
import useMediaQuery from "@/hooks/useMediaQuery";
import { Subtitle, Title } from "@/components/_legacy";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const pilarData = [
  {
    id: 1,
    img: "/legacy_images/pilar_ketersediaan.svg",
    title: "PILAR KETERSEDIAAN",
    description:
      "Pilar ini menopang tersedianya pangan secara fisik pada suatu daerah yang didapatkan dari produksi domestik, impor, ataupun bantuan pangan.",
    color: "#008444",
    boxShadow: "20px 5px 50px rgba(0, 132, 11, 0.17)",
  },
  {
    id: 2,
    img: "/legacy_images/pilar_keterjangkauan.svg",
    title: "PILAR KETERJANGKAUAN",
    description:
      "Pilar ini mengukur kemampuan rumah tangga dalam memperoleh kecukupan pangan baik berasal dari produksi sendiri maupun pembelian, barter, hadiah, pinjaman, serta bantuan.",
    color: "#FFB900",
    boxShadow: "20px 5px 50px rgba(255, 185, 0, 0.17)",
  },
  {
    id: 3,
    img: "/legacy_images/pilar_pemanfaatan.svg",
    title: "PILAR PEMANFAATAN",
    description:
      "Pilar ini mengukur penggunaan pangan oleh anggota keluarga pada masyarakat.",
    color: "#1BACE3",
    boxShadow: "20px 5px 50px rgba(27, 172, 227, 0.17)",
  },
];

const Pilar = () => {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const [active, setActive] = React.useState(1);
  const [selected, setSelected] = React.useState({});

  const handleChangeActive = (action) => {
    if (action === "prev") {
      const newActive = active === 1 ? 3 : active - 1;
      setActive(newActive);
    } else {
      const newActive = active === 3 ? 1 : active + 1;
      setActive(newActive);
    }
  };

  React.useEffect(() => {
    if (active) {
      setSelected(pilarData.find((item) => item.id === active) || {});
    }
  }, [active]);

  return (
    <ScopedCssBaseline>
      <Box
        sx={{
          width: "100%",
          marginBottom: 2,
          height: "100%",
          minHeight: mobileTab ? 0 : 700,
          paddingY: 3,
          backgroundColor: "#F8FCFB",
        }}
      >
        <Container maxWidth="xl">
          <Box className="w-full mb-14">
            <Title
              text="Pilar Ketahanan Pangan"
              style={{ textAlign: "left", fontFamily: "Inter" }}
            />
            <Subtitle
              style={{ maxWidth: isMobile ? "100%" : "70%", textAlign: "left" }}
              text="Ketahanan Pangan adalah kondisi terpenuhinya kebutuhan masyarakat akan tiga pilar ketahanan pangan yaitu ketersediaan, akses, dan pemanfaatan pangan masyarakat di suatu wilayah."
            />
          </Box>
          <Grid container alignItems="flex-start" >
            <Grid item md={1} sm={12}></Grid>
            <Grid item md={8} sm={12}>
              <Box
                className={`${!mobileTab && "flex items-center"}`}
                textAlign="center"
              >
                <Box
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    height: mobileTab ? "250px" : "500px",
                    width: mobileTab ? "100%" : "370px",
                    backgroundColor: selected.color,
                    boxShadow: selected.boxShadow,
                    borderRadius: "20px",
                    mr: mobileTab ? 0 : -2,
                  }}
                >
                  {selected.img && (
                    <Image src={selected.img} alt="Jabar" layout="fill" />
                  )}
                </Box>
                <Box
                  sx={{
                    width: mobileTab ? "100%" : "450px",
                    height: mobileTab ? "unset" : "400px",
                    border: `1px solid ${selected.color}`,
                    borderRadius: "15px",
                    py: 5,
                    marginTop: mobileTab ? "-30px" : "0px",
                  }}
                >
                  <Box sx={{ ml: 5, position: "relative" }}>
                    <Box
                      sx={{
                        position: "absolute",
                        right: mobileTab ? "10px" : "-45px",
                        top: mobileTab ? "-25px" : "-15px",
                        overflow: "hidden",
                        display: "flex",
                        gap: 1,
                        background: selected.color,
                        borderRadius: "8px",
                        zIndex: "99",
                      }}
                    >
                      <Button
                        variant="contained"
                        style={{
                          minWidth: "0px",
                          padding: "4px",
                          background: selected.color,
                          borderRadius: "8px",
                          color: "#FFFFFF",
                          boxShadow: "none",
                        }}
                        onClick={() => handleChangeActive("prev")}
                      >
                        <ChevronLeft fontSize="large" />
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          minWidth: "0px",
                          padding: "4px",
                          background: selected.color,
                          borderRadius: "8px",
                          color: "#FFFFFF",
                          boxShadow: "none",
                        }}
                        onClick={() => handleChangeActive("next")}
                      >
                        <ChevronRight fontSize="large" />
                      </Button>
                    </Box>
                    <Typography
                      color={selected.color}
                      className="subtitle mt-8"
                      sx={{
                        marginBottom: "25px",
                        textAlign: "left",
                        paddingTop: mobileTab ? "50px" : "0px"
                      }}
                    >
                      {selected.title}
                    </Typography>
                    <Typography
                      className="subtitle mt-8"
                      sx={{ marginBottom: "25px", textAlign: "left" }}
                    >
                      {selected.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ScopedCssBaseline>
  );
};

export default Pilar;
