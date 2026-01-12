import { Request, Response } from "express";
import { AssetService } from "../services/AssetService";
import { AssetListService } from "../services/AssetListService";
import { logger } from "../../infra/logging/logger"; // Import logger

export class AssetController {
  static async create(req: Request, res: Response) {
    // @ts-ignore
    const correlationId = req.correlationId;
    const asset = await AssetService.createAsset({
      ...req.body,
      studioId: req.user.studioId,
      createdBy: req.user.userId,
    }, correlationId);

    logger.info("Asset created", {
      correlationId,
      assetId: asset._id,
      studioId: asset.studioId,
      createdBy: asset.createdBy,
    });

    res.status(201).json(asset);
  }

  static async list(req: Request, res: Response) {
    // @ts-ignore
    const correlationId = req.correlationId;
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);

    const result = await AssetListService.listAssets(
      req.user.studioId,
      page,
      limit
    );

    logger.info("Assets listed", {
      correlationId,
      studioId: req.user.studioId,
      page,
      limit,
      count: result.data.length,
    });

    res.json(result);
  }

  static async get(req: Request, res: Response) {
    // @ts-ignore
    const correlationId = req.correlationId;
    const asset = await AssetService.getAsset(
      req.params.id,
      req.user.studioId,
      correlationId
    );

    logger.info("Asset retrieved", {
      correlationId,
      assetId: asset._id,
      studioId: asset.studioId,
    });

    res.json(asset);
  }

  static async update(req: Request, res: Response) {
    // @ts-ignore
    const correlationId = req.correlationId;
    const asset = await AssetService.updateAsset(
      req.params.id,
      req.user.studioId,
      req.body,
      correlationId
    );

    logger.info("Asset updated", {
      correlationId,
      assetId: asset._id,
      studioId: asset.studioId,
      changes: req.body,
    });

    res.json(asset);
  }

  static async delete(req: Request, res: Response) {
    // @ts-ignore
    const correlationId = req.correlationId;
    await AssetService.deleteAsset(
      req.params.id,
      req.user.studioId,
      req.user.role,
      correlationId
    );

    logger.info("Asset deleted", {
      correlationId,
      assetId: req.params.id,
      studioId: req.user.studioId,
    });

    res.status(204).send();
  }

  static async rollback(req: Request, res: Response) {
    // @ts-ignore
    const correlationId = req.correlationId;
    const { version } = req.body;
    await AssetService.rollbackAsset(
      req.params.id,
      req.user.studioId,
      version,
      correlationId
    );

    logger.info("Asset rollback initiated", {
      correlationId,
      assetId: req.params.id,
      studioId: req.user.studioId,
      version,
    });

    res.status(200).json({ message: `Asset rolled back to version ${version}` });
  }
}
