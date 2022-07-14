import { param } from "express-validator";

const validateGetBoardIbId = [
  param("boardId", "Board id is required").isMongoId(),
];

const validateUpdateBoard = [
  param("boardId", "Board id is required").isMongoId(),
];

export { validateGetBoardIbId, validateUpdateBoard };
