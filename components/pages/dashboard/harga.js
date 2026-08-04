import React from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { Title } from "@/components/_legacy";
import useMediaQuery from "@/hooks/useMediaQuery";
import ComodityCard from "@/components/pages/dashboard/comodityCard";
import axios from "axios";
import moment from "moment";
import { formatDateId } from "@/utils/common";


const Harga = ({ BASE_URL_API_V1_CLIENT }) => {
  const { isMobile, isTablet, isDesktop } = useMediaQuery();

  const mobileTab = React.useMemo(
    () => isMobile || isTablet,
    [isMobile, isTablet]
  );

  const [prices, setPrices] = React.useState([]);
  const [meta, setMeta] = React.useState({});
  const [description, setDescription] = React.useState("");
  let dayBefore = moment();
  dayBefore = dayBefore.subtract(1, "days");
  const [params, setParams] = React.useState({});
  React.useEffect(() => {
    setParams({
      date: moment().format('HH') < 14 ? dayBefore.format('YYYYMMDD') : moment().format('YYYYMMDD')
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getPrices = async () => {
    try {
      const res = await axios.get(
        BASE_URL_API_V1_CLIENT + "/dashboard/harga",
        { params }
      );
      setPrices(res?.data?.data?.prices || []);
      setMeta(res?.data?.meta || {});
      setDescription(res?.data?.data?.dashboard || "");
    } catch (error) {
      console.log("error : ", error);
    }
  };

  React.useEffect(() => {
    if (params?.date) {
      getPrices();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <>
      <div className="flex flex-wrap sm:align-middle">
        <div
          className={`flex w-full items-center -md ${
            !isMobile ? "p-6" : "p-5"
          } mt-5`}
        >
          <Title text="Harga Konsumen Pangan Strategis Jawa Barat" style={{fontSize: mobileTab ? '20px' : '26px'}} />
        </div>
        
        {prices.map((sc) => {
          if (sc.id_commodity !== 38) {
            return (
              <ComodityCard
                comodity={sc}
                mobileTab={mobileTab}
                key={sc.id_commodity}
              >
                <div style={{width: '86px', height: '86px', position: 'relative'}}>
                  <Image src={`/icons/komoditas/${sc.id_commodity || 'default'}.svg`} layout="fill" alt="icon" />
                </div>
              </ComodityCard>
            );
          }
        })}
      </div>
      <Box className={`w-full ${mobileTab ? "text-center" : "text-right"}`}>
        <Typography className="font-lato" sx={{fontSize: '14px', color: '#404040'}}>
          Sumber Data: {meta?.source_data}
        </Typography>
        <Typography className="font-lato" sx={{fontSize: '14px', color: '#404040'}}>
          Update Terakhir: {formatDateId(params.date)}
        </Typography>
      </Box>
      <Box className="w-full mt-5">
        <div className="rounded-xl p-4" style={{border: 'solid 1px #AAD6C1', padding: '36px 24px'}}>
          <Typography
            className="font-lato text-justify"
            sx={{fontSize: mobileTab ? '16px' : '20px', color: '#404040'}}
            dangerouslySetInnerHTML={
              {
                __html: description.replace('kenaikan', "<strong style='color:#F44336'>kenaikan</strong>")
                  .replace('penurunan', "<strong style='color:#008444'>penurunan</strong>")
                  .replace('stagnan', "<strong style='color:#FFA600'>stagnan</strong>")
              }
            }>
          </Typography>
        </div>
      </Box>
      <div className="w-full text-center mt-5">
        <Link href="/dashboard/harga" passHref>
          <a
            className="font-lato"
            style={{
              fontSize: mobileTab ? '16px' : '20px',
              textDecorationLine: "underline",
              color: "#404040",
              lineHeight: "28px",
            }}
          >
            Lihat Selengkapnya
          </a>
        </Link>
      </div>
    </>
  );
};

export default Harga;
