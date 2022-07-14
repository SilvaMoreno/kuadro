import { body, param } from "express-validator";

const validateCreateSection = [
  param("boardId", "Board id is required").isMongoId(),
];

const validateUpdateSection = [
  param("boardId", "Board id is required").isMongoId(),
  body("title").withMessage("Title is required"),
];

const validateDeleteSection = [
  param("sectionId", "Section id is required").isMongoId(),
];

export { validateCreateSection, validateUpdateSection, validateDeleteSection };
