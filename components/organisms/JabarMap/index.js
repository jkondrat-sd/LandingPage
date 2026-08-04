/* eslint-disable @next/next/no-img-element */
import React from "react";
import { MapContainer, GeoJSON, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Select from "react-select";

// ? Hooks
import { useRouter } from "next/router";

// ? Constants
import dataMap from "@/utils/constant/jabarByKab.json";
import {
  districtOrCityList,
  comodityList,
  commodityPublicIconPath,
  strategicCommodityList,
} from "@/utils/constant";

// ? Legacy components
import DescriptionCard from "@/legacy_components/Map/DescriptionCard";
import Button from "@/legacy_components/Button";

// CustomHooks
import useMediaQuery from "@/hooks/useMediaQuery";

import SummaryProvince from "@/components/organisms/JabarMap/SummaryProvince";

const JabarMap = ({ data, commodity, setCommodity, summation }) => {
  let router = useRouter();
  const { isMobile } = useMediaQuery();

  const handleNavigation = (location) => {
    router.push(location);
  };

  const [clickedRegionId, setClickedRegionId] = React.useState(null);

  const optionsMemo = React.useMemo(() => options(), []);

  // React.useEffect(() => {
  //   if (!commodity && optionsMemo.length) {
  //     setCommodity(optionsMemo[0]);
  //   }
  // }, [commodity, optionsMemo, setCommodity]);

  React.useEffect(() => {
    if (!clickedRegionId || !commodity?.value) return;

    handleNavigation(
      `/ketahanan_pangan/neraca_pangan/detail?location=${clickedRegionId}&commodity=${commodity.value}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedRegionId, commodity]);

  const onMouseOver = (area) => {
    area.setStyle({
      fillOpacity: 0.8,
      weight: 0.9,
      color: "black",
    });
  };

  const onMouseLeave = (area) => {
    area.setStyle({
      fillOpacity: 1,
      weight: 0.9,
      color: "black",
    });
  };

  const onMapRegionClicked = (IdKab) => {
    setClickedRegionId(IdKab);
  };

  const onEachFeature = (feature, layer) => {
    const id = feature.properties.ID_KAB;
    const title = feature.properties.KABKOT;
    const options = {
      sticky: true,
    };
    layer.options.fillColor = setColor(id);
    layer.on({
      mouseover: (event) => onMouseOver(event.target),
      mouseout: (event) => onMouseLeave(event.target),
      click: () => onMapRegionClicked(id),
    });
    const arr = title.split(" ");
    const modTitle =
      arr.length > 1 && arr[0] == "KOTA"
        ? arr.join(" ")
        : ["kabupaten", ...arr].join(" ");
    const dataMapPerDistrict = setData(id) || {};
    layer.bindTooltip(
      `
        <h2 style="font-weight: bold;">${modTitle
          .toLowerCase()
          .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
            letter.toUpperCase()
          )}</h2>
        <p><i>Minggu ${dataMapPerDistrict["minggu"]}</i></p>
        <p>Ketersediaan: ${dataMapPerDistrict["ketersediaan"]} Ton</p>
        <p>Kebutuhan: ${dataMapPerDistrict["kebutuhan"]} Ton</p>
        <p>Neraca: ${dataMapPerDistrict["neraca"]} Ton</p>
        <p>Status Neraca: ${setStatus(id)}</p>
      `,
      options
    );
  };

  const setColor = (kode_kabupaten_atau_kota) => {
    const selected = data.find((area) => area.kode_kabupaten_atau_kota == kode_kabupaten_atau_kota);
    return selected?.status == "surplus"
      ? "#16A75C"
      : selected?.status == "aman"
      ? "#FFA600"
      : selected?.status == "defisit"
      ? "#F44336"
      : "#FFFFFF";
  };

  const setData = (kode_kabupaten_atau_kota) => {
    const selected = data.find((area) => area.kode_kabupaten_atau_kota == kode_kabupaten_atau_kota);
    return selected;
  };

  const setStatus = (kode_kabupaten_atau_kota) => {
    const selected = data.find((area) => area.kode_kabupaten_atau_kota == kode_kabupaten_atau_kota);
    return selected?.status;
  };

  const handleSelect = (value) => {
    setCommodity(value);
  };

  if (!commodity) return null;

  return (
    <div
      className={`${!isMobile && "rounded-lg"} relative ${
        !isMobile && "shadow-lg  drop-shadow-lg overflow-hidden"
      }`}
    >
      <div
        className={`${
          !isMobile
            ? "absolute top-1 left-1 z-10"
            : "absolute z-10 mt-5 w-full flex justify-center"
        }`}
      >
        {optionsMemo && (
          <Select
            options={optionsMemo}
            placeholder="Pilih komoditas"
            defaultValue={commodity}
            onChange={handleSelect}
            styles={selectStyles}
          />
        )}
      </div>

      {!isMobile && <DescriptionCard />}
      {!isMobile && <SummaryProvince data={summation} />}

      <MapContainer
        doubleClickZoom={false}
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={true}
        style={{ height: "60vh", zIndex: 0 }}
        zoom={8}
        center={[-6.7988, 107.525]}
        className={`${!isMobile && "rounded-lg"}`}
      >
        {commodity && (
          <GeoJSON
            onEachFeature={onEachFeature}
            style={{
              fillOpacity: 1,
              weight: 0.9,
              color: "black",
            }}
            data={dataMap?.features}
          />
        )}
        <ZoomControl position="bottomleft" />
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

const option = (imgPath, title) => {
  return (
    <div className="grid grid-flow-col auto-cols-max gap-1">
      <img src={imgPath} style={{ width: 30, height: 30 }} alt="" />
      <p className="leading-7 w-full capitalize">{title}</p>
    </div>
  );
};

const options = () => {
  let cache = { ...comodityList };
  let data = [];

  Object.keys(cache).map((key) => {
    const imgPath = commodityPublicIconPath.find(
      (item) => item.key.toString() === key
    ).path;
    const commodityTitle = strategicCommodityList.find(
      (commodityEl) => commodityEl.key.toString() === key.toString()
    ).commodityTitle;
    data.push({
      value: key,
      label: option(imgPath, commodityTitle),
    });
  });
  return data;
};

const selectStyles = {
  container: (provided) => ({
    ...provided,
    width: 300,
  }),
};

export default JabarMap;
