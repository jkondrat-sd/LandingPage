import { findOne } from "@/server/repository/mongo/_base_mongo";
import { ObjectId } from "mongodb";

export const getUserByID = async ({ _id }) => {
  try {
    const { err, res } = await findOne("users", { _id: new ObjectId(_id) });
    if (err) return { err: "error when find user" };

    return { err: null, res };
  } catch (error) {
    console.error(
      "repository/mongo/auth/user_mongo.js - getUserByID : ",
      error.message
    );
    return { err: error.message };
  }
};

export const getUserByEmail = async ({ email }) => {
  try {
    const { err, res } = await findOne("users", { email });
    if (err) return { err: "error when find user" };

    return { err: null, res };
  } catch (error) {
    console.error(
      "repository/mongo/auth/user_mongo.js - getUserByEmail : ",
      error.message
    );
    return { err: error.message };
  }
};
