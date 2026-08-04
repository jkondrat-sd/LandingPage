import { findAll } from "@/server/repository/mongo/_base_mongo";

export const getAllRPH_TPH = async (query = {}) => {
  try {
    const res = await findAll("RPH_TPH", query);

    return res;
  } catch (error) {
    throw { message: error.message };
  }
};
