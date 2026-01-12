import { AssetRepository } from "../../app/repositories/AssetRepository";
import { AssetVersionRepository } from "../../app/repositories/AssetVersionRepository";
import { AssetPipelineModel } from "../../app/repositories/models/AssetPipeline";
import { AssetDependencyRepository } from "../../app/repositories/AssetDependencyRepository";

export const resolvers = {
  Query: {
    assets: async (_: any, __: any, ctx: any) => {
      // Assuming ctx.user will be populated by auth middleware and has studioId
      if (!ctx.user || !ctx.user.studioId) {
        throw new Error("Unauthorized: User or studio ID not found in context");
      }
      // findByStudio expects an options object, providing empty for now
      return AssetRepository.findByStudio(ctx.user.studioId, {});
    },

    asset: async (_: any, args: any, ctx: any) => {
      if (!ctx.user || !ctx.user.studioId) {
        throw new Error("Unauthorized: User or studio ID not found in context");
      }
      return AssetRepository.findOneByIdAndStudio(
        args.id,
        ctx.user.studioId
      );
    },
  },

  Asset: {
    versions: (asset: any) => {
      return AssetVersionRepository.findByAsset(asset.id);
    },

    pipeline: (asset: any) => {
      return AssetPipelineModel.findOne({
        assetId: asset.id,
        version: asset.currentVersion,
      });
    },

    dependencies: (asset: any) => {
      // The provided `findChildren` in the lesson plan expects parentVersion
      // Asset type in typeDefs.ts doesn't have parentVersion directly
      // Assuming `currentVersion` of the asset is the `parentVersion` for its direct dependencies
      return AssetDependencyRepository.findChildren(
        asset.id,
        asset.currentVersion
      );
    },
  },
};
