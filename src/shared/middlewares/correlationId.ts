import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

export function correlationId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = randomUUID();
  // @ts-ignore
  req.correlationId = id;
  res.setHeader("X-Correlation-Id", id);
  next();
}
