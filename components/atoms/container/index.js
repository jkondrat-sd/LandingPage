import React from "react";

import { CssBaseline, Box } from "@mui/material";

import { CustomContainer } from "./style";

function ContainerAtom({ children, maxWidth, sx , component}) {
  return (
    <React.Fragment>
      <CssBaseline />
      <CustomContainer maxWidth={maxWidth} sx={sx} component={component}>
        {children}
      </CustomContainer>
    </React.Fragment>
  );
}

export default ContainerAtom;
