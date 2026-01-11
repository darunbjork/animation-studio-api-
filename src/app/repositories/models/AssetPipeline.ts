import { Schema, model } from "mongoose";

const AssetPipelineSchema = new Schema(
  {
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
      enum: [
        "UPLOADED",
        "VALIDATING",
        "PROCESSING_PREVIEW",
        "READY_FOR_RENDER",
        "RENDER_QUEUED",
        "FAILED",
      ],
      default: "UPLOADED",
    },
    error: String,
  },
  { timestamps: true }
);

AssetPipelineSchema.index({ assetId: 1, version: 1 }, { unique: true });

export const AssetPipelineModel = model(
  "AssetPipeline",
  AssetPipelineSchema
);
