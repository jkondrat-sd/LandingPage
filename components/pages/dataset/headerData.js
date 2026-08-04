import React from "react";

// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Grid } from "@mui/material";
import { TextWithIcon } from "@/components/_legacy";
import useMediaQuery from "@/hooks/useMediaQuery";

const HeaderData = ({title, organization, pilar, date, years, pilarImage}) => {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  return (
    <Box className="w-full rounded-lg my-5 align-bottom" sx={{background: "#CCE6DA"}}>
      <Grid
        container
        direction={mobileTab ? "column-reverse" : "row"}
      >
        <Grid
          item
          xl={8}
          md={8}
          sm={12}
          xs={12}
          sx={{paddingTop: mobileTab ? '20px' : "110px", paddingBottom: "20px"}}
          className="px-5"
        >
          <Typography
            className="subtitle w-full"
            sx={{color: "#008444"}}>
              {title}
          </Typography>
          <div className={mobileTab ? '' : "flex w-full"}>
            <TextWithIcon icon="/icons/office-building.svg" text={organization} style={{marginRight: mobileTab ? '0px' : "20px", maxWidth: mobileTab ? '100%' : '30%'}} />
            <TextWithIcon icon="/icons/md-library.svg" text={pilar} style={{marginRight: "20px"}} />
            <TextWithIcon icon="/icons/database.svg" text={years} style={{marginRight: "20px"}} />
            <TextWithIcon icon="/icons/calendar.svg" text={date} style={{marginRight: "20px"}} />
          </div>
        </Grid>
        <Grid
          item
          xl={4}
          md={4}
          sm={12}
          xs={12}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
          className="px-5"
        >
          <div style={{height: mobileTab ? '250px' : '100%', width: '100%', position:'relative'}}>
            <Image src={pilarImage} alt="img" layout="fill" />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeaderData;
