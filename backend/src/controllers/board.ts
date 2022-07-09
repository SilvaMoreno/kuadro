import { Request, Response } from "express";
import Board from "../models/board";

export const create = async (req: Request, res: Response) => {
  try {
    const boardCount = await Board.find().count();
    const board = await Board.create({
      user: req.user.id,
      position: boardCount,
    });

    return res.status(201).json(board);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const all = async (req: Request, res: Response) => {
  try {
    const boards = await Board.find({ user: req.user.id }).sort("-position");
    return res.status(200).json(boards);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updatePosition = async (req: Request, res: Response) => {
  try {
    const { boards } = req.body;

    for (const key in boards.reverse()) {
      const board = boards[key];

      await Board.findByIdAndUpdate(board.id, {
        $set: {
          position: key,
        },
      });
    }

    return res.status(200).json({});
  } catch (error) {
    return res.status(500).send(error);
  }
};
