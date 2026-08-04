import axios from "axios";
import { getCookie } from "cookies-next";

export const axiosClient = (BASE_URL) => {
  const token = getCookie("Authorization");
  return axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: token },
  });
};
