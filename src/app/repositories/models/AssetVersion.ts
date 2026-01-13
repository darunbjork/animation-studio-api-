import { Schema, model } from 'mongoose';

const AssetVersionSchema = new Schema(
  {
    assetId: {
      type: Schema.Types.ObjectId,
      ref: 'Asset',
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    file: {
      path: String,
      size: Number,
      mimeType: String,
    },
    changeNote: {
      type: String,
    },
  },
  { timestamps: true }
);

AssetVersionSchema.index({ assetId: 1, version: 1 }, { unique: true });
AssetVersionSchema.index({ assetId: 1, version: -1 });

export const AssetVersionModel = model('AssetVersion', AssetVersionSchema);
