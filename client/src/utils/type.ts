export interface IUser {
  id: string;
  name: string;
  username: string;
}

export interface IBoard {
  id: string;
  user: string;
  icon: string;
  title: string;
  description: string;
  position: number;
  favorite: boolean;
  favoritePosition: number;
}

export type ResponseVerifyToken = {
  user: IUser;
};

export type ResponseUser = {
  user: IUser;
  token: string;
};
