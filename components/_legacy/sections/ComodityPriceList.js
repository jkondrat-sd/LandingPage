import React from "react";
import dynamic from "next/dynamic";

// import Papa from "papaparse";
import _ from "lodash";
import axios from "axios";

import { RoundedCard } from "@/components/_legacy";

const JabarMap = dynamic(() => import("@/components/organisms/JabarMap"), {
  ssr: false,
});

import {
  strategicCommodityList,
  comodityList,
  districtOrCityList,
  DATA_MAP,
} from "@/utils/constant";

const ComodityPriceList = () => {
  const [commodity, setCommodity] = React.useState(null);

  const findComodityName = (id) => {
    return comodityList[id];
  };

  const findDistrictOrCity = (id) => {
    return districtOrCityList[id];
  };

  const replaceUnderScore = (str) => {
    return str.replaceAll("_", " ");
  };

  const [mapData, setMapData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!commodity) return;
    async function getData() {
      setLoading(true);

      const { data } = await axios.get("/api/admin/neraca");

      let dataSpread = [...data];
      const modifiedRows = dataSpread
        .filter((row) => {
          // commodity based ion state selected on JabarMap component
          return row.kode_komoditas == commodity.value;
        })
        .map((row) => {
          const neraca = row.ketersediaan - row.kebutuhan;
          const status =
            row.ketersediaan / row.kebutuhan <= 89 / 100
              ? "defisit"
              : row.ketersediaan / row.kebutuhan > 110 / 100
              ? "surplus"
              : row.ketersediaan / row.kebutuhan > 89 / 100 &&
                row.ketersediaan / row.kebutuhan <= 110 / 100
              ? "aman"
              : "data_kosong";
          const nama_kabupaten_atau_kota = replaceUnderScore(
            findDistrictOrCity(row.kode_kabupaten_atau_kota)
          );
          const nama_komoditas = replaceUnderScore(
            findComodityName(row.kode_komoditas)
          );
          return {
            ...row,
            neraca,
            status,
            nama_kabupaten_atau_kota,
            nama_komoditas,
          };
        });
      setLoading(false);

      setMapData(modifiedRows);
    }
    getData();
  }, [commodity]);

  const dataMana = _.chain(mapData).groupBy("kode_kabupaten_atau_kota").value();

  const dataEnhanced = DATA_MAP.map((el) => {
    const data = _.chain(dataMana)
      .assign({})
      .at(`${el.id}`)
      .sortBy(["minggu", "bulan"])
      .head()
      .value();

    const initData = {
      minggu: 0,
      neraca: 0,
      kebutuhan: 0,
      ketersediaan: 0,
      status: "data_kosong",
    };
    const value = initData;
    const headData = _.head(data);
    if (data) {
      value.minggu = headData["minggu"];
      value.neraca = headData["neraca"];
      value.kebutuhan = headData["kebutuhan"];
      value.ketersediaan = headData["ketersediaan"];
      value.status = headData["status"];
    }
    return {
      ...el,
      value,
    };
  });

  return (
    <section className="">
      <div className="flex flex-wrap">
        <div className="xl:w-full lg:w-full md:w-full sm:w-full w-full px-2">
          <h1 className="mb-4 text-3xl font-bold text-neutral-blue-gray font-lora">
            Map Infographic Neraca
          </h1>
          {loading ? (
            <p></p>
          ) : (
            <JabarMap
              commodity={commodity}
              setCommodity={setCommodity}
              data={dataEnhanced}
            />
          )}
          <div className="flex items-center -md p-4 mt-24">
            <div className="">
              <h5 className="text-3xl font-bold text-neutral-blue-gray font-lora">
                Daftar Harga Pangan
              </h5>
              <h3 className="text-3xl font-bold text-neutral-blue-gray font-lora">
                Provinsi Jawa Barat
              </h3>
            </div>
          </div>
        </div>
        <div className="xl:w-1/3 lg:w-1/3 md:w-1/3 sm:w-full w-full px-2 mb-4">
          <div className="flex items-center -md p-4">
            <div className="">
              <p className="text-base font-normal leading-6 text-neutral-blue-gray font-lato">
                Menyajikan dan menampilkan harga 11 komoditas pangan harian di
                Kabupaten/Kota Provinsi Jawa Barat
              </p>
            </div>
          </div>
        </div>

        {strategicCommodityList.map((sc) => {
          return (
            <RoundedCard
              comodity={sc.commodityTitle.replace(
                /(^\w{1})|(\s+\w{1})/g,
                (letter) => letter.toUpperCase()
              )}
              comodityId={sc.silindaId}
              key={sc.silindaId}
            >
              {sc.imageSVG}
            </RoundedCard>
          );
        })}
      </div>
    </section>
  );
};

export default ComodityPriceList;
