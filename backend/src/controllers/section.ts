import { Request, Response } from "express";
import Section from "../models/section";
import Task from "../models/task";

export const create = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  try {
    const section = await Section.create({
      board: boardId,
    });
    return res.status(201).json(section);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const update = async (req: Request, res: Response) => {
  const { sectionId } = req.params;
  try {
    const section = await Section.findByIdAndUpdate(sectionId, {
      $set: {
        title: req.body.title ?? "Untitled",
      },
    });

    return res.status(200).json(section);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteSection = async (req: Request, res: Response) => {
  const { sectionId } = req.params;
  try {
    await Task.deleteMany({ section: sectionId });
    await Section.deleteOne({ _id: sectionId });
    return res.status(200).json({});
  } catch (error) {
    return res.status(500).send(error);
  }
};
