import { Document, model, Schema, Types } from "mongoose";
import { schemaOptions } from "../utils/modelOptions";

interface ITask extends Document {
  section: Types.ObjectId;
  title: string;
  content: string;
  position: number;
}

const taskSchema = new Schema<ITask>(
  {
    section: {
      type: Schema.Types.ObjectId,
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

export = model<ITask>("Task", taskSchema);
