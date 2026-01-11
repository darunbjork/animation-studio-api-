import { AssetRepository } from "../repositories/AssetRepository";
import { ValidationError } from "../../shared/errors/ValidationError";
import { AuthorizationError } from "../../shared/errors/AuthorizationError";
import { PermissionService } from "./PermissionService";
import { AssetListService } from "./AssetListService";
import { AssetCacheService } from "./AssetCacheService"; // Import AssetCacheService

export class AssetService {
  static async createAsset(data: any) {
    if (!data.name) {
      throw new ValidationError("Asset name is required");
    }

    const asset = await AssetRepository.create(data);

    // Invalidate asset list cache after creation
    await AssetListService.invalidateListCache(asset.studioId.toString());

    return asset;
  }

  static async listAssets(studioId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    return AssetRepository.findByStudio(studioId, { skip, limit });
  }

  static async getAsset(assetId: string, studioId: string) {
    const asset = await AssetRepository.findOneByIdAndStudio(
      assetId,
      studioId
    );

    if (!asset) {
      throw new ValidationError("Asset not found");
    }

    return asset;
  }

  static async updateAsset(assetId: string, studioId: string, data: any) {
    const asset = await AssetRepository.update(assetId, studioId, data);

    if (!asset) {
      throw new ValidationError("Asset not found");
    }

    // Invalidate specific asset cache and asset list cache after update
    await AssetCacheService.invalidateAssetCache(assetId, studioId);
    await AssetListService.invalidateListCache(studioId);

    return asset;
  }

  static async deleteAsset(assetId: string, studioId: string, userRole: string) {
    if (!PermissionService.canDelete(userRole as any)) { // Cast to Role for now, will fix with proper type later
      throw new AuthorizationError("You do not have permission to delete assets.");
    }

    const asset = await AssetRepository.delete(assetId, studioId);

    if (!asset) {
      throw new ValidationError("Asset not found");
    }

    // Invalidate specific asset cache and asset list cache after deletion
    await AssetCacheService.invalidateAssetCache(assetId, studioId);
    await AssetListService.invalidateListCache(studioId);
  }

  static async rollbackAsset(
    assetId: string,
    studioId: string,
    version: number
  ) {
    const asset = await AssetRepository.findOneByIdAndStudio(
      assetId,
      studioId
    );

    if (!asset) {
      throw new ValidationError("Asset not found");
    }

    asset.currentVersion = version;
    await asset.save();
  }
}
