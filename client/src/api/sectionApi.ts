import { ISection } from "../utils/type";
import { axiosClient } from "./axios";

interface IUpdateBody {
  title?: string;
}

const sectionApi = {
  create: (boardId: string) =>
    axiosClient.post<ISection>(`/boards/${boardId}/sections`),
  delete: (boardId: string, sectionId: string) =>
    axiosClient.delete(`/boards/${boardId}/sections/${sectionId}`),
  update: (boardId: string, sectionId: string, section: IUpdateBody) =>
    axiosClient.put(`/boards/${boardId}/sections/${sectionId}`, section),
};

export { sectionApi };
