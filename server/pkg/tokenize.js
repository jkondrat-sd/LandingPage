import * as jwt from "jsonwebtoken";
import * as env from "@/server/utils/_env";

const algorithm = "ES256";
const key = env.TOKEN_KEY;
const baseUrl = env.BASE_URL;

const signJwt = async ({ user, origin, req }) => {
  try {
    const token = await jwt.sign({ user, origin }, key, { expiresIn: "720h" });
    console.log("token : ", token);

    return token;
  } catch (error) {
    console.error("signJwt : ", error.message);
    return null;
  }
};

const verifyJwt = async (token) => {
  try {
    const verify = await jwt.verify(token, key);
    return { verified: true, data: verify };
  } catch (error) {
    return { verified: false, err: error.message };
  }
};

export { signJwt, verifyJwt };
