import axios from "axios"

const create = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const axiosSSRCookies = (req) => {
  return axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    Cookie: req.headers.cookie,
  });
}

export default create;
