import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../errors/ForbiddenError";

export function requireScope(scope: string) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !req.user.scopes || !req.user.scopes.includes(scope)) {
      throw new ForbiddenError("Insufficient scope: " + scope);
    }
    next();
  };
}
