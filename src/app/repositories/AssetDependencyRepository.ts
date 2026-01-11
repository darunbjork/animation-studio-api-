import { AssetDependencyModel } from "./models/AssetDependency";

export class AssetDependencyRepository {
  static create(data: any) {
    return AssetDependencyModel.create(data);
  }

  static findChildren(parentAssetId: string, parentVersion: number) {
    return AssetDependencyModel.find({
      parentAssetId,
      parentVersion,
    });
  }

  static findParents(childAssetId: string, childVersion: number) {
    return AssetDependencyModel.find({
      childAssetId,
      childVersion,
    });
  }
}
