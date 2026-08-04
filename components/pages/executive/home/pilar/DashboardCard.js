import React from "react";
import dynamic from "next/dynamic";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ArrowDownward,
  ArrowUpward,
  ExpandMore,
  OpenInNew,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import useMediaQuery from "@/hooks/useMediaQuery";
import { convertKeyToLabel, formatDateId } from "@/utils/common";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import StatusReferenceInline from "../../statusReferenceInline";
import StatusReferenceSide from "../../statusReferenceSide";
import dayjs from "dayjs";

const DoughnutChart = dynamic(() =>
  import("@/components/pages/executive/home/pilar/DoughnutChart")
);
const BarChart = dynamic(() =>
  import("@/components/pages/executive/home/pilar/BarChart")
);

const statuses = ["", "Rentan", "Waspada", "Aman"];
const colors = ["", "#F44336", "#FFB900", "#008444"];
const backgrounds = ["", "#FFEBEE", "#FFF9E1", "#E6F6EC"];
const getStatusColor = (status) => {
  const index = statuses.indexOf(status[0]?.toUpperCase() + status?.slice(1));
  return colors[index];
};
const getStatusBg = (status) => {
  const index = statuses.indexOf(status[0]?.toUpperCase() + status?.slice(1));
  return backgrounds[index];
};

