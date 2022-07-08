import { body } from "express-validator";
import User from "../models/user";

const createUserValidator = [
  body("username")
    .isLength({ min: 4, max: 20 })
    .withMessage("username must be at least 8 characters"),
  body("password")
    .isLength({ min: 4, max: 20 })
    .withMessage("password must be at least 8 characters"),
  body("confirmPassword")
    .isLength({ min: 4, max: 20 })
    .withMessage("confirmPassword must be at least 8 characters"),
  body("username").custom((value: string) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("username already used");
      }
    });
  }),
];

export { createUserValidator };
