import { Router } from 'express';
import { authenticate } from '../../../shared/middlewares/auth';
import { AssetDependencyController } from '../../../app/controllers/AssetDependencyController';

export const assetDependencyRouter = Router();

assetDependencyRouter.use(authenticate);

assetDependencyRouter.post('/link', AssetDependencyController.link);
assetDependencyRouter.get(
  '/:id/versions/:version/children',
  AssetDependencyController.getChildren
);
assetDependencyRouter.get(
  '/:id/versions/:version/parents',
  AssetDependencyController.getParents
);
assetDependencyRouter.get(
  '/:id/versions/:version/impact',
  AssetDependencyController.getImpact
);
