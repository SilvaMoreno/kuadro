import { Router } from "express";
import * as boardController from "../controllers/board";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const boardRoutes = Router();

boardRoutes.post("/", ensureAuthenticated, boardController.create);
boardRoutes.get("/", ensureAuthenticated, boardController.all);
boardRoutes.put("/", ensureAuthenticated, boardController.updatePosition);

export { boardRoutes };
