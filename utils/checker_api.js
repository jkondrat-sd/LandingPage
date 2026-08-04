import axios from "@/pkg/axios";

export const checkToken = async (req) => {
  try {
    const { data } = await axios.get("/api/auth/check_token", {
      headers: {
        Cookie: req.headers.cookie,
      },
    });
    return data;
  } catch (error) {
    console.log("? : ", error.message);
    return { data: null };
  }
};
