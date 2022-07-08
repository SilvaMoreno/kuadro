import { Router } from "express";
import { userRoutes } from "./users";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("Welcome to Kuadro API!");
});

routes.use("/users", userRoutes);

export = routes;
