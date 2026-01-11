import { Request, Response } from "express";
import { AssetService } from "../services/AssetService";
import { AssetListService } from "../services/AssetListService";

export class AssetController {
  static async create(req: Request, res: Response) {
    const asset = await AssetService.createAsset({
      ...req.body,
      // @ts-ignore
      studioId: req.user.studioId,
      // @ts-ignore
      createdBy: req.user.userId,
    });

    res.status(201).json(asset);
  }

  static async list(req: Request, res: Response) {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);

    const result = await AssetListService.listAssets(
      // @ts-ignore
      req.user.studioId,
      page,
      limit
    );

    res.json(result);
  }

  static async get(req: Request, res: Response) {
    const asset = await AssetService.getAsset(
      req.params.id,
      // @ts-ignore
      req.user.studioId
    );

    res.json(asset);
  }

  static async update(req: Request, res: Response) {
    const asset = await AssetService.updateAsset(
      req.params.id,
      // @ts-ignore
      req.user.studioId,
      req.body
    );

    res.json(asset);
  }

  static async delete(req: Request, res: Response) {
    await AssetService.deleteAsset(
      req.params.id,
      // @ts-ignore
      req.user.studioId,
      // @ts-ignore
      req.user.role
    );

    res.status(204).send();
  }

  static async rollback(req: Request, res: Response) {
    const { version } = req.body;
    await AssetService.rollbackAsset(
      req.params.id,
      // @ts-ignore
      req.user.studioId,
      version
    );

    res.status(200).json({ message: `Asset rolled back to version ${version}` });
  }
}
