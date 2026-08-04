import React from "react";
import ReactDOMServer from "react-dom/server";
import { Box, Paper, Typography } from "@mui/material";
import { MapContainer, GeoJSON, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const L = require("leaflet");

import dataMap from "@/utils/constant/jabarByKab.json";

// CustomHooks
import useMediaQuery from "@/hooks/useMediaQuery";
import { DATA_MAP } from "@/utils/constant";
import { convertKeyToLabel } from "@/utils/common";
import { useRouter } from "next/router";

const Maps = ({ mapData, url, queryParams = {} }) => {
  const router = useRouter();
  const { isMobile } = useMediaQuery();

  const onMapRegionClicked = (IdKab) => {
    router.push({
      pathname: url,
      query: { ...queryParams, kode_kabupaten: IdKab },
    });
  };

  const setColor = (kode_kabupaten_atau_kota) => {
    const selected = mapData?.find(
      (area) => area.kode_kabupaten_atau_kota == kode_kabupaten_atau_kota
    );
    return selected?.status === "Aman" ||
      selected?.status === 3 ||
      selected?.status_number === 3 ||
      selected?.status_name === "Aman"
      ? "#E6F6EC"
      : selected?.status === "Waspada" ||
        selected?.status === 2 ||
        selected?.status_number === 2 ||
        selected?.status_name === "Waspada"
      ? "#FFF9E1"
      : selected?.status === "Rentan" ||
        selected?.status === 1 ||
        selected?.status_number === 1 ||
        selected?.status_name === "Rentan"
      ? "#FFEBEE"
      : "#FFFFFF";
  };

  const setHoverColor = (kode_kabupaten_atau_kota) => {
    const selected = mapData?.find(
      (area) => area.kode_kabupaten_atau_kota == kode_kabupaten_atau_kota
    );
    return selected?.status === "Aman" ||
      selected?.status === 3 ||
      selected?.status_number === 3  ||
      selected?.status_name === "Aman"
      ? "#16A75C"
      : selected?.status === "Waspada" ||
        selected?.status === 2 ||
        selected?.status_number === 2 ||
        selected?.status_name === "Waspada"
      ? "#FFA600"
      : selected?.status === "Rentan" ||
        selected?.status === 1 ||
        selected?.status_number === 1 ||
        selected?.status_name === "Rentan"
      ? "#F44336"
      : "#FFFFFF";
  };

  const setData = (kode_kabupaten_atau_kota) => {
    const selected = mapData?.find(
      (area) => area.kode_kabupaten_atau_kota == kode_kabupaten_atau_kota
    );
    return selected;
  };

  const onMouseOver = (area) => {
    area.options.fillColor = setHoverColor(area?.feature?.properties?.ID_KAB);
    area.setStyle({
      fillOpacity: 0.8,
      weight: 0.9,
      color: "#16A75C",
    });
  };

  const onMouseLeave = (area) => {
    area.options.fillColor = setColor(area?.feature?.properties?.ID_KAB);
    area.setStyle({
      fillOpacity: 1,
      weight: 0.9,
      color: "#16A75C",
    });
  };

  const onEachFeature = (feature, layer) => {
    const id = feature.properties.ID_KAB;
    const options = {
      sticky: true,
    };
    layer.options.fillColor = setColor(id);

    const dataMapPerDistrict = setData(id) || {};

    layer.on({
      mouseover: (event) => onMouseOver(event.target),
      mouseout: (event) => onMouseLeave(event.target),
      click: () => onMapRegionClicked(id),
    });
    layer.bindTooltip(dataMapPerDistrict["tooltip"], options);
  };

  const kotKabNameMarker = React.useMemo(() => {
    return DATA_MAP.map((item) => {
      const selected = mapData?.find(
        (area) => area.kode_kabupaten_atau_kota == item.id
      );
      return {
        name: L.divIcon({
          className: "  ",
          html: ReactDOMServer.renderToString(
            <div
              style={{
                fontSize: "7px",
                fontFamily: "Inter",
                color: "#0A0A0A",
                width: "30px",
                textAlign: "center",
                textTransform: "capitalize",
                pointerEvents: "none",
                marginLeft: "-10px",
                marginTop: "-5px",
              }}
            >
              {convertKeyToLabel(selected?.nama_kabupaten_kota)}
            </div>
          ),
        }),
        latLng: item.latLng,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className="relative">
      <MapContainer
        doubleClickZoom={false}
        scrollWheelZoom={false}
        zoomControl={isMobile ? true : false}
        dragging={true}
        style={{
          zIndex: 0,
          minHeight: isMobile ? "300px" : "500px",
          background:
            "radial-gradient(50% 50.00% at 50% 50.00%, #B7DEC4 0%, #D9F4E3 100%)",
        }}
        zoom={isMobile ? 7 : 8}
        center={[-6.8988, 107.525]}
        className={`${!isMobile && "rounded-lg"} mt-5`}
      >
        {mapData && (
          <GeoJSON
            onEachFeature={onEachFeature}
            style={{
              fillOpacity: 1,
              weight: 0.9,
              color: "#16A75C",
            }}
            data={dataMap?.features}
          />
        )}
        {kotKabNameMarker &&
          kotKabNameMarker.map((item, index) => (
            <Marker
              interactive={false}
              key={index}
              position={item.latLng}
              icon={item.name}
            />
          ))}
        {/* {DATA_MAP.map((item) => <PopupMarker key={item.id} item={item} mapData={mapData} onMapRegionClicked={onMapRegionClicked} />)} */}
        {/* <ZoomControl position="bottomleft" /> */}
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url=""
        />
      </MapContainer>
      <Paper className="p-3 absolute top-2 left-2">
        <Typography fontFamily="Lato">
          Klik pada peta untuk melihat detail kabupaten/kota
        </Typography>
      </Paper>
    </Box>
  );
};

export default Maps;
