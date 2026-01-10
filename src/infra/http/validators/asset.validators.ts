// @ts-ignore
import { body, param, query } from "express-validator";

export const createAssetValidator = [
  body("name").isString().notEmpty(),
  body("type").isIn(["CHARACTER", "PROP", "ENVIRONMENT"]),
];

export const updateAssetValidator = [
  param("id").isMongoId(),
  body("name").optional().isString(),
];

export const listAssetValidator = [
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 100 }),
];
