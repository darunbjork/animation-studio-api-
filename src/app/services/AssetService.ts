import { AssetRepository } from "../repositories/AssetRepository";
import { ValidationError } from "../../shared/errors/ValidationError";

export class AssetService {
  static async createAsset(data: {
    studioId: string;
    userId: string;
    name: string;
    type: string;
    metadata?: any;
  }) {
    if (!data.name) {
      throw new ValidationError("Asset name is required");
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
