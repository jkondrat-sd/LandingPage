import { getAllNeraca as getAll } from "@/server/repository/mongo/ketahanan_pangan/neraca_mongo";
import _ from "lodash";

export const getAllNeraca = async () => {
  try {
    const res = await getAll();

    const metaDate = res.res_meta.sort((a, b) => {
      return a.update_at < b.update_at ? -1 : a.update_at > b.update_at ? 1 : 0;
    });

    return {
      list: res.res,
      meta: metaDate[metaDate.length - 1],
    };
  } catch (error) {
    throw { message: error.message };
  }
};
