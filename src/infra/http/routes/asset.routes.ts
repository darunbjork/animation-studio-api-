import { Router } from "express";
import { AssetController } from "../../../app/controllers/AssetController";
import { authenticate } from "../../../shared/middlewares/auth";

export const assetRouter = Router();

assetRouter.use(authenticate);

assetRouter.post("/", AssetController.create);
assetRouter.get("/", AssetController.list);
