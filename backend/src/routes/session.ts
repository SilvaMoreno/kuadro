import { Router } from "express";
import * as userController from "../controllers/user";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { validateBody, loginValidator } from "../validators";

const sessionRoutes = Router();

sessionRoutes.post("/", ...loginValidator, validateBody, userController.login);

sessionRoutes.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json({
    user: {
      username: req.user.username,
      id: req.user.id,
    },
  });
});

export { sessionRoutes };
