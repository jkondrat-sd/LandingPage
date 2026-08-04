import * as React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import useMediaQuery from "@/hooks/useMediaQuery";

const links = {
  ketersediaan: [
    {
      label: "Dashboard",
      url: "/executive",
    },
    {
      label: "Ketersediaan",
      url: "/executive/ketersediaan",
    },
  ],
  keterjangkauan: [
    {
      label: "Dashboard",
      url: "/executive",
    },
    {
      label: "Keterjangkauan",
      url: "/executive/keterjangkauan",
    },
  ],
  pemanfaatan: [
    {
      label: "Dashboard",
      url: "/executive",
    },
    {
      label: "Pemanfaatan",
      url: "/executive/pemanfaatan",
    },
  ],
  gizi: [
    {
      label: "Dashboard",
      url: "/executive",
    },
    {
      label: "Status Gizi",
      url: "/executive/underweight",
    },
  ],
};
const DashboardBreadcrumbs = ({ pilar, currentPage }) => {
  const { isMobile, isTablet } = useMediaQuery();
  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const linkList =
    links[pilar]?.map((link) => (
      <Link color="#008444" key={1} underline="hover" href={link.url}>
        {link.label}
      </Link>
    )) || [];

  return (
    <Breadcrumbs
      separator={<NavigateNext sx={{ color: "#008444" }} fontSize="1.2em" />}
      aria-label="breadcrumb"
      className="title"
      style={{ fontSize: mobileTab ? "1.2em" : "1.7em" }}
    >
      {[
        ...linkList,
        currentPage && (
          <Typography
            className="title capitalize"
            style={{
              fontSize: "1em",
              lineHeight: "1.2em",
              color: "#008444",
            }}
            key={3}
          >
            {currentPage}
          </Typography>
        ),
      ]}
    </Breadcrumbs>
  );
};

export default DashboardBreadcrumbs;
