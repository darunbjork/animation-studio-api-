import { AssetRepository } from '../repositories/AssetRepository';
import { ValidationError } from '../../shared/errors/ValidationError';
import { AuthorizationError } from '../../shared/errors/AuthorizationError';
import { PermissionService } from './PermissionService';
import { AssetListService } from './AssetListService';
import { AssetCacheService } from './AssetCacheService'; // Import AssetCacheService
import { logger } from '../../infra/logging/logger'; // Import logger

export class AssetService {
  static async createAsset(data: any, correlationId?: string) {
    if (!data.name) {
      logger.warn('Asset name is required for asset creation', {
        correlationId,
        data,
      });
      throw new ValidationError('Asset name is required');
    }

    const asset = await AssetRepository.create(data);
    logger.info('Asset created in service', {
      correlationId,
      assetId: asset._id,
      studioId: asset.studioId,
    });

    // Invalidate asset list cache after creation
    await AssetListService.invalidateListCache(asset.studioId.toString());

    return asset;
  }

  static async listAssets(studioId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    return AssetRepository.findByStudio(studioId, { skip, limit });
  }

  static async getAsset(
    assetId: string,
    studioId: string,
    correlationId?: string
  ) {
    const asset = await AssetRepository.findOneByIdAndStudio(assetId, studioId);

    if (!asset) {
      logger.warn('Asset not found for retrieval', {
        correlationId,
        assetId,
        studioId,
      });
      throw new ValidationError('Asset not found');
    }
    logger.info('Asset retrieved in service', {
      correlationId,
      assetId,
      studioId,
    });
    return asset;
  }

  static async updateAsset(
    assetId: string,
    studioId: string,
    data: any,
    correlationId?: string
  ) {
    const asset = await AssetRepository.update(assetId, studioId, data);

    if (!asset) {
      logger.warn('Asset not found for update', {
        correlationId,
        assetId,
        studioId,
        data,
      });
      throw new ValidationError('Asset not found');
    }
    logger.info('Asset updated in service', {
      correlationId,
      assetId,
      studioId,
      changes: data,
    });

    // Invalidate specific asset cache and asset list cache after update
    await AssetCacheService.invalidateAssetCache(assetId, studioId);
    await AssetListService.invalidateListCache(studioId);

    return asset;
  }

  static async deleteAsset(
    assetId: string,
    studioId: string,
    userRole: string,
    correlationId?: string
  ) {
    if (!PermissionService.canDelete(userRole as any)) {
      // Cast to Role for now, will fix with proper type later
      logger.warn('User unauthorized to delete asset', {
        correlationId,
        assetId,
        studioId,
        userRole,
      });
      throw new AuthorizationError(
        'You do not have permission to delete assets.'
      );
    }

    const asset = await AssetRepository.delete(assetId, studioId);

    if (!asset) {
      logger.warn('Asset not found for deletion', {
        correlationId,
        assetId,
        studioId,
      });
      throw new ValidationError('Asset not found');
    }
    logger.info('Asset deleted in service', {
      correlationId,
      assetId,
      studioId,
    });

    // Invalidate specific asset cache and asset list cache after deletion
    await AssetCacheService.invalidateAssetCache(assetId, studioId);
    await AssetListService.invalidateListCache(studioId);
  }

  static async rollbackAsset(
    assetId: string,
    studioId: string,
    version: number,
    correlationId?: string
  ) {
    const asset = await AssetRepository.findOneByIdAndStudio(assetId, studioId);

    if (!asset) {
      logger.warn('Asset not found for rollback', {
        correlationId,
        assetId,
        studioId,
        version,
      });
      throw new ValidationError('Asset not found');
    }

    asset.currentVersion = version;
    await asset.save();
    logger.info('Asset rollback executed in service', {
      correlationId,
      assetId,
      studioId,
      newVersion: version,
    });
  }
}
