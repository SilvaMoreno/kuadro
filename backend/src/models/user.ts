import mongoose from "mongoose";
import { schemaOptions } from "../utils/modelOptions";

interface IUser extends mongoose.Document {
  name: string;
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
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

export = mongoose.model<IUser>("User", userSchema);
