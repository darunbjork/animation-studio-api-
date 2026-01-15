import { Request, Response } from 'express';
import { AssetService } from '../services/AssetService';
import { AssetListService } from '../services/AssetListService';
import { logger } from '../../infra/logging/logger'; // Import logger

export class AssetController {
  static async create(req: Request, res: Response) {
    const correlationId = req.correlationId;
    // Log the request body to debug potential issues with data parsing or missing fields
    logger.debug('Asset creation request body:', { correlationId, body: req.body });
    const asset = await AssetService.createAsset(
      {
        ...req.body,
        studioId: req.user!.studioId, // Add non-null assertion
        createdBy: req.user!.userId, // Add non-null assertion
      },
      correlationId
    );

    logger.info('Asset created', {
      correlationId,
      assetId: asset._id,
      studioId: asset.studioId,
      createdBy: asset.createdBy,
    });

    res.status(201).json(asset);
  }

  static async list(req: Request, res: Response) {
    const correlationId = req.correlationId;
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);

    const result = await AssetListService.listAssets(
      req.user!.studioId, // Add non-null assertion
      page,
      limit
    );

    logger.info('Assets listed', {
      correlationId,
      studioId: req.user!.studioId, // Add non-null assertion
      page,
      limit,
      count: result.data.length,
    });

    res.json(result);
  }

  static async get(req: Request, res: Response) {
    const correlationId = req.correlationId;
    const asset = await AssetService.getAsset(
      req.params.id,
      req.user!.studioId, // Add non-null assertion
      correlationId
    );

    logger.info('Asset retrieved', {
      correlationId,
      assetId: asset._id,
      studioId: asset.studioId,
    });

    res.json(asset);
  }

  static async update(req: Request, res: Response) {
    const correlationId = req.correlationId;
    const asset = await AssetService.updateAsset(
      req.params.id,
      req.user!.studioId, // Add non-null assertion
      req.body,
      correlationId
    );

    logger.info('Asset updated', {
      correlationId,
      assetId: asset._id,
      studioId: asset.studioId,
      changes: req.body,
    });

    res.json(asset);
  }

  static async delete(req: Request, res: Response) {
    const correlationId = req.correlationId;
    await AssetService.deleteAsset(
      req.params.id,
      req.user!.studioId, // Add non-null assertion
      req.user!.role, // Add non-null assertion
      correlationId
    );

    logger.info('Asset deleted', {
      correlationId,
      assetId: req.params.id,
      studioId: req.user!.studioId, // Add non-null assertion
    });

    res.status(204).send();
  }

  static async rollback(req: Request, res: Response) {
    const correlationId = req.correlationId;
    const { version } = req.body;
    await AssetService.rollbackAsset(
      req.params.id,
      req.user!.studioId, // Add non-null assertion
      version,
      correlationId
    );

    logger.info('Asset rollback initiated', {
      correlationId,
      assetId: req.params.id,
      studioId: req.user!.studioId, // Add non-null assertion
      version,
    });

    res
      .status(200)
      .json({ message: `Asset rolled back to version ${version}` });
  }
}
