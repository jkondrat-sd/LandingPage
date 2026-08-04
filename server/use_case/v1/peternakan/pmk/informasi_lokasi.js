import { getAllFeedLotter } from "@/server/repository/mongo/peternakan/feedlotter_mongo";
import { getAllBreedersAndDevelopers } from "@/server/repository/mongo/peternakan/breeders_and_developers_mongo";
import { getAllCattleMarkets } from "@/server/repository/mongo/peternakan/cattle_markets_usecase";
import { getAllRPH_TPH } from "@/server/repository/mongo/peternakan/RPH_TPH_mongo";
import _ from "lodash";

export const getInformasiLokasi = async (query) => {
  try {
    let dataReturn = {};

    if (query[query.length - 1] === "") query.pop();

    await Promise.all(
      query.map(async (element) => {
        switch (element) {
          case "feedlotter":
            const resFeedLotter = await getAllFeedLotter({ tahun: 2022 });
            let fl = {
              list: resFeedLotter,
              meta: {},
            };
            dataReturn.feedlotter = fl;
            break;
          case "perbibitan_dan_pengembangan":
            const resPerbibitan = await getAllBreedersAndDevelopers();
            let pdp = {
              list: resPerbibitan,
              meta: {},
            };
            dataReturn.perbibitan_dan_pengembangan = pdp;
            break;
          case "pasar_ternak":
            const resCattleMarket = await getAllCattleMarkets();
            let pt = {
              list: resCattleMarket,
              meta: {},
            };
            dataReturn.pasar_ternak = pt;
            break;
          case "RPH_TPH":
            const resRPH_TPH = await getAllRPH_TPH();
            let RTH = {
              list: resRPH_TPH,
              meta: {},
            };
            dataReturn.RPH_TPH = RTH;
            break;
          default:
            throw {
              message: `cannot return ${element}, please give correct return request data.`,
            };
            break;
        }
      })
    );

    return dataReturn;
  } catch (error) {
    throw { message: error.message };
  }
};
