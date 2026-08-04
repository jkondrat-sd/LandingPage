import { findOne } from "@/server/repository/mongo/_base_mongo";

export const getRoleByID = async ({ _id }) => {
  try {
    const { err, res } = await findOne("roles", { _id });
    if (err) return { err: "error when find role" };

    return { err: null, res };
  } catch (error) {
    console.error(
      "repository/mongo/role_mongo.js - getRoleByID : ",
      error.message
    );
    return { err: error.message };
  }
};

export const getRoleByEnum = async ({ enumProp }) => {
  try {
    const res = await findOne("roles", { role_enum: enumProp });
    return { err: null, res };
    if (resFindGroup.err) return { err: "error when find roles" };
  } catch (error) {
    console.error("role mongo : ", error.message)
    return { err: "error when find roles" };
  }
};
