import { redis } from "../../infra/queue/redis";
import { AssetRepository } from "../repositories/AssetRepository";

export class AssetCacheService {
  static async getAsset(assetId: string, studioId: string) {
    const key = `asset:${studioId}:${assetId}`;

    const cached = await redis.get(key);
    if (cached) {
      return JSON.parse(cached);
    }

    const asset = await AssetRepository.findOneByIdAndStudio(
      assetId,
      studioId
    );

    if (asset) {
      await redis.set(key, JSON.stringify(asset), "EX", 60); // Cache for 60 seconds
    }

    return asset;
  }
}