export default function DashboardCard({ params, cardData, cardDetail, title, aman, waspada, rentan, legends=undefined }) {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );
  const router = useRouter();

  const [selectedStatus, setSelectedStatus] = React.useState("aman");
  const [listByStatus, setListByStatus] = React.useState([]);
  const [tableIds, setTableIds] = React.useState([]);
  const chartData = {
    aman: cardDetail?.status?.aman?.length || 0,
    waspada: cardDetail?.status?.waspada?.length || 0,
    rentan: cardDetail?.status?.rentan?.length || 0,
  };

  React.useEffect(() => {
    if (cardDetail?.status?.aman?.length > 0) {
      setSelectedStatus("aman");
    } else if (cardDetail?.status?.waspada?.length > 0) {
      setSelectedStatus("waspada");
    } else {
      setSelectedStatus("rentan");
    }
  }, [cardDetail]);

  React.useEffect(() => {
    const lists =
      cardDetail?.status?.[selectedStatus]?.map((item) => {
        return convertKeyToLabel(item.nama_komoditas || item.nama_kota);
      }) || [];
    setListByStatus(lists);
    const ids =
      cardDetail?.status?.[selectedStatus]?.map(
        (item) => item.id_komoditas || item.id_kota
      ) || [];
    setTableIds(ids);
  }, [cardDetail, selectedStatus]);

  return (
    <Box
      className="p-5 h-full"
      sx={{
        borderRadius: "12px",
        background: "#F8FCFB",
        boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.10)",
      }}
    >
      <Box className="flex justify-between items-center">
        <Typography
          className="font-lato-500 capitalize"
          fontSize="1.8rem"
          sx={{ color: "#008444" }}
        >
          {title}
        </Typography>
        <Button
          size="small"
          type=""
          className="flex gap-3 items-center px-2 hover:bg-green-400"
          sx={{
            color: "#ffffff",
            background: "#008444",
            textTransform: "none",
            minWidth: "90px",
            boxShadow:
              "-10px 18px 6px 0px rgba(0, 0, 0, 0.00), -7px 11px 5px 0px rgba(0, 0, 0, 0.02), -4px 6px 4px 0px rgba(0, 0, 0, 0.08), -2px 3px 3px 0px rgba(0, 0, 0, 0.13), 0px 1px 2px 0px rgba(0, 0, 0, 0.15)",
          }}
          onClick={() => router.push(`/executive/${title}`)}
        >
          <Typography
            className="font-lato mt-1"
          >
            Detail
          </Typography>
          <ArrowTopRightOnSquareIcon className="w-5 h-5" aria-hidden="true" />
        </Button>
      </Box>
      <Divider className="my-3" sx={{ borderColor: "#008444" }} />
      {!legends && (
        <StatusReferenceInline aman={aman} waspada={waspada} rentan={rentan} />
      )}
      <Box className="flex justify-center items-center">
        {legends && (
          <Box className="flex-1">
            <StatusReferenceSide legends={legends} />
          </Box>
        )}
        <Box className="flex-1">
          <Box className="flex justify-center pt-5 relative">
            <DoughnutChart
              cardData={cardData}
              color={title === 'underweight' ? colors[cardData?.persentase <= 10 ? 3 : (cardData?.persentase > 10 && cardData?.persentase <= 15 ? 2 : 1)] : colors[cardData?.status]}
              title={title}
            />
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-lato-500 pt-5">
              <Typography fontFamily="Lato" fontSize="1.5em" color="#1E1B39">
                {cardData?.persentase?.toFixed(0) || "N/A"}%
              </Typography>
              <Typography
                fontFamily="Lato"
                fontSize="1.1em"
                color={title === 'underweight' ? colors[cardData?.persentase <= 10 ? 3 : (cardData?.persentase > 10 && cardData?.persentase <= 15 ? 2 : 1)] : colors[cardData?.status]}
              >
                {cardData?.status ? (title === 'underweight' ? statuses[cardData?.persentase <= 10 ? 3 : (cardData?.persentase > 10 && cardData?.persentase <= 15 ? 2 : 1)] : statuses[cardData?.status]) : "N/A"}
              </Typography>
            </Box>
          </Box>
          <Box
            className={
              mobileTab
                ? "text-center"
                : "flex gap-2 items-center justify-center p-2"
            }
          >
            <Typography
              fontFamily="Lato"
              fontWeight={500}
              fontSize="0.8em"
              color="#404040"
            >
              bulan lalu
            </Typography>
            <Box className="flex items-center justify-center">
              {cardData?.selisih_persentase > 0 ? (
                <ArrowUpward fontSize="inherit" sx={{ color: "#008444" }} />
              ) : (
                cardData?.selisih_persentase < 0 && (
                  <ArrowDownward fontSize="inherit" sx={{ color: "#F44336" }} />
                )
              )}
              <Typography
                fontFamily="Lato"
                fontSize="0.9em"
                color={
                  cardData?.selisih_persentase == 0
                    ? "#FFB900"
                    : cardData?.selisih_persentase > 0
                    ? "#008444"
                    : "#F44336"
                }
              >
                {`${cardData?.selisih_persentase?.toFixed(1) || "N/A"}%`}
              </Typography>
            </Box>
          </Box>
          <Box className="text-center">
            <Typography
              fontFamily="Lato"
              fontWeight={500}
              fontSize="0.8em"
              color="#404040"
            >
              Data Bulan: {params?.date ? (title === 'pemanfaatan' ? formatDateId(dayjs(params?.date).subtract(1,'year'), "MMMM YYYY") : formatDateId(params?.date, "MMMM YYYY")) : "N/A"}
            </Typography>
            <Typography
              fontFamily="Lato"
              fontWeight={500}
              fontSize="0.8em"
              color="#404040"
            >
              Last Update: {formatDateId(cardData?.updated_at) || "N/A"}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box>
        <Grid container direction="row" alignItems="center" className="mt-5">
          <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
            <BarChart
              chartData={chartData}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            md={5}
            lg={5}
            xl={5}
            className="text-right capitalize"
          >
            <Typography
              fontFamily="Lato"
              fontSize="0.9em"
              fontWeight={500}
            >
              {title === "stunting" || title === "wasting" || title === "underweight"
                ? `${cardDetail?.status?.[selectedStatus]?.length}/27 Kab Kota ${selectedStatus}`
                : (title === "pemanfaatan" ? `${cardDetail?.status?.[selectedStatus]?.length}/11 Kelompok Pangan ${selectedStatus}` : `${cardDetail?.status?.[selectedStatus]?.length}/11 Komoditas ${selectedStatus}`)}
            </Typography>
          </Grid>
        </Grid>
        <Typography
          fontFamily="Lato"
          fontSize="0.9em"
          color="#757575"
          fontWeight={500}
          className="capitalize"
        >
          {listByStatus.toString().replaceAll(",", ", ")}
        </Typography>
        <Accordion
          disableGutters
          sx={{
            "&:before": {
              background: "none",
            },
            background: "none",
            boxShadow: "none",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore sx={{ color: "#008444" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              width: "unset",
            }}
          >
            <Typography
              className="w-full text-right"
              fontFamily="Lato"
              fontSize="0.9em"
              color="#008444"
              fontWeight={500}
            >
              Lihat Detail
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer
              component={Paper}
              sx={{
                fontSize: "0.8em",
                maxHeight: "350px",
              }}
            >
              <Table size="small" aria-label="a dense table">
                <TableBody
                  sx={{
                    fontSize: "0.8em",
                  }}
                >
                  {cardDetail?.table?.map((row, idx) => {
                    if (tableIds.includes(row.id_komoditas || row.id_kota)) {
                      if (title === "stunting" || title === "wasting" || title === "underweight") {
                        let cityData = [];
                        for (const key in row) {
                          if (Object.hasOwnProperty.call(row, key)) {
                            if (key !== "id_kota" && key !== "nama_kota") {
                              cityData.push(
                                <TableRow
                                  key={`${idx}-${title}-${key}`}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    className="capitalize border"
                                  >
                                    {(key === "bb_normal" || key === "sangat_pendek" || key === "gizi_buruk") &&
                                      convertKeyToLabel(row.nama_kota)}
                                  </TableCell>
                                  <TableCell className="capitalize border">
                                    {convertKeyToLabel(key)}
                                  </TableCell>
                                  <TableCell className="border">
                                    {row[key]}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          }
                        }
                        return cityData.map((item) => item);
                      } else {
                        const lists =
                          row.kota?.map((item) => {
                            return convertKeyToLabel(item.nama_kota);
                          }) || [];
                        return (
                          <TableRow
                            key={`${idx}-${title}`}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              className="capitalize whitespace-nowrap border"
                            >
                              {row.status === "aman" &&
                                convertKeyToLabel(row.nama_komoditas)}
                            </TableCell>
                            <TableCell
                              scope="row"
                              className="capitalize border"
                              sx={{
                                color: getStatusColor(row.status || ""),
                                background: getStatusBg(row.status || ""),
                              }}
                            >
                              {lists.toString().replaceAll(",", ", ") || "-"}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    }
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}
