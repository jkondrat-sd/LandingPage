import { findAll } from "@/server/repository/mongo/_base_mongo";

export const getAllCattleMarkets = async () => {
  try {
    const res = await findAll("cattle_markets", {});

    return res;
  } catch (error) {
    throw { message: error.message };
  }
};
