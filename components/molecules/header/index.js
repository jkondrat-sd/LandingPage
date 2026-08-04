import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// MUI
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

// MUI ICONS
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// atoms
import Container from "@/components/atoms/container";

// molecules
import Drawer from "@/components/molecules/drawer";

// CustomHooks
import useMediaQuery from "@/hooks/useMediaQuery";
import Profile from "./profile";

const Header = ({
  headerRef,
  innerContainer = true,
  BASE_URL_API_V2_CLIENT,
}) => {
  const router = useRouter();
  const { isMobile } = useMediaQuery();

  const pathArray = React.useMemo(
    () => router.pathname.split("/"),
    [router.pathname]
  );

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleHamburger = () => {
    setOpenDrawer((prev) => !prev);
  };

  return (
    <>
      <HeaderBase headerRef={headerRef} innerContainer={innerContainer}>
        {isMobile ? (
          <MenuIcon onClick={handleHamburger} />
        ) : (
          <Navigation
            pathArray={pathArray}
            BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT}
          />
        )}
      </HeaderBase>
      <Drawer open={openDrawer} handleClose={handleHamburger} position="right">
        <NavigationMobile
          pathArray={pathArray}
          handleClose={handleHamburger}
          BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT}
        />
      </Drawer>
    </>
  );
};

const Navigation = ({ pathArray, BASE_URL_API_V2_CLIENT }) => {
  const btnDefault =
    "text-green-600 px-4 w-auto h-12 rounded-md active:shadow-lg mouse transition ease-in duration-200 focus:outline-none font-lato-500";
  const btnActivePage =
    "hover:text-black text-white px-4 w-auto h-12 rounded-md bg-green-600 hover:bg-green-400 active:shadow-lg mouse transition ease-in duration-200 focus:outline-none font-lato-500";
  return (
    <>
      <Link href="/" passHref>
        <a
          className={pathArray[1] === "" ? btnActivePage : btnDefault}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          id="btn-beranda"
        >
          Beranda
        </a>
      </Link>

      {/* <Link href="/dashboard" passHref>
        <a
          className={pathArray[1] === "dashboard" ? btnActivePage : btnDefault}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          id="btn-dashboard"
        >
          Dashboard
        </a>
      </Link> */}

      <Link href="/executive" passHref>
        <a
          className={pathArray[1] === "executive" ? btnActivePage : btnDefault}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          id="btn-dashboard"
        >
          Dashboard
        </a>
      </Link>

      <Link href="/dataset" passHref>
        <a
          className={pathArray[1] === "dataset" ? btnActivePage : btnDefault}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          id="btn-dataset"
        >
          Dataset
        </a>
      </Link>

      <Link href="/publikasi" passHref>
        <a
          className={pathArray[1] === "publikasi" ? btnActivePage : btnDefault}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          id="btn-publikasi"
        >
          Publikasi
        </a>
      </Link>

      <Link href="/about" passHref>
        <a
          className={pathArray[1] === "about" ? btnActivePage : btnDefault}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          id="btn-about"
        >
          Tentang
        </a>
      </Link>

      <Link href="/aplikasi-dkpp" passHref>
        <a
          className={pathArray[1] === "aplikasi-dkpp" ? btnActivePage : btnDefault}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          id="btn-aplikasi-dkpp"
        >
          Aplikasi DKPP
        </a>
      </Link>

      <Profile BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT} />
    </>
  );
};

const HeaderBase = ({ headerRef, children, innerContainer = true }) => {
  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 backdrop-filter backdrop-blur-xl backdrop-saturate-50"
      style={{ backgroundColor: "#CCE6DA" }}
    >
      {innerContainer && (
        <Container maxWidth="xl">
          <Content innerContainer={innerContainer}>{children}</Content>
        </Container>
      )}
      {!innerContainer && (
        <Content innerContainer={innerContainer}>{children}</Content>
      )}
    </header>
  );
};

const Content = ({ children, innerContainer }) => {
  return (
    <div
      className={`flex items-center justify-between ${innerContainer && "max-w-screen-2xl"
        } px-0 mx-auto`}
    >
      <div className="flex items-center space-x-2">
        <Link href="/">
          <a className="py-2 pl-4 pr-1 -ml-4">
            <Image
              src="/Simawas_logo_long.svg"
              alt="Simawas Pagi"
              width={190}
              height={48}
            />
          </a>
        </Link>
      </div>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        {children}
      </nav>
    </div>
  );
};

const NavigationMobile = ({
  pathArray,
  handleClose,
  BASE_URL_API_V2_CLIENT,
}) => {
  const [open, setOpen] = React.useState({
    ketahananPangan: pathArray[1] === "ketahanan_pangan",
    peternakan: pathArray[1] === "peternakan",
  });

  const handleOpen = (target) => {
    setOpen((prev) => ({ ...prev, [target]: !prev[target] }));
  };

  return (
    <Box sx={{ height: "100%", overflow: "scroll" }}>
      <Box
        component={"nav"}
        aria-label="Child Menu Mobile"
        sx={{ height: "90%", paddingBottom: 110 }}
      >
        <List sx={{ width: "310px" }}>
          {/* Beranda */}
          <Link href="/" passHref>
            <ListItemButton>
              <ListItemText primary="Beranda" />
            </ListItemButton>
          </Link>
          {/* Beranda */}

          <Divider />

          {/* Dashboard Public*/}
          <Link href="/dashboard" passHref>
            <ListItemButton>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>
          {/* Dashboard Public*/}

          <Divider />

          {/* Dataset */}
          <Link href="/dataset" passHref>
            <ListItemButton>
              <ListItemText primary="Dataset" />
            </ListItemButton>
          </Link>
          {/* Dataset */}

          <Divider />

          {/* Dashboard */}
          <Link href="/executive" passHref>
            <ListItemButton>
              <ListItemText primary="Eksekutif" />
            </ListItemButton>
          </Link>
          {/* Dashboard */}

          <Divider />

          {/* Tentang */}
          <Link href="/about" passHref>
            <ListItemButton>
              <ListItemText primary="Tentang" />
            </ListItemButton>
          </Link>
          {/* Tentang */}

          <Divider />

          {/* Aplikasi DKPP */}
          <Link href="/aplikasi-dkpp" passHref>
            <ListItemButton>
              <ListItemText primary="Aplikasi DKPP" />
            </ListItemButton>
          </Link>
          {/* Aplikasi DKPP */}

          <Divider />

          <Box className="text-center p-3">
            <Profile BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT} />
          </Box>
        </List>
      </Box>
      <Box
        sx={{
          position: "absolute",
          height: 50,
          width: 50,
          bottom: "15px",
          left: 0,
          right: 0,
          ml: "auto",
          mr: "auto",
          display: "flex",
          justifyContent: "center",
          background: "red",
          borderRadius: 25,
        }}
      >
        <IconButton
          aria-label="close menu mobile"
          size="large"
          onClick={handleClose}
        >
          <CloseIcon fontSize="inherit" sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
