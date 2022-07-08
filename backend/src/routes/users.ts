import { Router } from "express";
import * as userController from "../controllers/user";

const userRoutes = Router();

userRoutes.post("/", userController.create);

export { userRoutes };
