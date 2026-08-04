import { getUserByEmail } from "@/server/repository/mongo/user_mongo";
import { getGroupByID } from "@/server/repository/mongo/group_mongo";
import { getRoleByID } from "@/server/repository/mongo/role_mongo";
import { decrypt } from "@/server/pkg/crypto";
import { signJwt } from "@/server/pkg/tokenize";
import { BASE_URL } from "@/server/utils/_env";

export const checkUserCredential = async ({
  req: reqHandler,
  res: resHandler,
  email,
  password,
}) => {
  const { err, res } = await getUserByEmail({ email });
  if (err) return { err: err.message };
  if (!res) return { err: "Email not exist" };

  const encryptedPass = await decrypt(res.password);

  const { res: resGroup } = await getGroupByID({ _id: res.group_id });
  const { res: resRole } = await getRoleByID({ _id: res.role_id });

  if (encryptedPass !== password) {
    return { err: "password not match" };
  }

  const token = await signJwt({
    user: { _id: res._id, email: res.email },
    origin: BASE_URL,
    reqHandler,
  });

  return {
    err: null,
    res: {
      token,
      user: {
        _id: res._id,
        name: res.name,
        email: res.email,
        group: resGroup,
        role: resRole,
        verified: res.verified,
      },
    },
  };

  try {
  } catch (error) {
    return { err: error.message };
  }
};
