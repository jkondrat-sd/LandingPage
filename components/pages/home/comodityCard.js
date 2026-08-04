import React from "react";
import Link from "next/link";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import HargaChart from "./hargaChart";
import { strategicCommodityList } from "@/utils/constant";

const chartData = [
  {
    tanggal: "2023-12-21",
    harga: 25000
  },
  {
    tanggal: "2023-12-22",
    harga: 26000
  },
  {
    tanggal: "2023-12-23",
    harga: 30000
  },
  {
    tanggal: "2023-12-24",
    harga: 23000
  },
  {
    tanggal: "2023-12-25",
    harga: 20000
  },
  {
    tanggal: "2023-12-26",
    harga: 25000
  },
  {
    tanggal: "2023-12-27",
    harga: 28000
  },
]

const ComodityCard = ({ comodity, flag }) => {
  // const [clicked, setClicked] = React.useState(false);
  return (
    <Box className="xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full w-full px-5 mb-5">
      {/* <Link
        className="flex-1"
        href={`/dashboard/harga?comodity_id=${comodity.id_commodity}`}
        passHref
      > */}
        <Box
          className="h-full"
          // onClick={() => setClicked(true)}
        >
          <Box
            className="hover:shadow-lg cursor-pointer relative"
            style={{
              borderRadius: "20px",
              background: flag === "konsumen" ? "#008444" : "#FFA600",
              color: flag === "konsumen" ? "#FFFFFF" : "#404040",
            }}
          >
            {/* {clicked && (
              <Box className="absolute top-5 right-5">
                <CircularProgress sx={{ color: flag === "konsumen" ? "#ffffff" : "#404040" }} />
              </Box>
            )} */}
            <Box className="grid grid-cols-4 p-5">
              <Box className="col-span-3">
                <Typography className="font-lato-700 capitalize">
                  {comodity?.origin_commodity_name}
                </Typography>
                <Typography className="font-lato-700">Rp. {comodity?.current_average?.toFixed(0)}</Typography>
              </Box>

              <Box
                style={{
                  width: "56px",
                  height: "56px",
                  position: "relative",
                }}
              >
                <Image
                  src={`/icons/komoditas/${strategicCommodityList?.find((item) => item.key === comodity?.komoditas_id)?.silindaId || "default"
                  }.svg`}
                  layout="fill"
                  alt="icon"
                />
              </Box>
            </Box>
            <Box
              className="flex justify-between items-center px-5 py-2"
              style={{
                background: flag === "konsumen" ? "#5EAB83" : "#FFF5C5",
                borderRadius: "0px 0px 20px 20px",
                backdropFilter: "blur(27.5px)",
                maxHeight: "5rem"
              }}
            >
              <Box className="flex-1 h-full">
                <Box className="flex items-center gap-2">
                  {comodity?.compare_change_percentage > 0 ? (
                    <ArrowUpIcon style={{ height: "1rem" }} />
                  ) : (
                    <ArrowDownIcon style={{ height: "1rem" }} />
                  )}
                  <Typography
                    fontSize="0.9rem"
                    className="font-lato capitalize"
                  >
                    {comodity?.compare_change_percentage?.toFixed(2)}%
                  </Typography>
                </Box>
                <Typography fontSize="0.9rem" className="font-lato">
                  Rp. {comodity?.compare_change?.toFixed(0)}
                </Typography>
              </Box>
              <Box className="flex-1">
                <HargaChart chartData={comodity?.series || []} flag={flag} />
              </Box>
            </Box>
          </Box>
        </Box>
      {/* </Link> */}
    </Box>
  );
};

export default ComodityCard;
