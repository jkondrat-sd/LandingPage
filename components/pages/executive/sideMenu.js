import React from "react";
import {
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import useMediaQuery from "@/hooks/useMediaQuery";
import Link from "next/link";
import Image from "next/image";
import PilarAccordions from "./PilarAccordions";
import { useRouter } from "next/router";
import { ArchiveBoxIcon, RectangleStackIcon } from "@heroicons/react/24/solid";
import { Close, Menu } from "@mui/icons-material";
import Drawer from "@/components/molecules/drawer";
import Profile from "@/components/molecules/header/profile";

const menus = {
  ketersediaan: [
    {
      id: 1,
      name: "Komposit",
      icon: <RectangleStackIcon width={20} color="#0A0A0A" />,
      url: "/executive/ketersediaan",
    },
    {
      id: 2,
      name: "Neraca Pangan",
      icon: <ArchiveBoxIcon width={20} color="#0A0A0A" />,
      url: "/executive/ketersediaan/neraca",
    },
  ],
  keterjangkauan: [
    {
      id: 1,
      name: "Komposit",
      icon: <RectangleStackIcon width={20} color="#0A0A0A" />,
      url: "/executive/keterjangkauan",
    },
    {
      id: 2,
      name: "Harga Pangan",
      icon: <ArchiveBoxIcon width={20} color="#0A0A0A" />,
      url: "/executive/keterjangkauan/harga",
    },
  ],
  pemanfaatan: [
    {
      id: 1,
      name: "Komposit",
      icon: <RectangleStackIcon width={20} color="#0A0A0A" />,
      url: "/executive/pemanfaatan",
    },
    // {
    //   id: 2,
    //   name: "Skor PPH",
    //   icon: <ArchiveBoxIcon width={20} color="#0A0A0A" />,
    //   url: "/executive/pemanfaatan/skor-pph",
    // },
  ],
  gizi: [
    {
      id: 1,
      name: "Underweight",
      icon: <ArchiveBoxIcon width={20} color="#0A0A0A" />,
      url: "/executive/underweight",
    },
    {
      id: 2,
      name: "Stunting",
      icon: <ArchiveBoxIcon width={20} color="#0A0A0A" />,
      url: "/executive/stunting",
    },
    {
      id: 3,
      name: "Wasting",
      icon: <ArchiveBoxIcon width={20} color="#0A0A0A" />,
      url: "/executive/wasting",
    },
  ],
};

const ListMenu = ({ selectedMenu, pilar, BASE_URL_API_V2_CLIENT }) => {
  const router = useRouter();
  const active = {
    background: "#CCE6DA",
  };
  return (
    <List sx={{ width: "100%", color: "#0A0A0A", marginTop: "50px" }}>
      <Box className="pb-5">
        <Profile lite BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT} />
      </Box>
      <ListItem
        disablePadding
        // onClick={() => handleChangeMenu(item.id)}
      >
        <PilarAccordions pilar={pilar} />
      </ListItem>
      {Array.isArray(menus[pilar]) &&
        menus[pilar].map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            className="rounded-lg"
            style={selectedMenu === item.id ? active : {}}
            onClick={() => {
              router.push(item.url);
            }}
          >
            <ListItemButton className="rounded-lg">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.name}
                sx={{
                  "& .ListItemText-primary": {
                    fontFamily: "Lato",
                    color: "#0A0A0A",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  )
}

const SideMenu = ({ selectedMenu, pilar, loading, BASE_URL_API_V2_CLIENT }) => {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleHamburger = () => {
    setOpenDrawer((prev) => !prev);
  };

  return (
    <>
      {!mobileTab ? (
        <Box
          sx={{
            flex: "1",
            background: "#ffffff",
            p: 2,
            boxShadow: "4px 4px 40px rgba(0, 0, 0, 0.06)",
          }}
        >
          <Link href="/">
            <a className="py-4">
              <Image
                src="/Simawas_logo_long.svg"
                alt="Simawas Pagi"
                width={150}
                height={48}
              />
            </a>
          </Link>
          <ListMenu selectedMenu={selectedMenu} pilar={pilar} BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT} />
        </Box>
      ) : (
        <Box
          className={`fixed w-full bg-white` }
          style={{zIndex: 99}}
        >
          <Box className="flex items-center justify-between px-0" >
            <Box className="flex items-center space-x-2">
              <Link href="/">
                <a className="py-1 pl-4 pr-1 -ml-4">
                  <Image
                    src="/Simawas_logo_long.svg"
                    alt="Simawas Pagi"
                    width={190}
                    height={48}
                  />
                </a>
              </Link>
            </Box>
            <Box className="p-3">
              <IconButton variant="contained" color="success" onClick={handleHamburger}>
                <Menu />
              </IconButton>
            </Box>
            <Drawer open={openDrawer} handleClose={handleHamburger} position="right">
              <Box
                sx={{
                  flex: "1",
                  background: "#ffffff",
                  p: 2,
                  boxShadow: "4px 4px 40px rgba(0, 0, 0, 0.06)",
                }}
              >
                <Box className="text-right">
                  <IconButton variant="contained" color="success" onClick={handleHamburger}>
                    <Close />
                  </IconButton>
                </Box>
                <ListMenu selectedMenu={selectedMenu} pilar={pilar} BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT} />
              </Box>
            </Drawer>
          </Box>
          {loading && <LinearProgress color="success" />}
        </Box>
      )}
    </>
  );
};

export default SideMenu;
