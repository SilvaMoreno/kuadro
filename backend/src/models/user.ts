import mongoose from "mongoose";
import { schemaOptions } from "../utils/modelOptions";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 8,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("User", userSchema);
