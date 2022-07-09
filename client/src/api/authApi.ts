import { ResponseUser, ResponseVerifyToken } from "../utils/type";
import { axiosClient } from "./axios";

const authApi = {
  signIn: (username: string, password: string) =>
    axiosClient.post<ResponseUser>(`/sessions`, { username, password }),
  signUp: (
    name: string,
    username: string,
    password: string,
    confirmPassword: string
  ) =>
    axiosClient.post<ResponseUser>(`/users`, {
      name,
      username,
      password,
      confirmPassword,
    }),
  verifyToken: () => axiosClient.post<ResponseVerifyToken>(`/sessions/verify`),
};

export { authApi };
