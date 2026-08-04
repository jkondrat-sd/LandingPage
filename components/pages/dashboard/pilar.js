import React from "react";

// MUI
import { Box, Button, Typography } from "@mui/material";

// CustomHooks
import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { pilarData } from "@/utils/constant/publicDashboardPilar";

const Pilar = ({setPilarDetail}) => {
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
    <Box
      className={`py-10 ${!mobileTab && "flex items-end"}`}
      textAlign="center"
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: mobileTab ? "250px" : "400px",
          width: mobileTab ? "100%" : "400px",
          backgroundColor: selected.color,
          boxShadow: selected.boxShadow,
          borderRadius: "20px",
          mr: mobileTab ? 0 : -2,
        }}
      >
        {selected.img && <Image src={selected.img} alt="Jabar" layout="fill" />}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: mobileTab ? "unset" : "350px",
          border: `1px solid ${selected.color}`,
          borderRadius: mobileTab ? "0px 0px 15px 15px" : "0px 15px 15px 0px",
          py: 2,
          marginTop: mobileTab ? "-30px" : "0px",
        }}
      >
        <Box sx={{ ml: 2, position: "relative", height: "100%" }}>
          <Box
            sx={{
              position: "absolute",
              right: mobileTab ? "10px" : "-45px",
              top: mobileTab ? "-25px" : "100px",
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
          <Box className="flex justify-between items-center px-10">
            <Typography
              color={selected.color}
              className="subtitle mt-8"
              sx={{
                marginBottom: "25px",
                textAlign: "left",
                paddingTop: mobileTab ? "50px" : "0px",
              }}
            >
              {selected.title}
            </Typography>
            <Button
              className="capitalize font-lato flex items-start gap-2"
              style={{
                color: selected.color,
                borderColor: selected.color,
                boxShadow: "none",
              }}
              variant="outlined"
              onClick={() => setPilarDetail(selected)}
            >
              Lihat Selengkapnya <ArrowTopRightOnSquareIcon className="w-5" />
            </Button>
          </Box>
          <Box className="flex items-end p-5 h-64">
            {selected.cards?.length > 0 ? (
              selected.cards.map((item) => (
                <div
                  className="xl:w-1/4 lg:w-1/4 md:w-1/2 sm:w-full w-full px-5 mb-5"
                  key={item}
                >
                  <Link href={item.url} passHref>
                    <div
                      className="text-center hover:shadow-lg rounded-xl p-4 cursor-pointer"
                      style={{ background: selected.secondaryColor }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "60px",
                          position: "relative",
                        }}
                      >
                        <Image
                          src="/logos/dkpp-circle.svg"
                          layout="fill"
                          alt="icon"
                        />
                      </div>
                      <Typography
                        fontFamily="Inter"
                        fontWeight="500"
                        fontSize="0.8rem"
                        className="mt-3"
                      >
                        {item.title}
                      </Typography>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <Typography className="subtitle p-5">Belum ada!</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Pilar;
