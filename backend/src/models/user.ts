import mongoose from "mongoose";
import { schemaOptions } from "../utils/modelOptions";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  schemaOptions
);

export = mongoose.model("User", userSchema);
