import { getAllFeedLotter as getAll } from "@/server/repository/mongo/peternakan/feedlotter_mongo";
import _ from "lodash";

export const getAllFeedLotter = async () => {
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
