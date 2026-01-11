import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../errors/ForbiddenError";

// Extend the Request type to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: "ARTIST" | "DIRECTOR" | "PRODUCER";
        studioId: string;
        scopes: string[];
      };
    }
  }
}

export function requireScope(scope: string) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !req.user.scopes || !req.user.scopes.includes(scope)) {
      throw new ForbiddenError("Insufficient scope: " + scope);
    }
    next();
  };
}
