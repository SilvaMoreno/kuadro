export interface IUser {
  id: string;
  name: string;
  username: string;
}

export type ResponseVerifyToken = {
  user: IUser;
};

export type ResponseUser = {
  user: IUser;
  token: string;
};
