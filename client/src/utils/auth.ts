import { authApi } from "../api/authApi";
import { ResponseVerifyToken } from "./type";

const isAuthenticated = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const response = await authApi.verifyToken();
    return response.data.user;
  } catch (error) {
    return false;
  }
};

export const authUtils = {
  isAuthenticated,
};
