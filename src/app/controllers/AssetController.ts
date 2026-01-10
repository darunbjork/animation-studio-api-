import { Request, Response } from "express";
import { AssetService } from "../services/AssetService";

export class AssetController {
  static async create(req: Request, res: Response) {
    const asset = await AssetService.createAsset({
      // @ts-ignore
      studioId: req.user.studioId,
      // @ts-ignore
      userId: req.user.userId,
      ...req.body,
    });

    res.status(201).json(asset);
  }

  static async list(req: Request, res: Response) {
    // @ts-ignore
    const assets = await AssetService.listAssets(req.user.studioId);
    res.json(assets);
  }
}
