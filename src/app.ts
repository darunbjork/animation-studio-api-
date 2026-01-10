import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { json } from "body-parser";

// We will create these files later
import { healthRouter } from "./infra/http/health";
import { errorHandler } from "./shared/middlewares/errorHandler";
import { authRouter } from "./infra/http/routes/auth.routes";
import { assetRouter } from "./infra/http/routes/asset.routes";

export const app = express();

// Security headers
app.use(helmet());

// Rate limiting (protect asset APIs)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
  })
);

// JSON parsing
app.use(json({ limit: "10mb" }));

// Routes (will be uncommented once healthRouter is created)
app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/assets", assetRouter);

// Global error handler (must be last) (will be uncommented once errorHandler is created)
app.use(errorHandler);
