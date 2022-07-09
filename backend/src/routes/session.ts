import { Router } from "express";
import * as userController from "../controllers/user";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { loginValidator, validateBody } from "../validators";

const sessionRoutes = Router();

sessionRoutes.post("/", ...loginValidator, validateBody, userController.login);

sessionRoutes.post("/verify", ensureAuthenticated, (req, res) => {
  res.status(200).json({
    user: {
      name: req.user.name,
      username: req.user.username,
      id: req.user.id,
    },
  });
});

export { sessionRoutes };
