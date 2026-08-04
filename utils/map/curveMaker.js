import bearing from "@turf/bearing";
import lineArc from "@turf/line-arc";
import rhumbDistance from "@turf/rhumb-distance";
import midpoint from "@turf/midpoint";
import rhumbDestination from "@turf/rhumb-destination";
import destination from "@turf/destination";
import rhumbBearing from "@turf/rhumb-bearing";
import distance from "@turf/distance";
import bezierSpline from "@turf/bezier-spline";
import * as helpers from "@turf/helpers";

// export const coreLine = ({ firstPoint, lastPoint, data }) => {
//   var start = helpers.point([firstPoint[1], firstPoint[0]]);
//   var end = helpers.point([lastPoint[1], lastPoint[0]]);

//   const radius = rhumbDistance(start, end);
//   const theMidpoint = midpoint(start, end);
//   const theBearing = rhumbBearing(start, end) - 90;
//   const origin = rhumbDestination(theMidpoint, radius, theBearing);

//   let curved = lineArc(
//     origin,
//     distance(origin, start),
//     bearing(origin, end),
//     bearing(origin, start),
//     { steps: 128 }
//   );
//   curved.properties.isDistributions = true;
//   curved.properties.data = data;
//   return curved;
// };

// export default coreLine;

// export const coreLine = ({ firstPoint, lastPoint, data }) => {
//   const start = [parseFloat(firstPoint[1]), parseFloat(firstPoint[0])];
//   const end = [parseFloat(lastPoint[1]), parseFloat(lastPoint[0])];
//   const theDistance = distance(start, end);
//   const theMidpoint = midpoint(start, end);
//   const theBearing = bearing(start, end) - 89;
//   const theDestination = destination(theMidpoint, theDistance, theBearing);

//   const curvedLine = lineArc(
//     theDestination,
//     distance(theDestination, start),
//     bearing(theDestination, end),
//     bearing(theDestination, start),
//     { steps: 128 }
//   );
//   curvedLine.properties.isDistributions = true;
//   curvedLine.properties.data = data;
//   return curvedLine;
// };

// export default coreLine;

export const coreLine = ({ firstPoint, lastPoint, data }) => {
  const start = [parseFloat(firstPoint[1]), parseFloat(firstPoint[0])];
  const end = [parseFloat(lastPoint[1]), parseFloat(lastPoint[0])];

  const theDistance = distance(start, end, { units: "kilometers" });
  const theMidpoint = midpoint(start, end);
  const theDestination = destination(theMidpoint, theDistance / 5, 10, {
    units: "kilometers",
  });

  // curvedLine gets rendered to the page
  const curved = bezierSpline(
    helpers.lineString([start, theDestination.geometry.coordinates, end])
  );
  curved.properties.isDistributions = true;
  curved.properties.data = data;
  return curved;
};
export default coreLine;