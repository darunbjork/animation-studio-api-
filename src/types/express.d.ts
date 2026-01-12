// src/types/express.d.ts

// Extend the Express Request interface to include custom properties
declare namespace Express {
  export interface Request {
    user?: {
      userId: string;
      studioId: string;
      role: "ARTIST" | "DIRECTOR" | "PRODUCER"; // More precise role type
      scopes: string[];
    };
    correlationId?: string;
  }
}
