import { Router } from "express";
import { boardRoutes } from "./board";
import { sessionRoutes } from "./session";
import { userRoutes } from "./users";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("Welcome to Kuadro API!");
});

routes.use("/users", userRoutes);
routes.use("/sessions", sessionRoutes);
routes.use("/boards", boardRoutes);

export = routes;
