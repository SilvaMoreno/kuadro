import { IBoard } from "../utils/type";
import { axiosClient } from "./axios";

const boardApi = {
  create: () => axiosClient.post<IBoard>(`/boards`),
  all: () => axiosClient.get<IBoard[]>(`/boards`),
  updatePosition: (boards: { boards: IBoard[] }) =>
    axiosClient.put(`/boards`, boards),
};

export { boardApi };
