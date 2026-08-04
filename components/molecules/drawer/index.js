import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const Main = ({ children, position, open, handleClose }) => {
  const positionMemo = React.useMemo(() => {
    const enumPost = {
      left: "left",
      right: "right",
      top: "top",
      bottom: "bottom",
    };

    if (enumPost[position]) {
      return enumPost[position];
    } else {
      return "right";
    }
  }, [position]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    handleClose(open);
  };

  return (
    positionMemo && (
      <Drawer
        anchor={positionMemo}
        open={open}
        onClose={toggleDrawer(positionMemo, false)}
      >
        {children}
      </Drawer>
    )
  );
};

export default Main;
