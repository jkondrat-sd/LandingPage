import Papa from "papaparse";
import fs from "fs";
import path from "path";

const file = "/public/neraca.csv";
const main = async () => {
  try {
    const dirRelativeToPublicFolder = "";

    const dir = path.resolve("./public", dirRelativeToPublicFolder);

    const content = await fs.readFileSync(dir + "/neraca.csv", "utf8");
    let rows;
    Papa.parse(content, {
      header: true,
      delimiter: ",",
      complete: function (results) {
        //console.log("Finished:", results.data);
        rows = results.data;
      },
    });

    return rows;
  } catch (error) {
    console.log("main Neraca error :  ", error.message);
    return error;
  }
};

const byFilter = async (query) => {
  try {
    console.log(query);
    return [];
  } catch (error) {
    console.log("byFilter Neraca error :  ", error.message);
    return error;
  }
};

export default main;
export { main, byFilter };
