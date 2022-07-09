import { body } from "express-validator";
import User from "../models/user";

const createUserValidator = [
  body("name")
    .isLength({ max: 20 })
    .withMessage(
      "Name must be less than 20 characters long and must not be empty"
    ),
  body("username")
    .isLength({ min: 4, max: 20 })
    .withMessage(
      "Username must be between 4 and 20 characters and contain only letters and numbers"
    ),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters"),
  body("confirmPassword")
    .isLength({ min: 4 })
    .withMessage("Confirm Password must be at least 4 characters"),
  body("username").custom((value: string) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("Username already used");
      }
    });
  }),
];

export { createUserValidator };
