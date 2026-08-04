import { getAllRPH_TPH as getAll } from "@/server/repository/mongo/peternakan/RPH_TPH_mongo";
import _ from "lodash";

export const getAllRPH_TPH = async () => {
  try {
    const res = await getAll();

    return {
      list: res,
      meta: {},
    };
  } catch (error) {
    throw { message: error.message };
  }
};
