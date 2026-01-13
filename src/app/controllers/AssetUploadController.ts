import { Request, Response } from 'express';
import { AssetUploadService } from '../services/AssetUploadService';

export class AssetUploadController {
  static async upload(req: Request, res: Response) {
    const asset = await AssetUploadService.uploadAsset({
      // @ts-ignore
      studioId: req.user.studioId,
      // @ts-ignore
      userId: req.user.userId,
      assetId: req.params.id,
      // @ts-ignore
      file: req.file!,
      // @ts-ignore
      userRole: req.user.role,
    });

    res.json(asset);
  }
}
