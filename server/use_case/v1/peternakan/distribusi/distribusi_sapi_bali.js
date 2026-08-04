import { getAllBaliCattle as getAll } from "@/server/repository/mongo/peternakan/distribusi/bali_cattle_mongo";
import _ from "lodash";

export const getAllBaliCattle = async () => {
  try {
    const res = await getAll();

    const cleanedRes = res?.map((e) => {
      return {
        ...e,
        kordinat_asal: e?.kordinat_asal?.split(", "),
        kordinat_destinasi: e?.kordinat_destinasi?.split(", "),
      };
    });

    return {
      list: cleanedRes,
      meta: {},
    };
  } catch (error) {
    throw { message: error.message };
  }
};
