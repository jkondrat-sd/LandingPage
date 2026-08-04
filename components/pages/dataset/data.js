import React from "react";
import dynamic from "next/dynamic";
import useMediaQuery from "@/hooks/useMediaQuery";

// MUI
const CircularProgress = dynamic(() =>
  import("@mui/material/CircularProgress")
);
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

// _legacy
import {
  CustomCheckbox,
  FilterAccordion,
  Pagination,
} from "@/components/_legacy";

import styled from "@emotion/styled";
import { Download, Launch } from "@mui/icons-material";
import { convertKeyToLabel } from "@/utils/common";
import SurveyForm from "./SurveyForm";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#008444",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "16px",
    fontFamily: "Lato",
  },
}));

export default function Data({
  detail,
  pageInfo,
  metaFilter,
  filter,
  setFilter,
  isLoading,
  handleExport,
  tableHeader,
  setTableHeader,
  apiLink,
  defaultLimit,
  surveyPurpose,
  surveySector,
  datasetId,
  BASE_URL_API_V2_CLIENT,
  isOpenSurvey,
  setIsOpenSurvey,
}) {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const [isOpen, setIsOpen] = React.useState(false);
  const [] = React.useState(true);
  const downloadOptions = [
    {
      value: "xls",
      label: "XLS",
      handleClick: () => {
        handleExport(".xlsx");
        setIsOpen(false);
      },
    },
    {
      value: "csv",
      label: "CSV",
      handleClick: () => {
        handleExport(".csv");
        setIsOpen(false);
      },
    },
    // {
    //   value: 'api',
    //   label: (<div className="w-full flex justify-between">API <Launch /></div>),
    //   handleClick: () => {
    //     setIsOpen(false);
    //     window.open(apiLink, "_blank");
    //   }
    // },
  ];
  const downloadRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (downloadRef.current && !downloadRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [downloadRef]);

  const openDropdown = isOpen ? "z-50 visible" : "invisible";

  const changeHandler = (key, value) => {
    if (key === "limit" || key === "skip") {
      setFilter({
        ...filter,
        [key]: value,
      });
    } else {
      setFilter({
        ...filter,
        [key]: value,
        ...defaultLimit,
      });
    }
  };

  const totalPage =
    pageInfo?.limit > 0 ? Math.ceil(pageInfo?.count / pageInfo?.limit) : 1;

  React.useEffect(() => {
    if (detail.length > 0) {
      let header = [];
      let qty = "";
      for (const key in detail[0]) {
        if (Object.hasOwnProperty.call(detail[0], key)) {
          if (key !== "_id" && key !== "id") {
            header.push(key);
          }
          if (key.match(/jumlah.*/)) {
            qty = key;
          }
        }
      }
      // header = [...new Set(header)];
      if (header.indexOf(qty) > -1) {
        header.splice(header.indexOf(qty), 1);
        header.push(qty);
      }
      if (header.indexOf("satuan") > -1) {
        header.splice(header.indexOf("satuan"), 1);
        header.push("satuan");
      }
      if (header.indexOf("tahun") > -1) {
        header.splice(header.indexOf("tahun"), 1);
        header.push("tahun");
      }

      setTableHeader(header);
    } else {
      setTableHeader(["Data"]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail]);

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: "16px" }}>
        <Grid item xl={3} md={3} sm={12} xs={12} sx={{ marginTop: "16px" }}>
          <Box className="flex justify-between mb-5">
            <Typography
              variant="h4"
              style={{
                fontFamily: "Lato",
                fontSize: mobileTab ? "20px" : "28px",
              }}
            >
              Filter
            </Typography>
            <Typography className="text-sm my-auto font-lato">
              Menampilkan{" "}
              {detail.length > 0 &&
                pageInfo?.skip + 1 + "-" + detail.length + " dari "}{" "}
              {pageInfo?.count} Data
            </Typography>
          </Box>
          <Box className="shadow-md w-full">
            {Array.isArray(metaFilter?.nama_kabupaten_kota) &&
              metaFilter?.nama_kabupaten_kota.length > 0 && (
                <FilterAccordion
                  title="Kabupaten / Kota"
                  expanded={mobileTab ? false : true}
                >
                  {Array.isArray(metaFilter?.nama_kabupaten_kota) &&
                    metaFilter?.nama_kabupaten_kota.map((item, i) => (
                      <CustomCheckbox
                        key={i}
                        label={item}
                        value={item}
                        id={i + 1}
                        onChange={(value) => {
                          if (value) {
                            const val = filter.nama_kabupaten_kota;
                            val.push(value);
                            changeHandler("nama_kabupaten_kota", val);
                          } else {
                            const val = filter.nama_kabupaten_kota;
                            const index = val.indexOf(item);
                            if (index > -1) {
                              val.splice(index, 1);
                            }
                            changeHandler("nama_kabupaten_kota", val);
                          }
                        }}
                      />
                    ))}
                </FilterAccordion>
              )}
            {Array.isArray(metaFilter?.bps_nama_kabupaten_kota) &&
              metaFilter?.bps_nama_kabupaten_kota.length > 0 && (
                <FilterAccordion
                  title="Kabupaten / Kota"
                  expanded={mobileTab ? false : true}
                >
                  {Array.isArray(metaFilter?.bps_nama_kabupaten_kota) &&
                    metaFilter?.bps_nama_kabupaten_kota.map((item, i) => (
                      <CustomCheckbox
                        key={i}
                        label={item}
                        value={item}
                        id={i + 1}
                        onChange={(value) => {
                          if (value) {
                            const val = filter.bps_nama_kabupaten_kota;
                            val.push(value);
                            changeHandler("bps_nama_kabupaten_kota", val);
                          } else {
                            const val = filter.bps_nama_kabupaten_kota;
                            const index = val.indexOf(item);
                            if (index > -1) {
                              val.splice(index, 1);
                            }
                            changeHandler("bps_nama_kabupaten_kota", val);
                          }
                        }}
                      />
                    ))}
                </FilterAccordion>
              )}
            {Array.isArray(metaFilter?.nama_komoditas) &&
              metaFilter?.nama_komoditas.length > 0 && (
                <FilterAccordion
                  title="Nama Komoditas"
                  expanded={mobileTab ? false : true}
                >
                  {Array.isArray(metaFilter?.nama_komoditas) &&
                    metaFilter?.nama_komoditas.map((item, i) => (
                      <CustomCheckbox
                        key={i}
                        label={item}
                        value={item}
                        id={i + 1}
                        onChange={(value) => {
                          if (value) {
                            const val = filter.nama_komoditas;
                            val.push(value);
                            changeHandler("nama_komoditas", val);
                          } else {
                            const val = filter.nama_komoditas;
                            const index = val.indexOf(item);
                            if (index > -1) {
                              val.splice(index, 1);
                            }
                            changeHandler("nama_komoditas", val);
                          }
                        }}
                      />
                    ))}
                </FilterAccordion>
              )}
            {Array.isArray(metaFilter?.nama_prov) &&
              metaFilter?.nama_prov.length > 0 && (
                <FilterAccordion
                  title="Provinsi"
                  expanded={mobileTab ? false : true}
                >
                  {Array.isArray(metaFilter?.nama_prov) &&
                    metaFilter?.nama_prov.map((item, i) => (
                      <CustomCheckbox
                        key={i}
                        label={item}
                        value={item}
                        id={i + 1}
                        onChange={(value) => {
                          if (value) {
                            const val = filter.nama_prov;
                            val.push(value);
                            changeHandler("nama_prov", val);
                          } else {
                            const val = filter.nama_prov;
                            const index = val.indexOf(item);
                            if (index > -1) {
                              val.splice(index, 1);
                            }
                            changeHandler("nama_prov", val);
                          }
                        }}
                      />
                    ))}
                </FilterAccordion>
              )}
            {Array.isArray(metaFilter?.asal_provinsi) &&
              metaFilter?.asal_provinsi.length > 0 && (
                <FilterAccordion
                  title="Asal Provinsi"
                  expanded={mobileTab ? false : true}
                >
                  {Array.isArray(metaFilter?.asal_provinsi) &&
                    metaFilter?.asal_provinsi.map((item, i) => (
                      <CustomCheckbox
                        key={i}
                        label={item}
                        value={item}
                        id={i + 1}
                        onChange={(value) => {
                          if (value) {
                            const val = filter.asal_provinsi;
                            val.push(value);
                            changeHandler("asal_provinsi", val);
                          } else {
                            const val = filter.asal_provinsi;
                            const index = val.indexOf(item);
                            if (index > -1) {
                              val.splice(index, 1);
                            }
                            changeHandler("asal_provinsi", val);
                          }
                        }}
                      />
                    ))}
                </FilterAccordion>
              )}
            {Array.isArray(metaFilter?.tahun) &&
              metaFilter?.tahun.length > 0 && (
                <FilterAccordion
                  title="Tahun"
                  expanded={mobileTab ? false : true}
                >
                  {Array.isArray(metaFilter?.tahun) &&
                    metaFilter?.tahun.map((item, i) => (
                      <CustomCheckbox
                        key={i}
                        label={item}
                        value={item}
                        id={i + 1}
                        onChange={(value) => {
                          if (value) {
                            const val = filter.tahun;
                            val.push(value);
                            changeHandler("tahun", val);
                          } else {
                            const val = filter.tahun;
                            const index = val.indexOf(item);
                            if (index > -1) {
                              val.splice(index, 1);
                            }
                            changeHandler("tahun", val);
                          }
                        }}
                      />
                    ))}
                </FilterAccordion>
              )}
          </Box>
        </Grid>
        <Grid item xl={9} md={9} sm={12} xs={12}>
          <Box className="text-right mb-5">
            <div
              className="relative inline-block text-left font-lato"
              ref={downloadRef}
            >
              <Button
                color="success"
                variant="contained"
                style={{
                  textTransform: "none",
                  backgroundColor: "#008444",
                  padding: "10px 32px",
                  fontSize: "20px",
                }}
                onClick={() => setIsOpen(!isOpen)}
              >
                <Download /> Unduh
              </Button>
              <div
                className={`origin-top-right absolute right-0 mt-2 w-full rounded-b-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${openDropdown}`}
              >
                {Array.isArray(downloadOptions) &&
                  downloadOptions.map((item, i) => (
                    <div
                      className="py-1 hover:bg-gray-200"
                      style={{
                        borderTop: i === 2 ? "1px solid #E0E0E0" : "0px",
                      }}
                      key={item.value}
                    >
                      <div
                        className="block px-4 py-2 cursor-pointer"
                        onClick={item.handleClick}
                      >
                        {item.label}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Box>
          <TableContainer component={Paper} className="rounded-lg">
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  {tableHeader.map((header, i) => (
                    <StyledTableCell
                      className={`capitalize text-center ${
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
                ) : detail.length > 0 ? (
                  detail.map((row) => (
                    <TableRow key={row._id}>
                      {tableHeader.map((header, i) => {
                        const wrap =
                          header === "nama_provinsi" ||
                          header === "nama_kabupaten_kota"
                            ? "whitespace-nowrap"
                            : "";
                        const align =
                          typeof row[header] === "number" ? "text-center" : "";
                        return (
                          <StyledTableCell
                            key={i}
                            className={`${wrap} ${align}`}
                            style={{ fontSize: mobileTab ? "12px" : "16px" }}
                          >
                            {row[header]}
                          </StyledTableCell>
                        );
                      })}
                    </TableRow>
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
              rowOptions={totalPage > 0 ? [10, 20, 50, 100] : []}
              pageOptions={Array.from({ length: totalPage }, (_, i) => i + 1)}
              onChangeTotalRow={(limit) => {
                setFilter({
                  ...filter,
                  skip: 0,
                  limit: limit,
                });
              }}
              onChangePageNumber={(page) => {
                setFilter({
                  ...filter,
                  skip: (page - 1) * filter.limit,
                });
              }}
              totalData={pageInfo?.count}
              totalPage={totalPage}
            />
          </div>
        </Grid>
      </Grid>
      <SurveyForm
        open={isOpenSurvey}
        setOpen={setIsOpenSurvey}
        surveyPurpose={surveyPurpose}
        surveySector={surveySector}
        datasetId={datasetId}
        BASE_URL_API_V2_CLIENT={BASE_URL_API_V2_CLIENT}
      />
    </>
  );
}
