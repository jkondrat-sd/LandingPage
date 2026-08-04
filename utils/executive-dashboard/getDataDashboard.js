import { setCookies } from "cookies-next";
import { extendCookieMaxAge, userLogout } from "../auth";
import { axiosClient } from "../axios";

const getDashboardData = async ({ BASE_URL, url, last_page, params }) => {
  try {
    const data = await axiosClient(BASE_URL).get(url, {params});
    extendCookieMaxAge();
    return data;
  } catch (error) {
    if (error?.response?.status === 403) {
      console.log(error?.response?.status);
      return error?.response?.status;
    } else {
      console.log(error);
      setCookies("last_page", last_page);
      // userLogout({ BASE_URL_API_V2_CLIENT: BASE_URL, redirect: "/auth/login" });
    }
    return;
  }
};

export default getDashboardData;
