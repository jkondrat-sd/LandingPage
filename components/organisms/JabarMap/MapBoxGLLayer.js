import * as React from "react";
import Map, { Source, Layer } from "react-map-gl";
import dataMap from "@/utils/constant/jabarByKab.json";

const MpGl = () => {
  const [year, setYear] = React.useState(2015);
  const [allData, setAllData] = React.useState(null);
  const [hoverInfo, setHoverInfo] = React.useState(null);

  const onHover = React.useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];

    // prettier-ignore
    setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});
  }, []);

  const dataLayer = {
    id: "data",
    type: "fill",
    paint: {
      "fill-color": {
        property: "percentile",
        stops: [
          [0, "#3288bd"],
          [1, "#66c2a5"],
          [2, "#abdda4"],
          [3, "#e6f598"],
          [4, "#ffffbf"],
          [5, "#fee08b"],
          [6, "#fdae61"],
          [7, "#f46d43"],
          [8, "#d53e4f"],
        ],
      },
      "fill-opacity": 0.8,
    },
  };

  return (
    <Map
      initialViewState={{
        longitude: 107.525,
        latitude: -6.7988,
        zoom: 7,
      }}
      nteractiveLayerIds={["data"]}
      onMouseMove={onHover}
      style={{ width: "100%", minHeight: "450px" }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle="https://api.maptiler.com/maps/965e729a-f5d3-4d93-9b74-e82f93c6a578/style.json?key=P6JYMLUbVU7XrFycV19f  "
      attribution={`\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e \u003ca href=\"https://carto.com/\" target=\"_blank\"\u003e\u0026copy; CARTO\u003c/a\u003e`}
    >
      <Source type="geojson" data={dataMap}>
        <Layer {...dataLayer} />
      </Source>
      {hoverInfo && (
        <div
          className="tooltip"
          style={{ left: hoverInfo.x, top: hoverInfo.y }}
        >
          <div>State: {hoverInfo.feature.properties.name}</div>
          <div>
            Median Household Income: {hoverInfo.feature.properties.value}
          </div>
          <div>
            Percentile: {(hoverInfo.feature.properties.percentile / 8) * 100}
          </div>
        </div>
      )}
    </Map>
  );
};

export default MpGl;
