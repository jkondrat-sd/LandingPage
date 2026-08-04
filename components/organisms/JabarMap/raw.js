/* eslint-disable @next/next/no-img-element */
import React from "react";
import "../../../styles/Raw_map.module.css";
import {
  Map,
  MapContainer,
  GeoJSON,
  TileLayer,
  ZoomControl,
  Marker,
  Tooltip,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ReactDOMServer, { renderToStaticMarkup } from "react-dom/server";
import styled from "@emotion/styled";

import { iconTernak, DATA_MAP, livestockCommodityMap } from "@/utils/constant";

import dataMap from "@/utils/constant/jabarByKab.json";

import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// CustomHooks
import useMediaQuery from "@/hooks/useMediaQuery";

const Main = ({
  children,
  onEachFeature,
  regionName = true,
  animalMarker = false,
  showOtherRegion = true,
  animalData,
  byKecamatan = false,
  minHeight = "450px",
  minWidth = "100%",
  zoom = 8,
  maxZoom,
  center = [-6.7988, 107.525],
  disableZoom,
  customMarker1, // [{kordinat : y,x, markerIcon : url,tooltip : <>element</>}]
  customMarker2, // [{kordinat : y,x, markerIcon : url,tooltip : <>element</>}]
  customMarker3, // [{kordinat : y,x, markerIcon : url,tooltip : <>element</>}]
  customMarker4, // [{kordinat : y,x, markerIcon : url,tooltip : <>element</>}]
  customMarker5, // [{kordinat : y,x, markerIcon : url,tooltip : <>element</>}]
  customMarker6, // [{kordinat : y,x, markerIcon : url,tooltip : <>element</>}]
  customMarker7, // [{kordinat : y,x, markerIcon : url,tooltip : <>element</>}]
  customMarker8, // [{kordinat : y,x, markerIcon : url,tooltip : <>element</>}]
  customMarker9, // [{kordinat : y,x, markerIcon : url,tooltip : <>element</>}]
  customMarker10, // [{kordinat : y,x, markerIcon : url,tooltip : <>element</>}]
  flexIbleMarker = () => {},
  legendRightBottom = () => {},
  legendLeftBottom = () => {},
  extraGeoJsonData,
}) => {
  const kotKabNameMarker = React.useMemo(() => {
    return DATA_MAP.map((item) => {
      return {
        name: L.divIcon({
          className: "  ",
          html: ReactDOMServer.renderToString(
            <div
              style={{
                fontSize: 11,
                fontWeight: "normal",
                width: "100px",
                textTransform: "capitalize",
                pointerEvents: "none",
              }}
            >
              {item.nama.toLowerCase()}
            </div>
          ),
        }),
        latLng: item.latLng,
      };
    });
  }, []);

  const animalMarkerDisplay = () => {
    const res = livestockCommodityMap.map((item, index) => ({
      name: L.divIcon({
        className: "  ",
        html: ReactDOMServer.renderToString(
          <img
            key={index}
            alt={`${item}-icon`}
            src={iconTernak[item]}
            style={{ width: "25px", height: "25px" }}
          />
        ),
      }),
    }));

    let dataReturn = {};

    res.map(
      (item, index) => (dataReturn[livestockCommodityMap[index]] = res[index])
    );

    return dataReturn;
  };

  const { isMobile } = useMediaQuery();

  const geoJsonData = React.useMemo(
    (d) => {
      if (extraGeoJsonData?.length && dataMap?.features?.length) {
        return dataMap?.features?.concat(extraGeoJsonData);
      } else if (extraGeoJsonData?.length && !dataMap?.features?.length) {
        return extraGeoJsonData;
      } else if (!extraGeoJsonData?.length && dataMap?.features?.length) {
        return dataMap?.features;
      }
    },
    [extraGeoJsonData]
  );

  return (
    <>
      <MapContainer
        doubleClickZoom={false}
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={true}
        style={{
          zIndex: 0,
          minHeight: minHeight,
          background: !showOtherRegion ? "transparent" : "unset",
          minWidth: minWidth || "100%",
        }}
        zoom={zoom}
        maxZoom={maxZoom || 100}
        center={center}
        className={`${!isMobile && "rounded-lg"}`}
      >
        <GeoJSON
          onEachFeature={onEachFeature}
          style={{
            fillOpacity: 1,
            weight: 0.9,
            color: "black",
          }}
          data={geoJsonData}
        ></GeoJSON>
        {!disableZoom && <ZoomControl position="bottomleft" />}
        {!kotKabNameMarker && <LinearProgress color="success" />}
        {regionName &&
          kotKabNameMarker &&
          kotKabNameMarker.map((item, index) => (
            <Marker
              interactive={false}
              key={index}
              position={item.latLng}
              icon={item.name}
            />
          ))}

        {animalMarker &&
          animalData &&
          livestockCommodityMap.map((item, index) => {
            return (
              <MarkerCompTernak
                key={index}
                locations={animalData[item]?.lokasi}
                name={item}
                animalMarkerDisplay={animalMarkerDisplay}
              />
            );
          })}
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          // url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          url={
            showOtherRegion
              ? "https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              : ""
          }
          // url="https://api.maptiler.com/maps/965e729a-f5d3-4d93-9b74-e82f93c6a578/?key=P6JYMLUbVU7XrFycV19f#5.0/-8.17477/112.33327"
        />
        <Box
          sx={{
            position: "absolute",
            width: "fit-content",
            zIndex: 400,
            right: 0,
            margin: "10px",
            border: "2px solid gray",
            borderRadius: "15px",
            background: "white",
          }}
        >
          {children}
        </Box>
        <Box
          sx={{
            position: "absolute",
            width: "fit-content",
            zIndex: 400,
            right: 0,
            bottom: 5,
            margin: "10px",
            border: "2px solid gray",
            borderRadius: "15px",
            background: "white",
          }}
        >
          {legendRightBottom()}
        </Box>
        <Box
          sx={{
            position: "absolute",
            width: "fit-content",
            zIndex: 400,
            left: 10,
            bottom: 5,
            margin: "10px",
            border: "2px solid gray",
            borderRadius: "15px",
            background: "white",
          }}
        >
          {legendLeftBottom()}
        </Box>
        {customMarker1 &&
          customMarker1.length &&
          customMarker1.map((item, index) => {
            return (
              <Marker
                key={index}
                position={[
                  Number(item?.kordinat?.y),
                  Number(item?.kordinat?.x),
                ]}
                icon={L.divIcon({
                  className: "  ",
                  html: renderToStaticMarkup(
                    <img
                      alt="marker"
                      src={item.markerIcon}
                      style={{
                        height: item?.height || 15,
                        width: item?.width || 15,
                        ...item.style,
                      }}
                    ></img>
                  ),
                })}
              >
                <Tooltip className="lefleatTooltip">{item.tooltip()}</Tooltip>
              </Marker>
            );
          })}
        {customMarker2 &&
          customMarker2?.length &&
          customMarker2.map((item, index) => {
            return (
              <Marker
                key={index}
                position={[
                  Number(item?.kordinat?.y),
                  Number(item?.kordinat?.x),
                ]}
                icon={L.divIcon({
                  className: "  ",
                  html: renderToStaticMarkup(
                    <img
                      alt="marker"
                      src={item.markerIcon}
                      style={{
                        height: item?.height || 15,
                        width: item?.width || 15,
                        ...item.style,
                      }}
                    ></img>
                  ),
                })}
              >
                <Tooltip className="lefleatTooltip">{item.tooltip()}</Tooltip>
              </Marker>
            );
          })}
        {customMarker3 &&
          customMarker3?.length &&
          customMarker3.map((item, index) => {
            return (
              <Marker
                key={index}
                position={[
                  Number(item?.kordinat?.y),
                  Number(item?.kordinat?.x),
                ]}
                icon={L.divIcon({
                  className: "  ",
                  html: renderToStaticMarkup(
                    <img
                      alt="marker"
                      src={item.markerIcon}
                      style={{
                        height: item?.height || 15,
                        width: item?.width || 15,
                        ...item.style,
                      }}
                    ></img>
                  ),
                })}
              >
                <Tooltip className="lefleatTooltip">{item.tooltip()}</Tooltip>
              </Marker>
            );
          })}
        {customMarker4 &&
          customMarker4?.length &&
          customMarker4.map((item, index) => {
            return (
              <Marker
                key={index}
                position={[
                  Number(item?.kordinat?.y),
                  Number(item?.kordinat?.x),
                ]}
                icon={L.divIcon({
                  className: "  ",
                  html: renderToStaticMarkup(
                    <img
                      alt="marker"
                      src={item.markerIcon}
                      style={{
                        height: item?.height || 15,
                        width: item?.width || 15,
                        ...item.style,
                      }}
                    ></img>
                  ),
                })}
              >
                <Tooltip className="lefleatTooltip">{item.tooltip()}</Tooltip>
              </Marker>
            );
          })}
          {customMarker5 &&
          customMarker5?.length &&
          customMarker5.map((item, index) => {
            return (
              <Marker
                key={index}
                position={[
                  Number(item?.kordinat?.y),
                  Number(item?.kordinat?.x),
                ]}
                icon={L.divIcon({
                  className: "  ",
                  html: renderToStaticMarkup(
                    <img
                      alt="marker"
                      src={item.markerIcon}
                      style={{
                        height: item?.height || 15,
                        width: item?.width || 15,
                        ...item.style,
                      }}
                    ></img>
                  ),
                })}
              >
                <Tooltip className="lefleatTooltip">{item.tooltip()}</Tooltip>
              </Marker>
            );
          })}
        {flexIbleMarker()}
      </MapContainer>
    </>
  );
};

const MarkerCompTernak = ({ locations, name, animalMarkerDisplay }) => {
  return locations && locations.length && animalMarkerDisplay()[name]?.name ? (
    locations?.map((item, index) => {
      return (
        <Marker
          interactive={false}
          key={index}
          position={
            latLngTernakByKotKab(item.toUpperCase())?.latLngTernak[name] || [
              0, 0,
            ]
          }
          icon={animalMarkerDisplay()[name]?.name}
        />
      );
    })
  ) : (
    <></>
  );
};

const latLngTernakByKotKab = (city) => {
  const res = DATA_MAP.find((item) => item.nama === city.split("_").join(" "));
  return res;
};

export default Main;
