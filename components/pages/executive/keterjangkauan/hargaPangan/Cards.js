import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Image from "next/image";
import _ from "lodash";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

const setCardIcon = (status) => {
  switch (status) {
    case 1:
      return <ArrowUpIcon width={40} color="#F44336" />
      break;
    case 2:
      return <ArrowDownIcon width={40} color="#FFA600" />
      break;
    case 3:
      return <ArrowDownIcon width={40} color="#008444" />
      break;
    default:
      break;
  }
}

const setColor = (status) => {
  switch (status) {
    case 1:
      return "#F44336"
      break;
    case 2:
      return "#FFA600"
      break;
    case 3:
      return "#008444"
      break;
    default:
      break;
  }
}

const Card = ({
  label,
  value,
  status,
}) => (
  <Paper elevation={2} className="flex justify-between items-center px-5 py-3 rounded-xl">
    <Box>
      <Typography color={setColor(status)} fontSize="1.2rem" className="font-lato-700">
        {label}
      </Typography>
      <Typography color="#404040" fontSize="1rem" className="font-lato">
        <span style={{fontSize: "1.4rem"}}>{value}</span> Kab/Kota
      </Typography>
    </Box>
    <Box sx={{width: '40px', height: '40px', position: 'relative', marginLeft: "auto"}}>
      {setCardIcon(status)}
    </Box>
  </Paper>
)

const Cards = ({cardData}) => {
  return (
    <Grid
      container
      spacing={3}
      className="py-3"
    >
      {
        _.orderBy(cardData, ['status'],['desc'])?.map((item, idx) => (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} key={idx}>
            <Card label={item.status_label} value={item.jumlah_kota} status={item.status} />
          </Grid>
        ))
      }
    </Grid>
  )
}

export default Cards