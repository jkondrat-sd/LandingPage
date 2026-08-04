import { findOne } from "@/server/repository/mongo/_base_mongo";

export const getGroupChildByID = async ({ _id }) => {
  try {
    const { err, res } = await findOne("group_childs", { _id });
    if (err) return { err: "error when find Group" };

    return { err: null, res };
  } catch (error) {
    console.error(
      "repository/mongo/group_mongo.js - getGroupChildByID : ",
      error.message
    );
    return { err: error.message };
  }
};

export const getGroupChildByEnum = async ({ enumProp }) => {
  try {
    const res = await findOne("group_childs", { group_child_enum: enumProp });
    return { err: null, res };
    if (resFindGroup.err) return { err: "error when find group child" };
  } catch (error) {
    console.error("group child mongo : ", error.message)
    return { err: "error when find group child" };
  }
};
