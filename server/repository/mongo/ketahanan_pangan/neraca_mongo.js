import { findAll } from "@/server/repository/mongo/_base_mongo";

export const getAllNeraca = async () => {
  try {
    const res = await findAll("neraca", {});
    const res_meta = await findAll("neraca_meta", {});

    return { res, res_meta };
  } catch (error) {
    throw { message: error.message };
  }
};
