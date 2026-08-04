import axios from "axios";
import { getCookie, removeCookies, setCookies } from "cookies-next";
import Router from "next/router";
import { axiosClient } from "./axios";
import { cookieMaxAge } from "./constant";

export const userLogin = async ({
  BASE_URL_API_V2_CLIENT,
  BASE_URL_API_V4_CLIENT,
  credentials,
  redirect,
  method = null,
}) => {
  let url = BASE_URL_API_V4_CLIENT + `/auth/login`;
  if (method === "smart_jabar") url = `${BASE_URL_API_V2_CLIENT}/auth/login?method=smart_jabar`;
  const last_page = getCookie("last_page");
  removeCookies("last_page");

  const data = await axios.post(url, { ...credentials });

  if (data?.data?.success) {
    setCookies("user", data?.data?.data?.user, {maxAge: cookieMaxAge});
    setCookies("Authorization", `Bearer ${data?.data?.data?.token}`, {maxAge: cookieMaxAge});
    Router.push(last_page || redirect);
  } else {
    console.log(data?.message);
  }
};

export const isLoggedIn = () => {
  const token = getCookie("Authorization");
  if (!token) {
    return false;
  } else {
    return true;
  }
};

export const userLogout = async (props) => {
  if (props?.BASE_URL_API_V2_CLIENT) {
    try {
      const data = await axiosClient(props.BASE_URL_API_V2_CLIENT).post("/auth/logout");
      if (data) {
        console.log("Logged Out");
      }
    } catch (error) {
      console.log(error?.response?.message);
    }
  }
  removeCookies("Authorization");
  removeCookies("user");
  if (props?.redirect) {
    Router.push(props?.redirect);
  }
};

export const getProfile = async (props) => {
  const token = getCookie("Authorization");
  if (props?.BASE_URL_API_V2_CLIENT && token ) {
    try {
      const data = await axiosClient(props?.BASE_URL_API_V2_CLIENT).get("/user");
      setCookies("user", data?.data?.data, {maxAge: cookieMaxAge});
      extendCookieMaxAge();
      return data?.data?.data
    } catch (error) {
      if (error?.response?.status === 403) {
        console.log(error?.response?.status);
        setCookies("last_page", props?.last_page);
        userLogout({BASE_URL_API_V2_CLIENT: props?.BASE_URL_API_V2_CLIENT});
      } else {
        console.log(error?.response?.message);
      }
      return;
    }
  }
};

export const extendCookieMaxAge = () => {
  const token = getCookie("Authorization");
  const user = getCookie("user");
  
  if (token) {
    setCookies("user", user, {maxAge: cookieMaxAge});
    setCookies("Authorization", token, {maxAge: cookieMaxAge});
  }
};