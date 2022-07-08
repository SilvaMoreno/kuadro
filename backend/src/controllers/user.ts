import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: passwordHash });
    const token = jwt.sign({ id: user.id }, String(process.env.JWT_SECRET), {
      expiresIn: "1d",
    });

    res.status(201).json({
      user: {
        username: user.username,
        id: user.id,
      },
      token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("password username");

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, String(process.env.JWT_SECRET), {
      expiresIn: "1d",
    });

    return res.status(200).json({
      user: {
        username: user.username,
        id: user.id,
      },
      token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
