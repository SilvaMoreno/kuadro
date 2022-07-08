import { body } from "express-validator";

const loginValidator = [
  body("username")
    .isLength({ min: 4, max: 20 })
    .isAlphanumeric()
    .withMessage(
      "Username must be between 4 and 20 characters and contain only letters and numbers"
    ),
  body("password")
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
];

export { loginValidator };
