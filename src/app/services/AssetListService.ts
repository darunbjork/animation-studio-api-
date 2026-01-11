import { redis } from "../../infra/queue/redis";
import { AssetRepository } from "../repositories/AssetRepository";

export class AssetListService {
  static async listAssets(studioId: string, page = 1, limit = 20) {
    const key = `assets:list:${studioId}:${page}:${limit}`;

    const cached = await redis.get(key);
    if (cached) {
      return JSON.parse(cached);
    }

    const assets = await AssetRepository.findByStudio(studioId, { skip: (page - 1) * limit, limit });

    const result = {
      page,
      limit,
      data: assets,
    };

    await redis.set(
      key,
      JSON.stringify(result),
      "EX",
      30 // Cache for 30 seconds
    );

    return result;
  }

  // Method to invalidate asset list cache
  static async invalidateListCache(studioId: string) {
    // Invalidate all keys matching assets:list:{studioId}:*
    // This is a basic approach. For more complex scenarios, consider Redis SCAN or keys with specific patterns.
    // For now, we assume a limited number of pages/limits to invalidate, or rely on EX expiry.
    // A more robust solution might involve tagging keys or a dedicated cache invalidation service.

    const stream = redis.scanStream({
      match: `assets:list:${studioId}:*:*`,
      count: 100, // Number of keys to return per scan iteration
    });
    let pipeline = redis.pipeline();
    let keysFound = 0;

    stream.on("data", (keys) => {
      if (keys.length) {
        keys.forEach((key: string) => {
          pipeline.del(key);
        });
        keysFound += keys.length;
      }
    });

    return new Promise<void>((resolve, reject) => {
      stream.on("end", async () => {
        if (keysFound > 0) {
          await pipeline.exec().catch((err) => {
            console.error("Pipeline execution error:", err);
            reject(err);
          });
        }
        resolve();
      });

      stream.on("error", (err) => {
        console.error("Scan stream error:", err);
        reject(err);
      });
    });
  }
}
