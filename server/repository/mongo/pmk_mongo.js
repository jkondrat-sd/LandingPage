import { findAll } from "@/server/repository/mongo/_base_mongo";

export const getAllPmk = async () => {
  try {
    const res = await findAll("sebaran_kasus_pmk", {});

    return res;
  } catch (error) {
    throw { message: error.message };
  }
};
