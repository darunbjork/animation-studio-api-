// src/types/express.d.ts

// Extend the Express Request interface to include custom properties
declare namespace Express {
  export interface Request {
    user?: {
      userId: string;
      studioId: string;
      role: string;
      scopes: string[];
    };
    correlationId?: string;
  }
}
