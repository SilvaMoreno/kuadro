import mongoose from "mongoose";

export const schemaOptions: mongoose.SchemaOptions = {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
  timestamps: true,
};
