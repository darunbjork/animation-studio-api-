import { AssetModel } from "./models/Asset";

export class AssetRepository {
  static create(data: any) {
    return AssetModel.create(data);
  }

  static findByStudio(studioId: string) {
    return AssetModel.find({ studioId });
  }

  static findById(assetId: string) {
    return AssetModel.findById(assetId);
  }
}
