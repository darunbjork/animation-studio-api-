import { AssetRepository } from "../repositories/AssetRepository";
import { ValidationError } from "../../shared/errors/ValidationError";

export class AssetService {
  static async createAsset(data: any) {
    if (!data.name) {
      throw new ValidationError("Asset name is required");
    }

    return AssetRepository.create(data);
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

    return asset;
  }

  static async deleteAsset(assetId: string, studioId: string) {
    const asset = await AssetRepository.delete(assetId, studioId);

    if (!asset) {
      throw new ValidationError("Asset not found");
    }
  }
}
