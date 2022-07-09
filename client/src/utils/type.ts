export type User = {
  id: string;
  name: string;
  username: string;
};

export type ResponseVerifyToken = {
  user: User;
};
