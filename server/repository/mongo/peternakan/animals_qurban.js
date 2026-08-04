import { findAll } from "@/server/repository/mongo/_base_mongo";

export const getAll = async () => {
  try {
    const res = await findAll("animals_qurban", {});

    return res;
  } catch (error) {
    throw { message: error.message };
  }
};
