import { Request, Response } from "express";
import Board from "../models/board";
import Section from "../models/section";
import Task from "../models/task";

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

export const one = async (req: Request, res: Response) => {
  try {
    const board = await Board.findById(req.params.boardId);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const sections = await Section.find({ board: board.id });

    for (const section of sections) {
      const tasks = await Task.find({ section: section.id })
        .populate("section")
        .sort("-position");
      section.tasks = tasks;
    }

    board.sections = sections;

    return res.status(200).json(board);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const { title, description, favorite, icon } = req.body;

    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    let favoritePosition = 0;

    if (favorite !== undefined && board.favorite !== favorite) {
      const favorites = await Board.find({
        user: board.user,
        favorite: true,
        _id: { $ne: boardId },
      }).sort("favoritePosition");

      if (favorite) {
        const favoritesCount = favorites.length;
        favoritePosition = favoritesCount > 0 ? favoritesCount : 0;
      } else {
        for (const index in favorites) {
          const favorite = favorites[index];
          await Board.findByIdAndUpdate(favorite.id, {
            $set: {
              favoritePosition: index,
            },
          });
        }
      }
    }

    const newBoard = await Board.findByIdAndUpdate(boardId, {
      $set: {
        title,
        description,
        favorite: !!favorite,
        favoritePosition,
        icon,
      },
    });

    return res.status(200).json(newBoard);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const favorites = await Board.find({
      user: req.user.id,
      favorite: true,
    }).sort("-favoritePosition");

    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateFavoritesPosition = async (req: Request, res: Response) => {
  try {
    const { boards } = req.body;

    for (const key in boards.reverse()) {
      const board = boards[key];

      await Board.findByIdAndUpdate(board.id, {
        $set: {
          favoritePosition: key,
        },
      });
    }
    return res.status(200).json({});
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const remove = async (req: Request, res: Response) => {
  const { boardId } = req.params;

  try {
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const sections = await Section.find({ board: board.id });

    for (const section of sections) {
      await Task.deleteMany({ section: section.id });
    }

    await Section.deleteMany({ board: board.id });

    if (board.favorite) {
      const favorites = await Board.find({
        user: board.user,
        favorite: true,
        _id: { $ne: boardId },
      }).sort("-favoritePosition");

      for (const index in favorites) {
        const favorite = favorites[index];
        await Board.findByIdAndUpdate(favorite.id, {
          $set: {
            favoritePosition: index,
          },
        });
      }
    }

    await Board.deleteOne({ _id: boardId });

    const boards = await Board.find({ user: req.user.id }).sort("position");
    for (const key in boards) {
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
