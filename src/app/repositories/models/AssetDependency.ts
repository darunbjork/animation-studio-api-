import { Schema, model } from 'mongoose';

const AssetDependencySchema = new Schema(
  {
    parentAssetId: {
      type: Schema.Types.ObjectId,
      ref: 'Asset',
      required: true,
    },
    parentVersion: {
      type: Number,
      required: true,
    },
    childAssetId: {
      type: Schema.Types.ObjectId,
      ref: 'Asset',
      required: true,
    },
    childVersion: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['USES', 'DEPENDS_ON', 'GENERATED_FROM'],
      default: 'DEPENDS_ON',
    },
  },
  { timestamps: true }
);

AssetDependencySchema.index(
  { parentAssetId: 1, childAssetId: 1, childVersion: 1 },
  { unique: true }
);

export const AssetDependencyModel = model(
  'AssetDependency',
  AssetDependencySchema
);
