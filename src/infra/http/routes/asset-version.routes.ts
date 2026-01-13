import { Router } from 'express';
import { authenticate } from '../../../shared/middlewares/auth';
import { upload } from '../upload';
import { AssetVersionController } from '../../../app/controllers/AssetVersionController';

export const assetVersionRouter = Router();

assetVersionRouter.use(authenticate);

assetVersionRouter.post(
  '/:id/versions',
  upload.single('file'),
  AssetVersionController.upload
);

assetVersionRouter.get('/:id/versions', AssetVersionController.list);
