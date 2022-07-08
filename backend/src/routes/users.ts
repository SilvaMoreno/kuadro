import { Router } from "express";
import * as userController from "../controllers/user";
import { createUserValidator, validateBody } from "../validators";

const userRoutes = Router();

userRoutes.post("/", createUserValidator, validateBody, userController.create);

export { userRoutes };
