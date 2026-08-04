import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import { Logout, Person } from "@mui/icons-material";
import { getProfile, userLogout } from "@/utils/auth";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const Profile = ({ BASE_URL_API_V2_CLIENT, lite = false }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userLoggedin, setUserLoggedin] = React.useState({});
  const userCookie = getCookie("user");
  const token = getCookie("Authorization");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (token) {
      getProfile({ BASE_URL_API_V2_CLIENT });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  React.useEffect(() => {
    if (userCookie) {
      setUserLoggedin(JSON.parse(userCookie));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCookie]);

  const avatarIcon = () => {
    const arrayName = userLoggedin?.profile?.given_name?.split(" ");
    const first = arrayName && arrayName[0] ? arrayName[0][0] : "";
    const second = arrayName && arrayName[1] ? arrayName[1][0] : "";
    return first + second;
  };

  if (!userCookie) {
    return <></>;
  }

  return lite ? (
    <Accordion
      disableGutters
      TransitionProps={{ unmountOnExit: true }}
      style={{
        borderRadius: "10px",
        border: "solid 1px #008444",
        boxShadow: "none",
        minWidth: "170px",
        padding: "1px",
      }}
    >
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          padding: 0,
          minHeight: "unset",
        }}
      >
        <Box className="flex gap-2 items-center justify-start capitalize px-3">
          <Avatar
            sx={{
              width: 30,
              height: 30,
              fontSize: "1em",
              backgroundColor: "#008444",
            }}
          >
            {avatarIcon()}
          </Avatar>
          {`${userLoggedin?.profile?.given_name || ""} ${
            userLoggedin?.profile?.family_name || ""
          }`}
        </Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: 0,
        }}
      >
        <Divider sx={{ borderColor: "#008444" }} />
        <Button
          sx={{
            display: "flex",
            gap: 2,
            textTransform: "capitalize",
            color: "#000000",
            justifyContent: "start",
            alignItems: "center",
            padding: 1,
          }}
          onClick={() =>
            router.push("/auth/profile")
          }
        >
          <Person sx={{ width: 30, height: 30 }} /> Profile
        </Button>
        <Divider sx={{ borderColor: "#008444" }} />
        <Button
          sx={{
            display: "flex",
            gap: 2,
            textTransform: "capitalize",
            color: "#000000",
            justifyContent: "start",
            alignItems: "center",
            padding: 1,
          }}
          onClick={() =>
            userLogout({ BASE_URL_API_V2_CLIENT, redirect: "/auth/login" })
          }
        >
          <Logout sx={{ width: 30, height: 30 }} /> Log Out
        </Button>
      </AccordionDetails>
    </Accordion>
  ) : (
    <Box>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        color="success"
        disableElevation
        sx={{
          borderRadius: "24px",
          fontSize: "1em",
          fontFamily: "Lato",
          color: "#008444",
          ml: 2,
          textTransform: "capitalize",
          p: 1,
          gap: 1,
        }}
        onClick={handleClick}
      >
        <Avatar
          sx={{
            width: 30,
            height: 30,
            fontSize: "1em",
            backgroundColor: "#008444",
          }}
        >
          {avatarIcon()}
        </Avatar>
        {`${userLoggedin?.profile?.given_name || ""} ${
          userLoggedin?.profile?.family_name || ""
        }`}
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 1,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            backgroundColor: "#CCE6DA",
            color: "#008444",
            mt: 2,
            borderRadius: "24px",
            fontFamily: "Lato",
            minWidth: "200px",
            border: "solid 1px #008444",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          className="flex gap-2 py-2 px-3"
          onClick={() =>
            router.push("/auth/profile")
          }
        >
          <Person /> Profile
        </MenuItem>
        <Divider sx={{ borderColor: "#008444" }} />
        <MenuItem
          className="flex gap-2 py-2 px-3"
          onClick={() =>
            userLogout({ BASE_URL_API_V2_CLIENT, redirect: "/auth/login" })
          }
        >
          <Logout /> Log Out
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Profile;
