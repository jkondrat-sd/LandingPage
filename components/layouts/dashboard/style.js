export const drawerStyle = (drawerWidth) => {
  return {
    width: drawerWidth,
    flexShrink: 0,
  };
};

export const drawerPaperStyle = (drawerWidth) => {
  return {
    width: drawerWidth,
    boxSizing: "border-box",
  };
};

export const appBarContentStyle = ({ openDrawer, drawerWidth }) => {
  return {
    backgroundColor: "white",
    color: "black",
    pl: openDrawer ? drawerWidth + "px" : "0px",
  };
};

export const containerContentStyle = ({ openDrawer, drawerWidth }) => {
  return {
    flexGrow: 1,
    ml: openDrawer ? drawerWidth + "px" : "0px",
    maxWidth: "1800px",
  };
};
