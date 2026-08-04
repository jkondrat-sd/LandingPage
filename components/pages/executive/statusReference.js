import React from "react";
import { FiberManualRecord } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import useMediaQuery from "@/hooks/useMediaQuery";

const StatusReference = ({
  note = "*Penggunaan acuan aman, waspada, dan rentan diolah berdasarkan pada Juknis Sistem Pasokan dan Harga Pangan BAPANAS (2022)."
}) => {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );
  return (
    <Grid
      container
      direction="row"
      columnSpacing={5}
      rowSpacing={2}
      alignItems="center"
      justifyContent="center"
      className="py-3"
    >
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Box className="flex gap-1">
          <Box
            className={`${mobileTab && "flex-1"} flex items-center p-2`}
            sx={{
              border: "1px solid #E5E5EF",
              borderRadius: "8px"
            }}
          >
            <FiberManualRecord sx={{ fontSize: 15, color: "#16A75C" }} />
            <Box className={`px-2 ${!mobileTab && "flex gap-1"}`}>
              <Typography color="#1E1B39" fontSize="0.7rem">Aman:</Typography>
              <Typography color="#1E1B39" fontSize="0.7rem">81% - 100%</Typography>
            </Box>
          </Box>
          <Box
            className={`${mobileTab && "flex-1"} flex items-center p-2`}
            sx={{
              border: "1px solid #E5E5EF",
              borderRadius: "8px"
            }}
          >
            <FiberManualRecord sx={{ fontSize: 15, color: "#FFA600" }} />
            <Box className={`px-2 ${!mobileTab && "flex gap-1"}`}>
              <Typography color="#1E1B39" fontSize="0.7rem">Waspada:</Typography>
              <Typography color="#1E1B39" fontSize="0.7rem">47% - 80%</Typography>
            </Box>
          </Box>
          <Box
            className={`${mobileTab && "flex-1"} flex items-center p-2`}
            sx={{
              border: "1px solid #E5E5EF",
              borderRadius: "8px"
            }}
          >
            <FiberManualRecord sx={{ fontSize: 15, color: "#F44336" }} />
            <Box className={`px-2 ${!mobileTab && "flex gap-1"}`}>
              <Typography color="#1E1B39" fontSize="0.7rem">Rentan:</Typography>
              <Typography color="#1E1B39" fontSize="0.7rem">0% - 46%</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <Typography fontFamily="Inter" fontSize="0.7rem" color="#1E1B39" align={mobileTab ? "left" : "right"}>
          {note}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default StatusReference