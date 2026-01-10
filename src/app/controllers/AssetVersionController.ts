import { Request, Response } from "express";
import { AssetVersionService } from "../services/AssetVersionService";
import { AssetVersionRepository } from "../repositories/AssetVersionRepository";

export class AssetVersionController {
  static async upload(req: Request, res: Response) {
    const version = await AssetVersionService.uploadNewVersion({
      assetId: req.params.id,
      // @ts-ignore
      studioId: req.user.studioId,
      // @ts-ignore
      userId: req.user.userId,
      // @ts-ignore
      file: req.file!,
      changeNote: req.body.changeNote,
    });

    res.status(201).json(version);
  }

  static async list(req: Request, res: Response) {
    const versions = await AssetVersionRepository.findByAsset(
      req.params.id
    );

    res.json(versions);
  }
}
