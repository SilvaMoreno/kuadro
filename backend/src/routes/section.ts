import { Router } from "express";
import * as sectionController from "../controllers/section";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import {
  validateBody,
  validateCreateSection,
  validateDeleteSection,
  validateUpdateSection,
} from "../validators";

const sectionRoutes = Router();

sectionRoutes.post(
  "/",
  validateCreateSection,
  validateBody,
  ensureAuthenticated,
  sectionController.create
);
sectionRoutes.post(
  "/",
  validateUpdateSection,
  validateBody,
  ensureAuthenticated,
  sectionController.update
);
sectionRoutes.post(
  "/:sectionId",
  validateDeleteSection,
  validateBody,
  ensureAuthenticated,
  sectionController.deleteSection
);

export { sectionRoutes };
