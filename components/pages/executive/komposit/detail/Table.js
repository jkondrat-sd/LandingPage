import React from "react";
import dynamic from "next/dynamic";
import useMediaQuery from "@/hooks/useMediaQuery";
import _ from "lodash";

// MUI
const CircularProgress = dynamic(() =>
  import("@mui/material/CircularProgress")
);
import { Grid, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import styled from "@emotion/styled";
import { Pagination, TextWithIcon } from "@/components/_legacy";
import { convertValidDate, sortArrayObjectByDate } from "@/utils/common";
import { LinkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { commodityStockPerDay } from "@/utils/constant";
import dayjs from "dayjs";

function getPaginatedItems(items, page, pageSize) {
  var pg = page || 1,
    pgSize = pageSize || 10,
    offset = (pg - 1) * pgSize,
    pagedItems = _.drop(items, offset).slice(0, pgSize);
  return {
    page: pg,
    pageSize: pgSize,
    total: items?.length,
    total_pages: Math.ceil(items?.length / pgSize),
    data: pagedItems
  };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#AAD6C1",
    color: "#008444",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1em",
    fontFamily: "Lato",
    border: "none",
    textTransform: "capitalize",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#F8FCFB",
  },
}));

export default function DetailTable({ data, isLoading, chartLegends, params, pilar }) {
  const router = useRouter();
  const { isMobile, isTablet } = useMediaQuery();

  const tableData = sortArrayObjectByDate(data, 'period', 'desc')
  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);

  React.useEffect(() => {
    if (data?.length > 0) {
      const paginate = getPaginatedItems(sortArrayObjectByDate(data, 'period', 'desc'))
      setPageSize(paginate.pageSize)
      setPage(paginate.page)
      setTotalPage(paginate.total_pages)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])

  React.useEffect(() => {
    const paginate = getPaginatedItems(sortArrayObjectByDate(data, 'period', 'desc'), page, pageSize)
    setTotalPage(paginate.total_pages)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page, pageSize])

  return (
    <>
      <Grid container>
        <Grid item xl={12} md={12} sm={12} xs={12} className="bg-white mb-3 py-3 rounded-xl">
          <TableContainer component={Box} sx={{border: "solid 1px #AAD6C1"}} className="rounded-b-xl">
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    className={`capitalize ${mobileTab ? 'text-sm' : 'text-lg'} `}
                  >
                    Periode
                  </StyledTableCell>
                  {
                    tableData?.map((header, i) => (
                      i >= ((page-1)*10) && i < ((page-1)*10)+10 &&
                      <StyledTableCell
                        className={`capitalize ${mobileTab ? 'text-sm' : 'text-lg'} whitespace-nowrap`}
                        key={i}
                      >
                        {
                          pilar === "ketersediaan"
                          ? (
                            <Box
                              className="flex gap-1 cursor-pointer hover:bg-green-500 hover:text-white rounded-md"
                              sx={{fontSize: "0.9em"}}
                              onClick={() => {
                                router.push({
                                  pathname: "/executive/keterjangkauan/detail",
                                  query: { kode_kabupaten: params.city, date: dayjs(convertValidDate(header.period)).format("YYYY-MM") },
                                });
                              }}
                            >
                              {header.period}
                              {pilar === "ketersediaan" && <LinkIcon width={15}/>}
                            </Box>
                          )
                          : header.period
                        }
                        
                      </StyledTableCell>
                    ))
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading 
                  ? (
                    <TableRow>
                      <StyledTableCell component="th" scope="row" colSpan={6} className="text-center">
                        <CircularProgress color="success" />
                      </StyledTableCell>
                    </TableRow>
                  ) 
                  : (tableData?.length > 0 
                    ?
                    chartLegends.map((legend, idx) => (
                      <StyledTableRow key={idx}>
                        <StyledTableCell className="whitespace-nowrap" >
                          {legend.title}
                        </StyledTableCell>
                        {
                          tableData?.map((item, i) => {
                            const labels = [
                              "",
                              "Rentan",
                              "Waspada",
                              "Aman",
                            ]
                            const colors = [
                              "",
                              "#F44336",
                              "#FFA600",
                              "#008444",
                            ]

                            const dayNumber = pilar === "ketersediaan" && item[legend.slug]?.replace(/\D/g, "");
                            const stockReference = commodityStockPerDay.find((com) => com.commodity === legend.slug);
                            const statusPerValue = stockReference && pilar === "ketersediaan" 
                              ? dayNumber >= stockReference.aman ? "Aman" : dayNumber >= stockReference.waspada ? "Waspada" : "Rentan"
                              : "";
                            return (
                              i >= ((page-1)*10) && i < ((page-1)*10)+10 &&
                              <StyledTableCell key={i} sx={{color: colors[_.indexOf(labels, item[legend.slug])] || colors[_.indexOf(labels, statusPerValue)]}} >
                                {item[legend.slug]}
                              </StyledTableCell>
                            )
                          })
                        }
                      </StyledTableRow>
                    ))
                    : (
                      <TableRow>
                        <StyledTableCell component="th" scope="row" colSpan={6} className="text-center">
                          Tidak ada data.
                        </StyledTableCell>
                      </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{marginTop: mobileTab ? '25px' : '50px'}}>
            <Pagination
              disableRowOptions
              pageOptions={Array.from({length: totalPage}, (_, i) => i + 1)}
              onChangeTotalRow={(limit) => {
                setPageSize(limit)
                setPage(1)
              }}
              onChangePageNumber={(page) => {
                setPage(page)
              }}
              totalData={data?.length}
              totalPage={totalPage}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
