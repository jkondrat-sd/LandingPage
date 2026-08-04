import React from "react";
import { Avatar, AvatarGroup, Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowDownIcon, ArrowTrendingDownIcon, ArrowTrendingUpIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import { convertKeyToLabel, convertLabelToKey } from "@/utils/common";

const Maps = dynamic(
  () => import("@/components/pages/executive/komposit/Maps"),
  {
    ssr: false,
    loading: () => <LinearProgress color="success" />,
  }
);

const setPercentIcon = (percent) => {
  if (Number(percent) < 0) {
    return <ArrowTrendingDownIcon width={15} color="#008444" />
  } else if (Number(percent) > 0) {
    return <ArrowTrendingUpIcon width={15} color="#F44336" />
  } else {
    return
  }
}

const setColor = (status) => {
  switch (status) {
    case 1:
      return "#F44336";
      break;
    case 2:
      return "#FFA600";
      break;
    case 3:
      return "#008444";
      break;
    default:
      break;
  }
};

const Card = ({
  label,
  value,
  status,
  kota,
  title,
  percent,
  pilar,
  status_label,
}) => (
  <Paper elevation={2} className="mt-5 p-5 rounded-xl">
    <Typography color="#757575" fontSize="0.8rem" className="font-lato">
      {title}
    </Typography>
    <AvatarGroup sx={{ justifyContent: "flex-end", margin: "2px 0px" }}>
      {Array.isArray(kota) ? (
        kota.map((el) => (
          <Avatar
            key={el}
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: "#B7DEC4",
              border: "solid 1px #008444 !important",
            }}
            title={convertKeyToLabel(el)}
          >
            <Box sx={{ width: "25px", height: "28px", position: "relative" }}>
              <Image
                src={`/logos/kota/${convertLabelToKey(el)}.png`}
                layout="fill"
                alt="icon"
              />
            </Box>
          </Avatar>
        ))
      ) : (
        <Avatar
          sx={{
            width: "40px",
            height: "40px",
            backgroundColor: "#B7DEC4",
            border: "solid 1px #008444 !important",
          }}
          title={convertKeyToLabel(kota)}
        >
          <Box sx={{ width: "25px", height: "28px", position: "relative" }}>
            <Image
              src={`/logos/kota/${convertLabelToKey(kota)}.png`}
              layout="fill"
              alt="icon"
            />
          </Box>
        </Avatar>
      )}
    </AvatarGroup>
    <Box className="flex gap-1 justify-between align-center">
      <Typography fontSize="1.2rem" className="font-lato">
        {value}
      </Typography>
      <Typography
        fontSize="1.2rem"
        className="font-lato"
        color={setColor(status)}
      >
        {status_label}
      </Typography>
    </Box>
    <Box className="flex gap-1 justify-between align-center">
      <Typography color="#404040" fontSize="0.8rem" className="font-lato">
        perbandingan dengan bulan lalu
      </Typography>
      <Typography
        color={percent > 0 ? "#F44336" : percent < 0 ? "#008444" : "#FFA600"}
        fontSize="0.8rem"
        className="font-lato-700 flex align-center"
      >
        {setPercentIcon(percent)} {percent} %
      </Typography>
    </Box>
  </Paper>
)

const MapsAndCards = ({mapData, mapCardData, url, queryParams, loading, pilar}) => {
  return (
    <Grid
      container
      spacing={3}
      className="pt-1"
    >
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        {
          !loading ? (
            <Maps mapData={mapData} url={url} queryParams={queryParams} />
          ) : (
            <LinearProgress color="success" />
          )
        }
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        {
          mapCardData?.map((item, idx) => {
          return (
            <Card
              key={idx}
              title={item.title}
              kota={item.kota}
              label={item.status_label}
              value={item.harga?.toFixed(0)}
              percent={item.percent?.toFixed(0)}
              status={item.status}
              pilar={pilar}
              status_label={item.status_label}
            />
          )})
        }
      </Grid>
    </Grid>
  )
}

export default MapsAndCards