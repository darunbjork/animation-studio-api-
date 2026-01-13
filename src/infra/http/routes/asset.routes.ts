import { Router, Request, Response, NextFunction } from 'express';
import { AssetController } from '../../../app/controllers/AssetController';
import { authenticate } from '../../../shared/middlewares/auth';
import {
  createAssetValidator,
  updateAssetValidator,
  listAssetValidator,
} from '../validators/asset.validators';
import {
  validationResult,
  ValidationError as ExpressValidationError,
} from 'express-validator';
import { ValidationError } from '../../../shared/errors/ValidationError';
import { RenderController } from '../../../app/controllers/RenderController';
import { AssetDownloadController } from '../../../app/controllers/AssetDownloadController';
import { requireScope } from '../../../shared/middlewares/requireScope';

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: Record<string, any> = {};
  errors.array().map((err: ExpressValidationError) => {
    // Explicit type for err
    if (err.type === 'field') {
      extractedErrors[err.path] = err.msg;
    }
  });

  throw new ValidationError('Validation failed', extractedErrors);
};

export const assetRouter = Router();

assetRouter.use(authenticate);

assetRouter.post('/', createAssetValidator, validate, AssetController.create);
assetRouter.get('/', listAssetValidator, validate, AssetController.list);
assetRouter.get('/:id', AssetController.get);
assetRouter.patch(
  '/:id',
  updateAssetValidator,
  validate,
  AssetController.update
);
assetRouter.delete(
  '/:id',
  requireScope('assets:delete'),
  AssetController.delete
);
assetRouter.patch('/:id/rollback', AssetController.rollback);
assetRouter.post('/:id/render', RenderController.start);
assetRouter.get(
  '/:id/versions/:version/download',
  AssetDownloadController.download
);
