declare namespace Express {
  export interface Request {
    user: {
      username: string;
      password: string;
      createdAt: Date;
      updatedAt: Date;
      id: string;
    };
  }
}
