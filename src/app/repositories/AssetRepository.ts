import { AssetModel } from './models/Asset';

export class AssetRepository {
  static create(data: any) {
    return AssetModel.create(data);
  }

  static findByStudio(studioId: string, options: any) {
    const { skip, limit } = options;
    return AssetModel.find({ studioId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  }

  static findOneByIdAndStudio(assetId: string, studioId: string) {
    return AssetModel.findOne({ _id: assetId, studioId });
  }

  static update(assetId: string, studioId: string, data: any) {
    return AssetModel.findOneAndUpdate({ _id: assetId, studioId }, data, {
      new: true,
    });
  }

  static delete(assetId: string, studioId: string) {
    return AssetModel.findOneAndDelete({ _id: assetId, studioId });
  }
}
