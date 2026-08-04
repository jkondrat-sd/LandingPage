import fs from "fs";
// const jabarByKec = require("@/utils/constant/jabarByKec");

const Main = async (targetFilter) => {
  try {
    const rawData = await fs.readFileSync("jabarByKec.json");
    const dataParsed = JSON.parse(rawData);
    const features = dataParsed.features;

    const bucket = [];

    targetFilter.map((e) => {
      const findData = features.find(
        (ej) =>
          ej.properties.KABKOT.toLowerCase() === e.kab_kot.toLowerCase() &&
          ej.properties.KECAMATAN.toLowerCase() === e.kecamatan.toLowerCase()
      );

      if (!findData) {
        console.log("wrong kecamatan or kota kabupaten: ", e);
      }

      bucket.push(findData);
    });

    return bucket;
  } catch (error) {
    throw { message: error.message };
  }
};

export default Main;
