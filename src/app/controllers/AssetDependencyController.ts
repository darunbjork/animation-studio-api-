import { Request, Response } from 'express';
import { AssetDependencyService } from '../services/AssetDependencyService';
import { AssetDependencyRepository } from '../repositories/AssetDependencyRepository';
import { ImpactAnalysisService } from '../services/ImpactAnalysisService';

export class AssetDependencyController {
  static async link(req: Request, res: Response) {
    const { parentAssetId, parentVersion, childAssetId, childVersion } =
      req.body;

    // Add validation for existence of assets and versions here
    // For now, assuming they exist

    try {
      const dependency = await AssetDependencyService.linkAssets({
        parentAssetId,
        parentVersion,
        childAssetId,
        childVersion,
      });
      res.status(201).json(dependency);
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getChildren(req: Request, res: Response) {
    const { id, version } = req.params;
    const children = await AssetDependencyRepository.findChildren(
      id,
      Number(version)
    );
    res.status(200).json(children);
  }

  static async getParents(req: Request, res: Response) {
    const { id, version } = req.params;
    const parents = await AssetDependencyRepository.findParents(
      id,
      Number(version)
    );
    res.status(200).json(parents);
  }

  static async getImpact(req: Request, res: Response) {
    const { id, version } = req.params;
    const impacted = await ImpactAnalysisService.findImpactedAssets(
      id,
      Number(version)
    );
    res.status(200).json(Array.from(impacted));
  }
}
