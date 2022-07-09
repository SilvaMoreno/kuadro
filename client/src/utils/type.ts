export type User = {
  id: string;
  name: string;
  username: string;
};

export type ResponseVerifyToken = {
  user: User;
};

export type ResponseUser = {
  user: User;
  token: string;
};
