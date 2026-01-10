import { AssetVersionModel } from "./models/AssetVersion";

export class AssetVersionRepository {
  static async getLatestVersion(assetId: string) {
    return AssetVersionModel
      .findOne({ assetId })
      .sort({ version: -1 });
  }

  static create(data: any) {
    return AssetVersionModel.create(data);
  }

  static findByAsset(assetId: string) {
    return AssetVersionModel
      .find({ assetId })
      .sort({ version: -1 });
  }

  static findVersion(assetId: string, version: number) {
    return AssetVersionModel.findOne({ assetId, version });
  }
}
