import type { Request, Response, NextFunction } from 'express';
import { logger } from '../../infra/logging/logger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  logger.info({
    message: 'Incoming request',
    method: req.method,
    path: req.path,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    correlationId: req.correlationId,
  });
  next();
}
