import { Document, model, Schema, Types } from "mongoose";
import { schemaOptions } from "../utils/modelOptions";

interface IBoard extends Document {
  user: Types.ObjectId;
  icon: string;
  title: string;
  description: string;
  position?: number;
  favorite?: boolean;
  favoritePosition?: number;
  sections: any;
}

const boardSchema = new Schema<IBoard>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: {
      type: String,
      default: "📃",
    },
    title: {
      type: String,
      default: "Untitled",
    },
    description: {
      type: String,
      default: `Add description here
      🟢 You can add multiple lines of text here.
      🟠 Let's start ...`,
    },
    position: {
      type: Number,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    favoritePosition: {
      type: Number,
      default: 0,
    },
  },
  schemaOptions
);

export = model<IBoard>("Board", boardSchema);
