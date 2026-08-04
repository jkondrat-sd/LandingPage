import { findOne } from "@/server/repository/mongo/_base_mongo";

export const getGroupByID = async ({ _id }) => {
  try {
    const { err, res } = await findOne("groups", { _id });
    if (err) return { err: "error when find Group" };

    return { err: null, res };
  } catch (error) {
    console.error(
      "repository/mongo/group_mongo.js - getGroupByID : ",
      error.message
    );
    return { err: error.message };
  }
};

export const getGroupByEnum = async ({ enumProp }) => {
  try {
    const res = await findOne("groups", { group_enum: enumProp });
    return { err: null, res };
    if (resFindGroup.err) return { err: "error when find group" };
  } catch (error) {
    console.error("group mongo : ", error.message)
    return { err: "error when find group" };
  }
};
