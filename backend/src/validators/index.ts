import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { validateGetBoardIbId, validateUpdateBoard } from "./board";
import { loginValidator } from "./session";
import { createUserValidator } from "./users";

export {
  validateCreateSection,
  validateDeleteSection,
  validateUpdateSection,
} from "./section";
export {
  validateBody,
  loginValidator,
  createUserValidator,
  validateGetBoardIbId,
  validateUpdateBoard,
};

const validateBody = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    errors: errors.array().map((error) => ({
      param: error.param,
      msg: error.msg,
    })),
  });
};
