import { Router } from "express";
import * as sectionController from "../controllers/section";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import {
  validateBody,
  validateCreateSection,
  validateDeleteSection,
  validateUpdateSection,
} from "../validators";

const sectionRoutes = Router({ mergeParams: true });

sectionRoutes.post(
  "/",
  validateCreateSection,
  validateBody,
  ensureAuthenticated,
  sectionController.create
);
sectionRoutes.put(
  "/:sectionId",
  validateUpdateSection,
  validateBody,
  ensureAuthenticated,
  sectionController.update
);
sectionRoutes.delete(
  "/:sectionId",
  validateDeleteSection,
  validateBody,
  ensureAuthenticated,
  sectionController.deleteSection
);

export { sectionRoutes };
