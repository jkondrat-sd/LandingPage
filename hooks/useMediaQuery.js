import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Main = () => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.up("xs"));
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const xl = useMediaQuery(theme.breakpoints.up("xl"));

  const isMobile = !md;
  const isTablet = md && !lg;
  const isDesktop = lg;

  return {
    isMobile,
    isTablet,
    isDesktop,
    xs,
    sm,
    md,
    lg,
    xl,
  };
};

export default Main;
