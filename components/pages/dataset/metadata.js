import React from "react";
import dynamic from "next/dynamic";
import useMediaQuery from "@/hooks/useMediaQuery";

// MUI
const CircularProgress = dynamic(() =>
  import("@mui/material/CircularProgress")
);
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';

import styled from "@emotion/styled";
import { convertKeyToLabel, formatDateId } from "@/utils/common";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#008444",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "16px",
    fontFamily: "Lato"
  },
}));

export default function Metadata({ metadata, isLoading }) {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const [data, setData] = React.useState([]);
  
  React.useEffect(() => {
    const meta = [];
    for (const key in metadata) {
      if (Object.hasOwnProperty.call(metadata, key)) {
        const val = (key === 'tanggal_update_terakhir' || key === 'tanggal_upload')
          ? formatDateId(metadata[key])
          : metadata[key]
        meta.push({
          key: convertKeyToLabel(key),
          val: val,
        })
      }
    }
    setData(meta);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadata])

  return (
    <>
      <TableContainer component={Paper} className="rounded-lg mt-8">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className={mobileTab ? 'text-sm' : 'text-lg'}>No.</StyledTableCell>
              <StyledTableCell className={mobileTab ? 'text-sm' : 'text-lg'}>Indikator</StyledTableCell>
              <StyledTableCell className={mobileTab ? 'text-sm' : 'text-lg'}>Metadata</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading 
              ? (
                <TableRow>
                  <StyledTableCell component="th" scope="row" colSpan={3} className="text-center">
                    <CircularProgress color="success" />
                  </StyledTableCell>
                </TableRow>
              )
              : (data.length > 0 
                ? data.map((row, i) => (
                  <TableRow key={i}>
                    <StyledTableCell component="th" scope="row" style={{fontSize: mobileTab ? '12px' : '16px'}}>
                      {i+1}
                    </StyledTableCell>
                    <StyledTableCell className="capitalize" style={{fontSize: mobileTab ? '12px' : '16px'}}>{row.key}</StyledTableCell>
                    <StyledTableCell style={{fontSize: mobileTab ? '12px' : '16px'}}>{row.val}</StyledTableCell>
                  </TableRow>
                ))
                : (
                  <TableRow>
                    <StyledTableCell component="th" scope="row" colSpan={3} className="text-center">
                      Tidak ada data.
                    </StyledTableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
