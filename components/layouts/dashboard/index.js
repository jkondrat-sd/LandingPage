import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  drawerStyle,
  appBarContentStyle,
  containerContentStyle,
  drawerPaperStyle
} from "@/components/layouts/dashboard/style";

// MUI
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";

// MUI ICON
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MenuIcon from "@mui/icons-material/Menu";

// organisms
import Profile from "@/components/molecules/header/profile";

const Main = ({ children, drawerWidth = 0, userProps }) => {
  const [openDrawer, setOpenDrawer] = React.useState(true);
  const handleOpenDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  return (
    <Box component={"main"} sx={{ height: "100%" }}>
      <CssBaseline />
      <Drawer
        variant="persistent"
        anchor="left"
        open={openDrawer}
        sx={drawerStyle(drawerWidth)}
        PaperProps={{
          sx: drawerPaperStyle(drawerWidth)
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <Toolbar>
            <Link href="/">
              <a className="py-4 pl-4 pr-1 -ml-4">
                <Image
                  src="/Simawas_logo_long.svg"
                  alt="Simawas Pagi"
                  width={152}
                  height={48}
                />
              </a>
            </Link>
          </Toolbar>
          <List>
            <ListItem button key={"Ringkasan"}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Ringkasan"} />
            </ListItem>
            <ListItem button key={"Data Saya"}>
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary={"Data Saya"} />
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
      <AppBar
        position="fixed"
        open={true}
        sx={appBarContentStyle({ openDrawer, drawerWidth })}
        elevation={0}
      >
        <Toolbar>
          <IconButton onClick={handleOpenDrawer}>
            {openDrawer ? <KeyboardArrowLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Box sx={{ ml: "auto" }}>
            <Profile
              userFullName={userProps?.name}
              userAvatar={userProps?.avatar}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="div"
        sx={containerContentStyle({ openDrawer, drawerWidth })}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Main;
