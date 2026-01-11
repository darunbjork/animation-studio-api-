import { AssetRepository } from "../repositories/AssetRepository";
import { AssetVersionRepository } from "../repositories/AssetVersionRepository";
import { LocalStorageProvider } from "../../infra/storage/LocalStorageProvider";
import { ValidationError } from "../../shared/errors/ValidationError";
import { AuthorizationError } from "../../shared/errors/AuthorizationError";
import { PermissionService } from "./PermissionService";
import { pipelineQueue } from "../../infra/queue/pipeline.queue";
import { AssetPipelineModel } from "../repositories/models/AssetPipeline";

const storage = new LocalStorageProvider();

export class AssetVersionService {
  static async uploadNewVersion(params: {
    assetId: string;
    studioId: string;
    userId: string;
    file: Express.Multer.File;
    changeNote?: string;
    userRole: string; // Add userRole parameter
  }) {
    if (!PermissionService.canUpload(params.userRole as any)) {
      throw new AuthorizationError("You do not have permission to upload new asset versions.");
    }

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

    const latest = await AssetVersionRepository.getLatestVersion(asset.id);

    const nextVersion = latest ? latest.version + 1 : 1;

    const result = await storage.save(
      params.file,
      `${params.studioId}/${asset.id}/v${nextVersion}`
    );

    const version = await AssetVersionRepository.create({
      assetId: asset.id,
      version: nextVersion,
      createdBy: params.userId,
      file: {
        path: result.path,
        size: result.size,
        mimeType: params.file.mimetype,
      },
      changeNote: params.changeNote,
    });

    asset.currentVersion = nextVersion;
    await asset.save();

    // Trigger the asset pipeline
    await AssetPipelineModel.create({
      assetId: asset.id,
      version: nextVersion,
    });

    await pipelineQueue.add({
      assetId: asset.id,
      version: nextVersion,
    });

    return version;
  }
}
