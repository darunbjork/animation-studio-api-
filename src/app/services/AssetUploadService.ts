import { LocalStorageProvider } from "../../infra/storage/LocalStorageProvider";
import { AssetRepository } from "../repositories/AssetRepository";
import { ValidationError } from "../../shared/errors/ValidationError";

const storage = new LocalStorageProvider();

export class AssetUploadService {
  static async uploadAsset(params: {
    studioId: string;
    userId: string;
    assetId: string;
    file: Express.Multer.File;
  }) {
    if (!params.file) {
      throw new ValidationError("File is required");
    }

    const asset = await AssetRepository.findOneByIdAndStudio(
      params.assetId,
      params.studioId
    );

    if (!asset) {
      throw new ValidationError("Asset not found");
    }

    const result = await storage.save(
      params.file,
      params.studioId
    );

    asset.file = {
      path: result.path,
      size: result.size,
      mimeType: params.file.mimetype,
    };

    await asset.save();

    return asset;
  }
}
