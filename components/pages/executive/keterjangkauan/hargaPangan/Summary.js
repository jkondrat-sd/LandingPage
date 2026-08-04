import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const Summary = ({}) => {
  return (
    <Grid
      container
      spacing={3}
    >
      <Grid item sm={12} md={12}>
        <Box sx={{p:2, my:3, border: "1px solid #AAD6C1", borderRadius: "6px"}}>
          <Box className="flex">
            <Typography className="font-lato-500 pr-2" fontSize="1.8rem" sx={{borderBottom: "3px solid #008444"}}>
              Hasil Analisis
            </Typography>
          </Box>
          <Typography className="font-lato pt-3" fontSize="1.2rem">
            Berdasarkan hasil analisis, Pilar Ketersediaan berada pada status aman, 
            pilar keterjangkauan berada pada status waspada dan pilar pemanfaatan berada pada status segera intervensi. 
            Rendahnya skor komposit pada pilar pemanfaatan Provinsi Jawa Barat dapat dikarenakan karena terdapat 15 kota/kabupaten yang berada pada status segera intervensi. 
            Status ini terjadi karena terjadinya peningkatan yang signifikan pada kebutuhan hingga 1000 ton pada Kota Bandung, Kota Bekasi dan Kota Tasikmalaya. 
            Peningkatan kebutuhan ini tidak disertai dengan peningkatan ketersediaan sehingga terjadi neraca defisit.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Summary