import React from "react";
import { Grid, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, ExpandMore } from "@mui/icons-material";
import useMediaQuery from "@/hooks/useMediaQuery";

const fontLato14Gray = {
  fontFamily: 'Lato',
  fontSize: '14px',
  color: '#424242',
};

const Pagination = ({ 
  rowOptions = [], 
  pageOptions = [], 
  onChangeTotalRow = () =>{},
  onChangePageNumber = () =>{},
  totalData = 0,
  totalPage = 0,
  disableRowOptions = false,
}) => {
  const { isMobile, isTablet } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );
  
  const [isOpenSelectRow, setIsOpenSelectRow] = React.useState(false);
  const [isOpenSelectPage, setIsOpenSelectPage] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(10);
  const [selectedPage, setSelectedPage] = React.useState(1);

  React.useEffect(() => {
    if (totalPage <= 0) {
      setSelectedPage('-');
      setSelectedRow('-');
    } else {
      setSelectedPage(1);
      setSelectedRow(selectedRow === '-' ? 10 : selectedRow);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPage])

  const refRow = React.useRef(null);
  const refPage = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (refRow.current && !refRow.current.contains(event.target)) {
        setIsOpenSelectRow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refRow]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (refPage.current && !refPage.current.contains(event.target)) {
        setIsOpenSelectPage(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refPage]);

  const disableNext = Math.max(...pageOptions) === selectedPage || totalPage <= 0;
  const disablePrev = Math.min(...pageOptions) === selectedPage || totalPage <= 0;
  const nextColor = disableNext ? '#BDBDBD' : "#008444";
  const prevColor = disablePrev ? '#BDBDBD' : "#008444";
  return (
    <div
      className="w-full my-5 bg-white"
      style={{...fontLato14Gray, borderBottom: mobileTab ? 'unset' : '1px solid #008444'}}>
        <Grid
        container
        direction="row"
      >
        {!mobileTab &&
          <Grid
            item
            xl={6}
            md={6}
            sm={12}
            xs={12}
            className="flex"
          >
            {
              !disableRowOptions &&
              <>
                <Typography sx={{...fontLato14Gray, padding: '10px'}}>Tampilkan</Typography>
                <div style={{width: "90px"}} ref={refRow}>
                  <button type="button" 
                    className="w-full text-right"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    style={{...fontLato14Gray, padding: '10px', fontWeight: "700"}}
                    onClick={() => setIsOpenSelectRow(!isOpenSelectRow)}
                  >
                    {selectedRow} <ExpandMore sx={{marginLeft: "10px", color: "#008444"}} />
                  </button>
                  <div
                    className= {`origin-top-right absolute mt-2 shadow-lg bg-white ${isOpenSelectRow ? 'visible' : 'invisible'}`}
                    style={{maxHeight: '200px', overflowY: 'auto'}}
                  >
                    {Array.isArray(rowOptions) && rowOptions.map((item) => (
                      <div className="py-1" key={item}>
                        <div className="block px-4 cursor-pointer text-right" onClick={() => {
                          onChangeTotalRow(item);
                          setSelectedRow(item);
                          setSelectedPage(1);
                          setIsOpenSelectRow(false);
                        }}>{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            }
            <Typography sx={{...fontLato14Gray, padding: '10px'}}>Dataset</Typography>
            <Typography sx={{...fontLato14Gray, padding: '10px', borderLeft: mobileTab ? 'unset' : '1px solid #EEEEEE', borderRight: mobileTab ? 'unset' : '1px solid #EEEEEE'}}>dari total {totalData}</Typography>
          </Grid>
        }
        <Grid
          item
          xl={6}
          md={6}
          sm={12}
          xs={12}
          className={`${!mobileTab && 'flex justify-end'}`}
        >
          {!mobileTab &&
            <div className="flex">
              <Typography sx={{...fontLato14Gray, padding: '10px'}}>Halaman</Typography>
              <div style={{width: "90px"}} ref={refPage}>
                <button type="button" 
                  className="w-full text-right"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  style={{...fontLato14Gray, padding: '10px', fontWeight: "700"}}
                  onClick={() => setIsOpenSelectPage(!isOpenSelectPage)}
                >
                  {selectedPage} <ExpandMore sx={{marginLeft: "10px", color: "#008444"}} />
                </button>
                <div
                  className= {`origin-top-right absolute mt-2 shadow-lg bg-white ${isOpenSelectPage ? 'visible' : 'invisible'}`}
                  style={{maxHeight: '200px', overflowY: 'auto'}}
                >
                  {Array.isArray(pageOptions) && pageOptions.map((item) => (
                    <div className="py-1" key={item}>
                      <div className="block px-4 cursor-pointer text-right" onClick={() => {
                        onChangePageNumber(item);
                        setSelectedPage(item);
                        setIsOpenSelectPage(false);
                      }}>{item}</div>
                    </div>
                  ))}
                </div>
              </div>
              <Typography sx={{...fontLato14Gray, padding: '10px', borderRight: mobileTab ? 'unset' : '1px solid #EEEEEE'}}>dari {totalPage}</Typography>
            </div>
          }
          <div className={`flex ${mobileTab && "w-full justify-center mt-5"}`}>
            <button 
              className="hover:bg-gray-100"
              onClick={() => {
                if (!disablePrev) {
                  onChangePageNumber(selectedPage-1);
                  setSelectedPage(selectedPage-1);
                }
              }}
              style={{borderRight: '1px solid #EEEEEE', marginLeft: mobileTab ? "0px" : "10px"}}
            >
              <ChevronLeft sx={{margin: "10px", color: prevColor}} />
            </button>
            {mobileTab &&
              <div ref={refPage}>
                <button type="button" 
                  className="w-full text-right"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  style={{...fontLato14Gray, padding: '10px', fontWeight: "700"}}
                  onClick={() => setIsOpenSelectPage(!isOpenSelectPage)}
                >
                  {selectedPage} <ExpandMore sx={{marginLeft: "10px", color: "#008444"}} />
                </button>
                <div
                  className= {`origin-top-right absolute mt-2 shadow-lg bg-white ${isOpenSelectPage ? 'visible' : 'invisible'}`}
                  style={{maxHeight: '200px', overflowY: 'auto'}}
                >
                  {Array.isArray(pageOptions) && pageOptions.map((item) => (
                    <div className="py-1" key={item}>
                      <div className="block px-4 cursor-pointer text-right" onClick={() => {
                        onChangePageNumber(item);
                        setSelectedPage(item);
                        setIsOpenSelectPage(false);
                      }}>{item}</div>
                    </div>
                  ))}
                </div>
              </div>
            }
            <button 
              className="hover:bg-gray-100"
              onClick={() => {
                if (!disableNext) {
                  onChangePageNumber(selectedPage+1);
                  setSelectedPage(selectedPage+1);
                }
              }}
              style={{borderLeft: '1px solid #EEEEEE'}}
            >
              <ChevronRight sx={{margin: "10px", color: nextColor}} />
            </button>
          </div>
        </Grid>
        
      </Grid>
    </div>
  );
};

export default Pagination;
