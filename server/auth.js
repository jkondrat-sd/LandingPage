import { parse } from "cookie";

export const checkIsLoggedIn = (req) => {
  const cookie = parse(req.headers?.cookie || "");
  if (!cookie?.Authorization) {
    return false;
  } else {
    return true;
  }
};
