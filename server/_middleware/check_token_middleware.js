import { errResBasic } from "@/server/utils/constants/error_response";
import { verifyJwt } from "@/server/pkg/tokenize";

import { getUserByID } from "@/server/repository/mongo/user_mongo";
import { getGroupByID } from "@/server/repository/mongo/group_mongo";
import { getRoleByID } from "@/server/repository/mongo/role_mongo";

const errorRes = (res) => {
  return res
    .status(401)
    .json({ ...errResBasic, message: "error verify token" });
};

const main = async (req, res, next) => {
  try {
    const { cookies } = req;
    const { verified, data } = await verifyJwt(cookies.token);

    const BASE_URL = process.env.BASE_URL;

    if (data.origin !== BASE_URL) {
      return errorRes(res);
    }

    if (verified) {
      const { err, res: resUser } = await getUserByID({ _id: data.user._id });

      const { res: resGroup } = await getGroupByID({ _id: resUser.group_id });
      const { res: resRole } = await getRoleByID({ _id: resUser.role_id });

      if (err) {
        return errorRes(res);
      }

      if (data.user.email !== resUser.email) {
        return errorRes(res);
      }

      res.pass = true;
      res.user = {
        _id: resUser._id,
        name: resUser.name,
        email: resUser.email,
        group: resGroup,
        role: resRole,
        verified: resUser.verified,
      };

      return next();
    }

    return errorRes(res);
  } catch (error) {
    return errorRes(res);
  }
};

export default main;
