import { Router } from "express";
import { sessionRoutes } from "./session";
import { userRoutes } from "./users";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("Welcome to Kuadro API!");
});

routes.use("/users", userRoutes);
routes.use("/sessions", sessionRoutes);

export = routes;
