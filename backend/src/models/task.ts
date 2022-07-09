import mongoose from "mongoose";
import { schemaOptions } from "../utils/modelOptions";

const taskSchema = new mongoose.Schema(
  {
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    position: {
      type: Number,
    },
  },
  schemaOptions
);

export = mongoose.model("Task", taskSchema);
