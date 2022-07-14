import { Router } from "express";
import { boardRoutes } from "./board";
import { sectionRoutes } from "./section";
import { sessionRoutes } from "./session";
import { userRoutes } from "./users";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("Welcome to Kuadro API!");
});

routes.use("/users", userRoutes);
routes.use("/sessions", sessionRoutes);
routes.use("/boards", boardRoutes);
routes.use("/boards/:boardId/sections", sectionRoutes);

export = routes;
