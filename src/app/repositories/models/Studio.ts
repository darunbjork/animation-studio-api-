import { Schema, model } from "mongoose";

const StudioSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const StudioModel = model("Studio", StudioSchema);
