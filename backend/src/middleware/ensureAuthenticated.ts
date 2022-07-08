import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

const getToken = (req: Request) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.split(" ")[1];
    return token;
  }
  return null;
};

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getToken(req);
  if (!token) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  try {
    const decoded: any = jwt.verify(token, String(process.env.JWT_SECRET));
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Not authenticated." });
    }
    req.user = user.toJSON();
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authenticated." });
  }
};
