import React from "react";
import { Box, Typography } from "@mui/material";

const HargaCard = ({
  backgroundColor = 'rgba(204, 230, 218, 0.3)',
  title = '',
  labelColor = '#008444',
  data = []
}) => {
  return (
    <div className="p-5 w-full">
      <Box className='w-full rounded-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 py-5' sx={{background: backgroundColor, flex: '1' }}>
        <Typography
          className="font-lato-500"
          style={{fontSize:'1.8em', margin: '15px'}}>
            {title}
        </Typography>
        <div style={{marginTop: '3.5em', marginBottom: '3.5em'}}>
          {
            data.map((item, idx) => (
              <div key={idx} className='flex justify-between p-3' style={{borderBottom: 'solid 1px #000000'}}>
                <Typography
                  className="font-lato"
                  style={{fontSize:'1.2em'}}>
                    {item.name}
                </Typography>
                <Typography
                  className="font-lato"
                  style={{fontSize:'0.8em', color: labelColor}}>
                    {item.percentage}
                </Typography>
              </div>
            ))
          }
        </div>
      </Box>
    </div>
  );
};

export default HargaCard;
