import { findAll } from "@/server/repository/mongo/_base_mongo";

export const getAllFeedLotter = async (query = {}) => {
  try {
    const res = await findAll("feedlotters", query);

    return res;
  } catch (error) {
    throw { message: error.message };
  }
};
