import { IBoard } from "../utils/type";
import { axiosClient } from "./axios";

interface IUpdateBody {
  title?: string;
  icon?: string;
  description?: string;
  favorite?: boolean;
}

const boardApi = {
  create: () => axiosClient.post<IBoard>(`/boards`),
  all: () => axiosClient.get<IBoard[]>(`/boards`),
  one: (id: string) => axiosClient.get<IBoard>(`/boards/${id}`),
  updatePosition: (boards: { boards: IBoard[] }) =>
    axiosClient.put(`/boards`, boards),
  update: (id: string, board: IUpdateBody) =>
    axiosClient.put(`/boards/${id}`, board),
};

export { boardApi };
