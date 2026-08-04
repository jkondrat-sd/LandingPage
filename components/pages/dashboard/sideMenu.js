import React from "react";
import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import useMediaQuery from "@/hooks/useMediaQuery";
import Router from "next/router";
import { CustomSelect } from "@/components/_legacy";

const menus = [
  {
    id: 1,
    name: 'Prognosa Neraca Pangan',
    link: '/dashboard/prognosa_neraca',
    label: 'Prognosa Neraca Pangan',
    value: '/dashboard/prognosa_neraca',
  },
  {
    id: 2,
    name: 'Harga Pangan',
    link: '/dashboard/harga',
    label: 'Harga Pangan',
    value: '/dashboard/harga'
  }
]

const SideMenu = ({selectedMenu}) => {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const active = {
    background: '#008444',
    color: '#ffffff',
  };
  
  return (
    <>
      {!mobileTab ? (
        <Box
          sx={{
            flex: '1',
            background: 'rgba(204, 230, 218, 0.3)',
          }}
        >
          <Typography className="font-lato-700 pl-3" sx={{marginTop: '50px', fontSize: '28px', color: '#008444'}} >Indikator</Typography>
          <List sx={{width: '100%', color: '#008444', marginTop: '50px'}}>
            {Array.isArray(menus) && menus.map((item, index) => (
              <ListItem 
                key={index} 
                disablePadding 
                style={selectedMenu === item.id ? active : {borderBottom: 'solid 1px #008444'}} 
                onClick={() => Router.push(item.link)}
              >
                <ListItemButton>
                  <ListItemText primary={item.name} sx={{'& .ListItemText-primary': {fontFamily: 'Lato'}}}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Box>
          <div className="p-5 text-center">
              <Typography
                className="title pr-3 mb-3 "
                style={{fontSize:'1.7em', lineHeight: '1.2em', color: "#008444"}}>
                  Indikator
              </Typography>
              <CustomSelect value={menus?.find((item) => item.id.toString() === selectedMenu.toString())?.value} placeholder={menus?.find((item) => item.id.toString() === selectedMenu.toString())?.label} options={menus} onChange={(value) => Router.push(value)} style={{maxWidth: '300px'}} />
            </div>
        </Box>
      )
      }
    </>
  );
};

export default SideMenu;
