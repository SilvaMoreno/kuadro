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
  "/favorites",
  ensureAuthenticated,
  boardController.getFavorites
);
boardRoutes.put(
  "/favorites",
  ensureAuthenticated,
  boardController.updateFavoritesPosition
);
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
boardRoutes.delete("/:boardId", ensureAuthenticated, boardController.remove);

export { boardRoutes };
