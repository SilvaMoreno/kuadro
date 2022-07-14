import { Document, model, Schema, Types } from "mongoose";
import { schemaOptions } from "../utils/modelOptions";

interface ISection extends Document {
  board: Types.ObjectId;
  title: string;
  tasks: any;
}

const sectionSchema = new Schema<ISection>(
  {
    board: {
      type: Schema.Types.ObjectId,
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

export = model<ISection>("Section", sectionSchema);
