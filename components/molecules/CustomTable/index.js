import React from "react";
import { DataGrid, GridToolbar, GridPagination } from "@mui/x-data-grid";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import useMediaQuery from "@/hooks/useMediaQuery";

const Main = ({
  children,
  externalFilter,
  height,
  columns,
  rows,
  dataGridProps,
  customPaginationElement,
  containerProps,
}) => {
  const { isMobile } = useMediaQuery();

  return (
    <Box
      sx={{
        height: height,
        width: "100%",
        background: "white",
        "& .DataGrid-columnHeaders": {
          background: "#059657",
          color: "white",
          borderRadius: 0,
        },
        "& .DataGrid-cell": {
          '&[data-field="nama_komoditas"]': {
            textTransform: "capitalize",
          },
          '&[data-field="kab_kot"]': {
            textTransform: "capitalize",
          },
          '&[data-field="bulan"]': {
            textTransform: "capitalize",
          },
        },
      }}
      {...containerProps}
    >
      <DataGrid
        disableSelectionOnClick
        disableDensitySelector
        rows={rows}
        columns={columns}
        components={{
          Toolbar: (props) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                background: "#059657",
                borderRadius: "4px 4px 0px 0px",
                py: 3,
              }}
            >
              {!isMobile && (
                <Box sx={{ "& .Button-root": { color: "white" } }}>
                  <GridToolbar {...props} />
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  textTransform: "capitalize",
                  ml: "auto",
                  pr: 1,
                }}
              >
                {externalFilter}
              </Box>
            </Box>
          ),
          Pagination: (props) => (
            <Box
              sx={{ dilsplay: "flex", flexDirection: "column", width: "100%" }}
            >
              {customPaginationElement}
              <GridPagination {...props} />
            </Box>
          ),
        }}
        {...dataGridProps}
      />
    </Box>
  );
};

export default Main;
