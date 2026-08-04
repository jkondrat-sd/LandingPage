import React from "react";
import { FiberManualRecord } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import useMediaQuery from "@/hooks/useMediaQuery";

const StatusReferenceInline = ({ aman, waspada, rentan }) => {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );
  return (
    <Box className="flex gap-2 justify-center">
      <Box className={`${mobileTab && "flex-1"} flex items-center`}>
        <FiberManualRecord sx={{ fontSize: 13, color: "#16A75C" }} />
        <Box className={`px-2 ${!mobileTab && "flex gap-1"}`}>
          <Typography color="#1E1B39" fontSize="0.7rem">
            Aman:
          </Typography>
          <Typography color="#1E1B39" fontSize="0.7rem">
            {aman || "81% - 100%"}
          </Typography>
        </Box>
      </Box>
      <Box className={`${mobileTab && "flex-1"} flex items-center`}>
        <FiberManualRecord sx={{ fontSize: 13, color: "#FFA600" }} />
        <Box className={`px-2 ${!mobileTab && "flex gap-1"}`}>
          <Typography color="#1E1B39" fontSize="0.7rem">
            Waspada:
          </Typography>
          <Typography color="#1E1B39" fontSize="0.7rem">
            {waspada || "47% - 80%"}
          </Typography>
        </Box>
      </Box>
      <Box className={`${mobileTab && "flex-1"} flex items-center`}>
        <FiberManualRecord sx={{ fontSize: 13, color: "#F44336" }} />
        <Box className={`px-2 ${!mobileTab && "flex gap-1"}`}>
          <Typography color="#1E1B39" fontSize="0.7rem">
            Rentan:
          </Typography>
          <Typography color="#1E1B39" fontSize="0.7rem">
            {rentan || "0% - 46%"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatusReferenceInline;
