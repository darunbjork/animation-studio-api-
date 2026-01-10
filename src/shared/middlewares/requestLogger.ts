import { Request, Response, NextFunction } from "express";
import { logger } from "../../infra/logging/logger";

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info({
    message: "Incoming request",
    method: req.method,
    path: req.path,
    // @ts-ignore
    correlationId: req.correlationId,
  });
  next();
}
