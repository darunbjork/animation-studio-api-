import { Router } from 'express';
import { upload } from '../upload';
import { authenticate } from '../../../shared/middlewares/auth';
import { AssetUploadController } from '../../../app/controllers/AssetUploadController';

export const assetUploadRouter = Router();

assetUploadRouter.post(
  '/:id/upload',
  authenticate,
  upload.single('file'),
  AssetUploadController.upload
);
