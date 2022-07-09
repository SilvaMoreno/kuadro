import mongoose from "mongoose";
import { schemaOptions } from "../utils/modelOptions";

const sectionSchema = new mongoose.Schema(
  {
    boards: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  schemaOptions
);

export = mongoose.model("Section", sectionSchema);
