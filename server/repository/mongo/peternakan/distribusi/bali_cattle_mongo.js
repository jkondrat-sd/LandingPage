import { findAll } from "@/server/repository/mongo/_base_mongo";

export const getAllBaliCattle = async (query = {}) => {
  try {
    const res = await findAll("bali_cattle_distribution", query);

    return res;
  } catch (error) {
    throw { message: error.message };
  }
};
