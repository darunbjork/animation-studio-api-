import { Schema, model } from "mongoose";

const AssetSchema = new Schema(
  {
    studioId: {
      type: Schema.Types.ObjectId,
      ref: "Studio",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["CHARACTER", "PROP", "ENVIRONMENT"],
      required: true,
    },
    metadata: {
      polyCount: Number,
      format: String,
      previewUrl: String,
    },
    file: {
      path: String,
      size: Number,
      mimeType: String,
    },
    currentVersion: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const AssetModel = model("Asset", AssetSchema);
