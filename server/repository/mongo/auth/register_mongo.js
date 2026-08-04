import {
  createIndexUsers,
  insertOne,
} from "@/server/repository/mongo/_base_mongo";

export const insertUser = async ({
  name,
  email,
  password,
  groupId,
  groupChildId,
  roleId,
}) => {
  try {
    await createIndexUsers();
    const { res, err } = await insertOne("users", {
      name,
      email,
      password: password,
      group_id: groupId,
      group_child_id: groupChildId,
      role_id: roleId,
      verified: true,
    });
    if (err) return { err: err, res: null };
    return { err: null, res };
  } catch (error) {
    console.error(
      "repository/mongo/auth/register_mongo.js - insertUser : ",
      error.message
    );
    return { err: error.message, resInsertUser: null };
  }
};
