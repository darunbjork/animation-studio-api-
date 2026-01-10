import { AssetRepository } from "../repositories/AssetRepository";
import { AppError } from "../../shared/errors/AppError";

export class AssetService {
  static async createAsset(data: {
    studioId: string;
    userId: string;
    name: string;
    type: string;
    metadata?: any;
  }) {
    if (!data.name) {
      throw new AppError("Asset name is required", 400);
    }

    return AssetRepository.create({
      studioId: data.studioId,
      createdBy: data.userId,
      name: data.name,
      type: data.type,
      metadata: data.metadata,
    });
  }

  static async listAssets(studioId: string) {
    return AssetRepository.findByStudio(studioId);
  }
}
