import React, { useEffect, useState } from "react";
import { FiberManualRecord } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import useMediaQuery from "@/hooks/useMediaQuery";
import { convertKeyToLabel } from "@/utils/common";

const StatusReferenceSide = ({ legends = [] }) => {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  return (
    <Box className="flex justify-center">
      <Box>
        {legends.map((legend, idx) => (
          <Box className={`${mobileTab && "flex-1"} flex items-center`} key={idx}>
            <FiberManualRecord sx={{ fontSize: 13, color: legend.color }} />
            <Box className={`px-2 ${!mobileTab && "flex gap-1"}`}>
              <Typography color="#1E1B39" fontSize="0.7rem" lineHeight={2.5}>
                {legend.label}:
              </Typography>
              <Typography color="#1E1B39" fontSize="0.7rem" lineHeight={2.5}>
                {legend.value}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StatusReferenceSide;
