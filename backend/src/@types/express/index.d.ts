declare namespace Express {
  export interface Request {
    user: {
      name: string;
      username: string;
      password: string;
      createdAt: Date;
      updatedAt: Date;
      id: string;
    };
  }
}
