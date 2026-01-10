import { Router } from "express";
import { AssetController } from "../../../app/controllers/AssetController";
import { authenticate } from "../../../shared/middlewares/auth";
import {
  createAssetValidator,
  updateAssetValidator,
  listAssetValidator,
} from "../validators/asset.validators";
// @ts-ignore
import { validationResult, ValidationError as ExpressValidationError } from "express-validator"; // Reverted import
import { ValidationError } from "../../../shared/errors/ValidationError";
import { Request, Response, NextFunction } from "express";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: Record<string, any> = {};
  errors.array().map((err: ExpressValidationError) => { // Explicit type for err
    if (err.type === "field") {
      extractedErrors[err.path] = err.msg;
    }
  });

  throw new ValidationError("Validation failed", extractedErrors);
};

export const assetRouter = Router();

assetRouter.use(authenticate);

assetRouter.post("/", createAssetValidator, validate, AssetController.create);
assetRouter.get("/", listAssetValidator, validate, AssetController.list);
assetRouter.get("/:id", AssetController.get);
assetRouter.patch("/:id", updateAssetValidator, validate, AssetController.update);
assetRouter.delete("/:id", AssetController.delete);
assetRouter.patch("/:id/rollback", AssetController.rollback);
