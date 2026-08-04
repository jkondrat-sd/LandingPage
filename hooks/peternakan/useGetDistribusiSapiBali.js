import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import _ from "lodash";

const Box = dynamic(() => import("@mui/material/Box"));
const Typography = dynamic(() => import("@mui/material/Typography"));

const Main = ({ baseUrl }) => {
  const [dataDistribusiSapiBali, setDataDistribusiSapiBali] = useState([]);
  const [errorDistribusiSapiBali, setErrorDistribusiSapiBali] = useState(false);
  const [loadingDistribusiSapiBali, setLoadingDistribusiSapiBali] =
    useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setErrorDistribusiSapiBali(false);
        setLoadingDistribusiSapiBali(true);
        const res = await axios.get(
          baseUrl + "/peternakan/distribusi/sapi_bali"
        );
        const data = res?.data?.data?.list || [];
        setDataDistribusiSapiBali(data);
        setLoadingDistribusiSapiBali(false);
      } catch (error) {
        console.log("error : ", error.message);
        setLoadingDistribusiSapiBali(false);
        setErrorDistribusiSapiBali(true);
      }
    };

    getData();
  }, [baseUrl]);

  return {
    dataDistribusiSapiBali,
    errorDistribusiSapiBali: false,
    loadingDistribusiSapiBali: false,
  };
};

export const useGetMarkerDistribusiSapi = (data) => {
  const [markerDistribusiSapi, setMarkerDistribusiSapi] = useState([]);
  const [origin, setOrigin] = useState([]);
  const [destination, setDestination] = useState([]);

  useEffect(() => {
    if (!data || !data.length) return;
    let bucketDest = [];
    let bucketOrigin = [];
    const sorted = _.sortBy(data, ["kordinat_asal", "kordinat_destinasi"]);

    if (sorted.length) {
      // get collective destination (get all same coordinate to one data)
      for (let index = 0; index < sorted.length; index++) {
        const element = sorted[index];

        if (index === 0) {
          bucketDest.push({
            kordinat_destinasi: element.kordinat_destinasi,
            member: [element],
          });
        } else {
          const prevElement = sorted[index - 1];
          if (
            element.kordinat_destinasi[0] ===
              prevElement.kordinat_destinasi[0] &&
            element.kordinat_destinasi[1] === prevElement.kordinat_destinasi[1]
          ) {
            let indexTarget = bucketDest.findIndex(
              (ed) =>
                ed.kordinat_destinasi[0] === element.kordinat_destinasi[0] &&
                ed.kordinat_destinasi[1] === element.kordinat_destinasi[1]
            );
            let cache = bucketDest[indexTarget];
            cache.member.push(element);
            bucketDest[indexTarget] = cache;
          } else {
            bucketDest.push({
              kordinat_destinasi: element.kordinat_destinasi,
              member: [element],
            });
          }
        }
      }

      // get collective origin (get all same coordinate to one data)
      for (let index = 0; index < sorted.length; index++) {
        const element = sorted[index];

        if (index === 0) {
          bucketOrigin.push({
            kordinat_asal: element.kordinat_asal,
            member: [element],
          });
        } else {
          const prevElement = sorted[index - 1];
          if (
            element.kordinat_asal[0] === prevElement.kordinat_asal[0] &&
            element.kordinat_asal[1] === prevElement.kordinat_asal[1]
          ) {
            let indexTarget = bucketOrigin.findIndex(
              (ed) =>
                ed.kordinat_asal[0] === element.kordinat_asal[0] &&
                ed.kordinat_asal[1] === element.kordinat_asal[1]
            );
            let cache = bucketOrigin[indexTarget];
            cache.member.push(element);
            bucketOrigin[indexTarget] = cache;
          } else {
            bucketOrigin.push({
              kordinat_asal: element.kordinat_asal,
              member: [element],
            });
          }
        }
      }
    }
    setOrigin(bucketOrigin);
    setDestination(bucketDest);

    console.log("bucketDest : ", bucketDest);
    console.log("bucketOrigin : ", bucketOrigin);
  }, [data]);

  // set marker
  useMemo(() => {
    // destination marker
    const destBacked = destination.map((e) => {
      return {
        kordinat: {
          y: Number(e.kordinat_destinasi[0]),
          x: Number(e.kordinat_destinasi[1]),
        },
        markerIcon: "/media/location-pin-yellow.png",
        tooltip: () => <div>Klik untuk melihat lebih detail.</div>,
        height: 20,
        width: 20,
        style: { position: "absolute", top: -15, left: -5 },
      };
    });
    // origin marker
    const originBacked = origin.map((e) => {
      return {
        kordinat: {
          y: Number(e.kordinat_asal[0]),
          x: Number(e.kordinat_asal[1]),
        },
        markerIcon: "/media/location-pin-yellow.png",
        tooltip: () => <div>Klik untuk melihat lebih detail.</div>,
        height: 20,
        width: 20,
      };
    });

    setMarkerDistribusiSapi(originBacked.concat(destBacked));
  }, [destination, origin]);

  return {
    originData: origin,
    destinationData: destination,
    markerDistribusiSapi,
  };
};

export default Main;
