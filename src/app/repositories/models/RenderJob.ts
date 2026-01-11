import { Schema, model } from "mongoose";

const RenderJobSchema = new Schema(
  {
    studioId: {
      type: Schema.Types.ObjectId,
      ref: "Studio",
      required: true,
    },
    assetId: {
      type: Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["QUEUED", "PROCESSING", "COMPLETED", "FAILED"],
      default: "QUEUED",
    },
    progress: {
      type: Number,
      default: 0,
    },
    error: String,
  },
  { timestamps: true }
);

export const RenderJobModel = model("RenderJob", RenderJobSchema);
