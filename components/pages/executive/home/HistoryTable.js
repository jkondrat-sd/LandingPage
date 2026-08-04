import React from "react";
import dynamic from "next/dynamic";
import useMediaQuery from "@/hooks/useMediaQuery";
import _ from "lodash";

// MUI
const CircularProgress = dynamic(() =>
  import("@mui/material/CircularProgress")
);
import {
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

// _legacy
import { Pagination } from "@/components/_legacy";

import styled from "@emotion/styled";
import { convertKeyToLabel, formatDateId, sortArrayObjectByDate } from "@/utils/common";

function getPaginatedItems(items, page, pageSize) {
  var pg = page || 1,
    pgSize = pageSize || 10,
    offset = (pg - 1) * pgSize,
    pagedItems = _.drop(items, offset).slice(0, pgSize);
  return {
    page: pg,
    pageSize: pgSize,
    total: items.length,
    total_pages: Math.ceil(items.length / pgSize),
    data: pagedItems,
  };
}

const colors = (value) => {
  let color = "";
  if (value > 80) {
    color = "#008444";
  } else if (value > 46) {
    color = "#FFB900";
  } else if (value <= 46) {
    color = "#F44336";
  }
  return color;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#AAD6C1",
    color: "#008444",
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: "Lato",
    border: "none",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F8FCFB",
  },
}));

export default function HistoryTable({ data, isLoading }) {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const [paginatedData, setPaginatedData] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);
  const [tableHeader, setTableHeader] = React.useState([]);

  React.useEffect(() => {
    if (data.length > 0) {
      let header = ["Periode", "Ketersediaan", "Keterjangkauan", "Pemanfaatan"];

      setTableHeader(header);
    } else {
      setTableHeader(["Data"]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  React.useEffect(() => {
    if (data.length > 0) {
      const paginate = getPaginatedItems(sortArrayObjectByDate(data, 'periode', 'desc'));
      setPaginatedData(paginate.data);
      setPageSize(paginate.pageSize);
      setPage(paginate.page);
      setTotalPage(paginate.total_pages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  React.useEffect(() => {
    const paginate = getPaginatedItems(
      sortArrayObjectByDate(data, 'periode', 'desc'),
      page,
      pageSize
    );
    setPaginatedData(paginate.data);
    setTotalPage(paginate.total_pages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  return (
    <>
      <Grid container>
        <Grid item xl={12} md={12} sm={12} xs={12}>
          <TableContainer
            component={Box}
            sx={{ border: "solid 1px #AAD6C1" }}
            className="rounded-b-xl"
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  {tableHeader.map((header, i) => (
                    <StyledTableCell
                      className={`capitalize ${
                        mobileTab ? "text-sm" : "text-lg"
                      } `}
                      key={i}
                    >
                      {convertKeyToLabel(header)}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      colSpan={6}
                      className="text-center"
                    >
                      <CircularProgress color="success" />
                    </StyledTableCell>
                  </TableRow>
                ) : data.length > 0 ? (
                  paginatedData.map((row, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell className="whitespace-nowrap">
                        {formatDateId(row?.periode)}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ color: colors(row?.ketersediaan) }}
                      >
                        {row?.ketersediaan === "unknown"
                          ? "-"
                          : row?.ketersediaan}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ color: colors(row?.keterjangkauan) }}
                      >
                        {row?.keterjangkauan === "unknown"
                          ? "-"
                          : row?.keterjangkauan}
                      </StyledTableCell>
                      <StyledTableCell sx={{ color: colors(row?.pemanfaatan) }}>
                        {row?.pemanfaatan === "unknown"
                          ? "-"
                          : row?.pemanfaatan}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <TableRow>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      colSpan={6}
                      className="text-center"
                    >
                      Tidak ada data.
                    </StyledTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ marginTop: mobileTab ? "25px" : "50px" }}>
            <Pagination
              rowOptions={totalPage > 0 ? [10, 20, 50] : []}
              pageOptions={Array.from({ length: totalPage }, (_, i) => i + 1)}
              onChangeTotalRow={(limit) => {
                setPageSize(limit);
                setPage(1);
              }}
              onChangePageNumber={(page) => {
                setPage(page);
              }}
              totalData={data?.count}
              totalPage={totalPage}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
