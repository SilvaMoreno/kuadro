import { ResponseVerifyToken } from "../utils/type";
import { axiosClient } from "./axios";

const authApi = {
  signIn: (email: string, password: string) =>
    axiosClient.post(`/sessions`, { email, password }),
  signUp: (name: string, email: string, password: string) =>
    axiosClient.post(`/users`, { name, email, password }),
  verifyToken: () => axiosClient.post<ResponseVerifyToken>(`/sessions/verify`),
};

export { authApi };
