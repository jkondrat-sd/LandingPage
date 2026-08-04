import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import MaUTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useTable } from "react-table";

function Table({ columns = [], data = [] }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead
        sx={{
          backgroundColor: "#008444",
          "& .TableCell-head": {
            color: "white !important",
            fontWeight: "bold",
            fontFamily: "'Inter', sans-serif",
            fontSize: "20px",
          },
        }}
      >
        {headerGroups.map((headerGroup, index) => (
          <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <TableCell key={index} {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow key={i} {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                return (
                  <TableCell key={index} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
}

function App({ columns = [], data = [] }) {
  return (
    <>
      <CssBaseline />
      <Table columns={columns} data={data} />
    </>
  );
}

export default App;
