import { Request, Response, NextFunction } from "express";
import { DomainError } from "../errors/DomainError";
import { logger } from "../../infra/logging/logger";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof DomainError) {
    logger.warn({
      message: err.message,
      code: err.code,
      // @ts-ignore
      correlationId: req.correlationId,
    });

    return res.status(err.statusCode).json({
      error: err.code,
      message: err.message,
      // @ts-ignore
      correlationId: req.correlationId,
    });
  }

  logger.error({
    message: "Unhandled error",
    error: err,
    // @ts-ignore
    correlationId: req.correlationId,
  });

  return res.status(500).json({
    error: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong",
    // @ts-ignore
    correlationId: req.correlationId,
  });
}