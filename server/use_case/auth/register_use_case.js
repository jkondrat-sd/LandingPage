import { insertUser } from "@/server/repository/mongo/auth/register_mongo";

import { getUserByEmail } from "@/server/repository/mongo/user_mongo";
import {
  getGroupByID,
  getGroupByEnum,
} from "@/server/repository/mongo/group_mongo";
import {
  getRoleByID,
  getRoleByEnum,
} from "@/server/repository/mongo/role_mongo";
import { getGroupChildByEnum } from "@/server/repository/mongo/group_child_mongo";

import { encrypt } from "@/server/pkg/crypto";

export const register_use_case = async ({
  name,
  email,
  password,
  secret,
  group,
  group_child,
  role,
}) => {
  try {
    const { err: errFindGroup, res: resFindGroup } = await getGroupByEnum({
      enumProp: group,
    });
    if (errFindGroup) return { errFindGroup };

    const { err: errFindGroupChild, res: resFindGroupChild } =
      await getGroupChildByEnum({ enumProp: group_child });
    if (errFindGroupChild) return { errFindGroupChild };

    const { err: errFindRole, res: resFindRole } = await getRoleByEnum({
      enumProp: role,
    });
    if (errFindRole) return { errFindRole };

    const { err, res } = await insertUser({
      name,
      email,
      password: encrypt(password),
      groupId: resFindGroup.res._id,
      groupChildId: resFindGroupChild.res._id,
      roleId: resFindRole.res._id,
    });

    if (err) {
      if (err.includes("E11000")) {
        return { err: "email exist" };
      }
      return { err };
    }

    const { res: resUser } = await getUserByEmail({ email });

    return {
      err: null,
      res: {
        _id: resUser._id,
        name: resUser.name,
        email: resUser.email,
        group: resFindGroup.res,
        groupChild: resFindGroupChild.res,
        role: resFindRole.res,
        verified: resUser.verified,
      },
    };
  } catch (error) {
    console.error("use_case/auth/register_use_case.js - register_use_case : ");
    return { err: error.message, resInsertUser: null };
  }
};
