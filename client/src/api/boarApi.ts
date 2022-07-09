import { IBoard } from "../utils/type";
import { axiosClient } from "./axios";

const boardApi = {
  create: () => axiosClient.post<IBoard>(`/boards`),
  all: () => axiosClient.get<IBoard[]>(`/boards`),
};

export { boardApi };
