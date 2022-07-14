import { Router } from "express";
import * as boardController from "../controllers/board";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import {
  validateBody,
  validateGetBoardIbId,
  validateUpdateBoard,
} from "../validators";

const boardRoutes = Router();

boardRoutes.post("/", ensureAuthenticated, boardController.create);
boardRoutes.get("/", ensureAuthenticated, boardController.all);
boardRoutes.get(
  "/:boardId",
  validateGetBoardIbId,
  validateBody,
  ensureAuthenticated,
  boardController.one
);
boardRoutes.put("/", ensureAuthenticated, boardController.updatePosition);
boardRoutes.put(
  "/:boardId",
  validateUpdateBoard,
  validateBody,
  ensureAuthenticated,
  boardController.update
);

export { boardRoutes };
